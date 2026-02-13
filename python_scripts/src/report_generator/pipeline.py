import os
import sys
import json
import logging
import re

# Ensure the 'src' and all script directories are in the python path
current_file_dir = os.path.dirname(os.path.abspath(__file__)) # D:\ReportGenerator\python_scripts\src\report_generator
project_root = os.path.dirname(os.path.dirname(current_file_dir)) # D:\ReportGenerator\python_scripts

# Add key directories to sys.path to resolve imports between scripts
dirs_to_add = [
    project_root,
    os.path.join(project_root, 'src'),
    os.path.join(project_root, 'DataPerformance'),
    os.path.join(project_root, 'CallPerformance'),
    os.path.join(project_root, 'VoiceQuality'),
    os.path.join(project_root, 'Coverage'),
]

for d in dirs_to_add:
    if os.path.isdir(d) and d not in sys.path:
        sys.path.insert(0, d)

from report_generator.utils.logger import setup_logger
from report_generator.utils.config_loader import Config
from report_generator.analyzers.data_performance_analyzer import DataPerformanceAnalyzer
from report_generator.analyzers.mrab_performance_analyzer import MrabPerformanceAnalyzer
from report_generator.analyzers.call_performance_analyzer import CallPerformanceAnalyzer
from report_generator.analyzers.voice_quality_analyzer import VoiceQualityAnalyzer
from report_generator.analyzers.coverage_performance_analyzer import CoveragePerformanceAnalyzer
from report_generator.analyzers.google_throughput_analyzer import GoogleThroughputAnalyzer
from report_generator.analyzers.mhs_drive_analyzer import MHSDriveAnalyzer
from report_generator.analyzers.wfc_performance_analyzer import WfcPerformanceAnalyzer

import data_path_reader
import check_empty_data
from VoiceQuality.VqLineChartAnalyzer import calculate_vq_statistics
from Wfc.WfcLineChartAnalyzer import calculate_wfc_statistics, calculate_wfc_rssi_statistics
from Coverage.n41_coverage_analyzer import extract_coverage_data_to_csv

class DataAnalysisPipeline:
    def __init__(self, config_path="config/config.yaml", market_name=None, project_name=None):
        self.config = Config(config_path)
        log_config = self.config.get("logging")
        self.logger = setup_logger(
            name="pipeline", 
            log_file=log_config.get("log_file"), 
            level=log_config.get("level")
        )
        
        # Project logic: If project_name is provided, it dictates the sub-pathing
        self.project = project_name
        
        # Determine market: override if argument provided, otherwise fallback to config or default
        if market_name:
            self.market = market_name
        else:
            self.market = self.config.get("project.market", "Seattle")
            
        # Directory resolution: Raw Data / [Project] / Market
        if self.project:
            self.base_raw_data_dir = os.path.join(self.config.get("project.base_raw_data_dir"), self.project, self.market)
            self.output_dir = os.path.join(self.config.get("project.output_dir"), self.project, self.market)
        else:
            self.base_raw_data_dir = os.path.join(self.config.get("project.base_raw_data_dir"), self.market)
            self.output_dir = os.path.join(self.config.get("project.output_dir"), self.market)

        if self.project:
            self.logger.info(f"Project: {self.project}")
        self.logger.info(f"Market: {self.market}")
        self.logger.info(f"Reading from: {self.base_raw_data_dir}")
        self.logger.info(f"Writing to: {self.output_dir}")
        # Removed os.makedirs(self.output_dir, exist_ok=True) for lazy creation
        
        self.results = {
            "data_performance": {},
            "call_performance": {},
            "voice_quality": {},
            "coverage": {},
            "wfc_performance": {}
        }
        
        self.processing_stats = {
            "valid_files": [],
            "invalid_files": [],
            "total_count": 0
        }
        
        # Mapping of analysis types to analyzer instances
        self.analyzers = {
            "data_performance": DataPerformanceAnalyzer(self.config, self.logger),
            "mrab_performance": MrabPerformanceAnalyzer(self.config, self.logger),
            "call_performance": CallPerformanceAnalyzer(self.config, self.logger),
            "voice_quality_combined": VoiceQualityAnalyzer(self.config, self.logger),
            "coverage_coordinate": CoveragePerformanceAnalyzer(self.config, self.logger),
            "n41_coverage": CoveragePerformanceAnalyzer(self.config, self.logger),
            "vonr_coverage_performance": CoveragePerformanceAnalyzer(self.config, self.logger),
            "google_throughput_analysis": GoogleThroughputAnalyzer(self.config, self.logger),
            "mhs_drive_performance": MHSDriveAnalyzer(self.config, self.logger),
            "wfc_performance": WfcPerformanceAnalyzer(self.config, self.logger)
        }

    def _insert_into_nested_dict(self, data_dict, path_components, value):
        """Inserts a value into a nested dictionary based on a list of path components."""
        current_level = data_dict
        for i, component in enumerate(path_components):
            if i == len(path_components) - 1:
                current_level[component] = value
            else:
                if component not in current_level:
                    current_level[component] = {}
                current_level = current_level[component]

    def _get_params(self, file_path):
        from DataPerformance import data_performance_statics
        return data_performance_statics._determine_analysis_parameters(file_path)

    def _group_files_by_directory_and_device(self, csv_files):
        """
        Groups CSV files by their directory path and device type.
        Returns a dictionary: {directory_path: {device_type: [file_paths]}}
        """
        groups = {}
        
        for csv_file in csv_files:
            # Get directory path
            dir_path = os.path.dirname(csv_file)
            
            # Determine device type from filename
            # Use regex to match device type markers, prioritizing those at the end of filename
            filename = os.path.basename(csv_file)
            filename_upper = filename.upper()
            device_type = "DUT"  # Default
            
            # Try to match device type markers near the end of filename (before .csv)
            # Pattern: _DUT_ or _REF_ or _PC2_ or _PC3_ near the end
            import re
            # First try to match explicit markers at the end (more reliable)
            end_match = re.search(r'_(DUT|REF|PC\d+)_\.CSV$', filename_upper)
            if end_match:
                matched = end_match.group(1)
                if matched == "PC2":
                    device_type = "DUT"
                elif matched == "PC3":
                    device_type = "REF"
                else:
                    device_type = matched  # DUT or REF
            else:
                # Fall back to general pattern matching (first occurrence)
                general_match = re.search(r'(DUT|REF|PC\d+)', filename_upper)
                if general_match:
                    matched = general_match.group(1)
                    if matched == "PC2":
                        device_type = "DUT"
                    elif matched == "PC3":
                        device_type = "REF"
                    else:
                        device_type = matched
                # If still no match, try channel numbers as last resort
                elif "CH01" in filename_upper:
                    device_type = "REF"
                elif "CH02" in filename_upper:
                    device_type = "DUT"
            
            # Create nested structure
            if dir_path not in groups:
                groups[dir_path] = {}
            if device_type not in groups[dir_path]:
                groups[dir_path][device_type] = []
            
            groups[dir_path][device_type].append(csv_file)
        
        return groups

    def run(self):
        self.logger.info("Starting analysis pipeline...")
        
        directories_config = self.config.get("analysis.directories")
        if not directories_config:
            self.logger.error("No analysis directories configured in config.yaml")
            return

        # 1. Process individual CSV files (now with aggregation)
        excluded_types = [
            "call_performance", "voice_quality_combined", "coverage_coordinate", 
            "n41_coverage", "vonr_coverage_performance", "google_throughput_analysis", 
            "mhs_drive_performance", "wfc_performance"
        ]
        
        all_csv_files = data_path_reader.get_csv_file_paths(
            self.base_raw_data_dir, 
            directories_config, 
            excluded_analysis_types=excluded_types
        )
        
        # Group files by directory and device type
        self.logger.info(f"Grouping {len(all_csv_files)} CSV files by directory and device type...")
        file_groups = self._group_files_by_directory_and_device(all_csv_files)
        
        total_groups = sum(len(devices) for devices in file_groups.values())
        self.logger.info(f"Created {total_groups} file groups for analysis")
        
        # Process each group
        for dir_path, device_groups in file_groups.items():
            for device_type, file_list in device_groups.items():
                # Get params from first file to determine analysis type
                params = self._get_params(file_list[0])
                if not params:
                    continue
                
                ana_type = params.get("analysis_type_detected")
                if ana_type in excluded_types:
                    self.logger.debug(f"Skipping {dir_path} as it is a directory-based type ({ana_type})")
                    continue
                
                analyzer = self.analyzers.get(ana_type)
                if not analyzer:
                    continue
                
                # Analyze with file list (single file or multiple files)
                self.logger.info(f"Analyzing {len(file_list)} file(s) for {device_type} in {os.path.basename(dir_path)}")
                stats = analyzer.analyze(file_list)
                
                if stats and analyzer.validate(stats):
                    # Use first file to determine path structure
                    relative_path = os.path.relpath(file_list[0], self.base_raw_data_dir)
                    path_components = relative_path.replace("\\", "/").split('/')
                    
                    # Strip leading category directories to avoid double nesting at export
                    if path_components[0] in ["Data Performance", "Voice Quality", "Call Performance", "Coverage Performance"]:
                        path_components = path_components[1:]
                    
                    # Use device_type as the final key
                    path_components[-1] = device_type
                    
                    # Insert into data_performance results
                    self._insert_into_nested_dict(self.results["data_performance"], path_components, stats)
                    self.processing_stats["valid_files"].extend(file_list)
                else:
                    self.processing_stats["invalid_files"].extend(file_list)

        # 2. Process directory-based analysis
        self.logger.info("Processing directory-level analyses...")
        for dir_info in directories_config:
            ana_type = dir_info["analysis_type"]
            if ana_type not in excluded_types: continue
            
            analyzer = self.analyzers.get(ana_type)
            if not analyzer: continue
            
            full_path = os.path.join(self.base_raw_data_dir, dir_info["path"])
            if not os.path.isdir(full_path): continue

            if isinstance(analyzer, CoveragePerformanceAnalyzer):
                # Pass the effective market to the analyzer if needed, 
                # though currently it reads from config based on 'project.market' or hardcoded map.
                # Ideally, we should update CoveragePerformanceAnalyzer to accept market explicitly, 
                # but we updated the pipeline to handle the market context via 'self.market'
                # and CoveragePerformanceAnalyzer reads config.
                
                # Hack/Fix: CoveragePerformanceAnalyzer reads self.config.get("project.market").
                # Since we are iterating pipelines with different markets, we might need to 
                # TEMPORARILY patch the config object or pass the market to analyze method if supported.
                # However, CoveragePerformanceAnalyzer.analyze() doesn't currently take market.
                # It reads self.config.get("project.market", "Seattle").
                # To support multi-market without deep refactoring of Analyzer, 
                # we can inject the current market into the config instance in memory for this pipeline instance.
                self.config.data['project']['market'] = self.market # Inject current market into config instance
                
                stats = analyzer.analyze(full_path, analysis_type=ana_type)
            else:
                stats = analyzer.analyze(full_path)

            if stats and analyzer.validate(stats):
                # Use the leaf directory name as the nesting key if it's not a root category name
                dir_name = os.path.basename(dir_info["path"])
                root_categories = ["Data Performance", "Voice Quality", "Call Performance", "Coverage Performance"]
                
                if ana_type == "call_performance":
                    dest = self.results["call_performance"]
                    if dir_name not in root_categories:
                        if dir_name not in dest: dest[dir_name] = {}
                        dest[dir_name].update(stats)
                    else:
                        dest.update(stats)
                elif ana_type == "voice_quality_combined":
                    dest = self.results["voice_quality"]
                    if dir_name not in root_categories:
                        if dir_name not in dest: dest[dir_name] = {}
                        dest[dir_name].update(stats)
                    else:
                        dest.update(stats)
                elif ana_type in ["coverage_coordinate", "n41_coverage", "vonr_coverage_performance"]:
                    dest = self.results["coverage"]
                    if dir_name not in root_categories:
                        if dir_name not in dest: dest[dir_name] = {}
                        dest[dir_name].update(stats)
                    else:
                        dest.update(stats)
                elif ana_type in ["google_throughput_analysis", "mhs_drive_performance"]:
                    path_components = dir_info["path"].replace("\\", "/").split('/')
                    if path_components[0] in root_categories:
                        path_components = path_components[1:]
                    self._insert_into_nested_dict(self.results["data_performance"], path_components, stats)
                elif ana_type == "wfc_performance":
                    dest = self.results["wfc_performance"]
                    dest.update(stats)

        # 3. Post-processing steps
        self._run_post_processing()

        # 4. Export results
        self._export_all()
        self._export_processing_summary()
        
        # 5. Final validation
        self.logger.info("Running final data validation...")
        findings = check_empty_data.validate_json_results(self.output_dir)
        if findings:
            for line in findings:
                self.logger.warning(line)
        else:
            self.logger.info("No empty collections found in any JSON file.")
        
        self.logger.info(f"Pipeline execution completed. Results in: {self.output_dir}")

    def _run_post_processing(self):
        self.logger.info("Running post-processing (VqLineChart, Coverage extraction)...")
        
        # VQ Line Chart
        vq_linechart_dir = os.path.join(self.output_dir, "vq_linechart_data")
        # Subdirectory created only if valid paths found below
        evs_wb_vq_paths = [
            os.path.join(self.base_raw_data_dir, r"Voice Quality\5G Auto VoNR Disabled EVS WB VQ\Base"),
            os.path.join(self.base_raw_data_dir, r"Voice Quality\5G Auto VoNR Disabled EVS WB VQ\Mobile"),
            os.path.join(self.base_raw_data_dir, r"Voice Quality\5G Auto VoNR Enabled EVS WB VQ\Base"),
            os.path.join(self.base_raw_data_dir, r"Voice Quality\5G Auto VoNR Enabled EVS WB VQ\Mobile"),
        ]
        for p in evs_wb_vq_paths:
            if os.path.isdir(p):
                os.makedirs(vq_linechart_dir, exist_ok=True)
                scenario = os.path.basename(os.path.dirname(p)) + "_" + os.path.basename(p)
                out_path = os.path.join(vq_linechart_dir, f"vq_mos_statistics_{scenario.replace(' ', '_').lower()}.json")
                calculate_vq_statistics(p, output_json_path=out_path)

        # WFC Line Chart
        wfc_linechart_dir = os.path.join(self.output_dir, "wfc_linechart_data")
        wfc_base_path = os.path.join(self.base_raw_data_dir, "WFC")
        if os.path.isdir(wfc_base_path):
            for tc_dir in os.listdir(wfc_base_path):
                tc_path = os.path.join(wfc_base_path, tc_dir)
                if os.path.isdir(tc_path):
                    os.makedirs(wfc_linechart_dir, exist_ok=True)
                    out_path = os.path.join(wfc_linechart_dir, f"wfc_mos_statistics_{tc_dir.lower()}.json")
                    calculate_wfc_statistics(tc_path, output_json_path=out_path)

        # WFC RSSI Line Chart
        wfc_rssi_linechart_dir = os.path.join(self.output_dir, "wfc_rssi_linechart_data")
        if os.path.isdir(wfc_base_path):
            for tc_dir in os.listdir(wfc_base_path):
                tc_path = os.path.join(wfc_base_path, tc_dir)
                if os.path.isdir(tc_path):
                    os.makedirs(wfc_rssi_linechart_dir, exist_ok=True)
                    out_path = os.path.join(wfc_rssi_linechart_dir, f"wfc_rssi_statistics_{tc_dir.lower()}.json")
                    calculate_wfc_rssi_statistics(tc_path, output_json_path=out_path)

        # RSRP & Tx Power Extraction
        rsrp_dir = os.path.join(self.output_dir, "rsrp_data")
        tx_dir = os.path.join(self.output_dir, "tx_power_data")
        
        n41_path = os.path.join(self.base_raw_data_dir, "Coverage Performance", "5G n41 HPUE Coverage Test")
        if os.path.isdir(n41_path):
            for run in os.listdir(n41_path):
                run_p = os.path.join(n41_path, run)
                if os.path.isdir(run_p) and run.startswith("Run"):
                    os.makedirs(rsrp_dir, exist_ok=True)
                    os.makedirs(tx_dir, exist_ok=True)
                    extract_coverage_data_to_csv(run_p, rsrp_dir, ['PC2', 'PC3'], '[NR5G] [RF] RSRP', 'RSRP_Analysis')
                    extract_coverage_data_to_csv(run_p, tx_dir, ['PC2', 'PC3'], '[NR5G] [Power] Tx power (PUSCH Actual)', 'TxPower_Analysis', fallback_column_name='[NR5G] [Power] Tx power (Total)')
        
        # TEMPORARY MOS PATCH - Export MOS patch line chart data (overwrites histogram files)
        try:
            from report_generator.analyzers.wfc_mos_patch import apply_mos_patch
            patch_dir = os.path.join(self.base_raw_data_dir, "WFC", "MOS PATCH")
            wfc_linechart_dir = os.path.join(self.output_dir, "wfc_linechart_data")
            # Re-apply patch to export line chart data (this will overwrite histogram files)
            if os.path.isdir(patch_dir) and "wfc_performance" in self.results:
                apply_mos_patch(self.results["wfc_performance"], patch_dir, output_dir=wfc_linechart_dir, logger=self.logger)
        except Exception as e:
            self.logger.warning(f"Failed to export MOS patch line chart data: {e}")

        # Export CDF Throughput data
        self._export_cdf_data()

    def _export_cdf_data(self):
        """Recursively traverses data_performance results and exports Throughput_CDF data to separate files."""
        self.logger.info("Checking for CDF Throughput data to export...")
        cdf_dir = os.path.join(self.output_dir, "cdf_throughput_data")
        
        processed_count = 0

        def traverse(current_dict, path_parts):
            nonlocal processed_count
            for key, value in current_dict.items():
                if isinstance(value, dict):
                    if "Throughput_CDF" in value:
                        # Found statistics for a device (DUT/REF)
                        os.makedirs(cdf_dir, exist_ok=True)
                        
                        # Use path parts to build a descriptive filename
                        # path_parts might be ["5G AUTO DP", "TC_NAME"]
                        # key is "DUT" or "REF"
                        safe_parts = [p.replace(" ", "_") for p in path_parts]
                        filename = f"{'_'.join(safe_parts)}_{key}.json".lower()
                        
                        out_path = os.path.join(cdf_dir, filename)
                        with open(out_path, 'w', encoding='utf-8') as f:
                            json.dump(value.pop("Throughput_CDF"), f, indent=4, ensure_ascii=True)
                        
                        processed_count += 1
                        # Note: Throughput_CDF is popped from the dictionary so it won't be in data_performance_results.json
                    else:
                        traverse(value, path_parts + [key])

        if "data_performance" in self.results:
            traverse(self.results["data_performance"], [])
            if processed_count > 0:
                self.logger.info(f"Exported {processed_count} CDF throughput JSON files to {cdf_dir}")

    def _export_all(self):
        export_map = {
            "data_performance": ("data_performance_results.json", "Data Performance"),
            "call_performance": ("call_performance_results.json", "Call Performance"),
            "voice_quality": ("voice_quality_results.json", "Voice Quality"),
            "coverage": ("coverage_performance_results.json", "Coverage Performance"),
            "wfc_performance": ("wfc_performance_results.json", "WFC")
        }
        for category, (filename, root_key) in export_map.items():
            if self.results[category]:
                os.makedirs(self.output_dir, exist_ok=True)
                path = os.path.join(self.output_dir, filename)
                # Wrap the results in the category root key
                final_output = {root_key: self.results[category]}
                with open(path, 'w', encoding='utf-8') as f:
                    json.dump(final_output, f, ensure_ascii=False, indent=4)
                self.logger.info(f"{root_key} results exported to {path}")

    def _export_processing_summary(self):
        if not self.processing_stats["valid_files"] and not self.processing_stats["invalid_files"]:
            return # Skip summary if nothing processed
            
        os.makedirs(self.output_dir, exist_ok=True)
        summary_path = os.path.join(self.output_dir, "processing_summary.json")
        summary_data = {
            "market": self.market,
            "total_files_processed": len(self.processing_stats["valid_files"]) + len(self.processing_stats["invalid_files"]),
            "successfully_processed": len(self.processing_stats["valid_files"]),
            "failed_or_skipped": len(self.processing_stats["invalid_files"]),
            "valid_files": self.processing_stats["valid_files"],
            "invalid_files": self.processing_stats["invalid_files"]
        }
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary_data, f, ensure_ascii=False, indent=4)
        
        # Also generate the simple count text file for quick reference
        count_path = os.path.join(self.output_dir, "Processed File Count.txt")
        with open(count_path, 'w', encoding='utf-8') as f:
            f.write(f"Total files processed: {summary_data['total_files_processed']}\n")
            f.write(f"Correctly processed statistics: {summary_data['successfully_processed']}\n")
            f.write(f"Incorrect paths/Invalid data: {summary_data['failed_or_skipped']}\n")
        
        self.logger.info(f"Processing summary exported to {summary_path}")

if __name__ == "__main__":
    # Load config initially to get base data location
    config = Config("config/config.yaml")
    base_raw_dir = config.get("project.base_raw_data_dir")
    
    # Get configured markets as whitelist
    markets_config = config.get("markets", {})
    configured_market_names = list(markets_config.keys())
    
    # Auto-discover projects and markets
    if os.path.isdir(base_raw_dir):
        # We search for folders starting with '#' as project folders
        # Folders NOT starting with '#' are now ignored as per requirement
        discovered_targets = [] # List of (project_name, market_name)
        
        for name in os.listdir(base_raw_dir):
            full_path = os.path.join(base_raw_dir, name)
            if os.path.isdir(full_path) and name.startswith("#"):
                # This is a project folder, discover markets inside
                project_folder = name
                for sub_name in os.listdir(full_path):
                    if os.path.isdir(os.path.join(full_path, sub_name)):
                        # Strict filtering: only markets in the whitelist
                        if sub_name in configured_market_names:
                            discovered_targets.append((project_folder, sub_name))
                        else:
                            print(f"Ignoring non-configured market folder: {project_folder}/{sub_name}")
            else:
                # Top level folders without '#' are ignored
                if os.path.isdir(full_path):
                    print(f"Skipping non-project directory: {name}")
        
        if not discovered_targets:
            print(f"No project directories (starting with '#') found in: {base_raw_dir}")
        else:
            print(f"Discovered targets: {discovered_targets}")
            
            for project, market in discovered_targets:
                print(f"\n--- Processing Project: {project} | Market: {market} ---")
                pipeline = DataAnalysisPipeline(market_name=market, project_name=project)
                pipeline.run()
            
    else:
        print(f"Error: Base raw data directory not found: {base_raw_dir}")

