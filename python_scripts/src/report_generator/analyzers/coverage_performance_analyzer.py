import os
import logging
import re
from report_generator.base_analyzer import BaseAnalyzer
from Coverage.coverage_coordinate_analyzer import (
    analyze_coverage_coordinates, find_dut_ref_files, compare_analysis_results, 
    haversine_distance
)
from Coverage.n41_coverage_analyzer import analyze_n41_coverage
from Coverage.coverage_performance_analyzer import analyze_csv as analyze_vonr_coverage_performance
from Coverage.coverage_secondary_kpi_analyzer import analyze_secondary_kpis

class CoveragePerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, directory_path: str, analysis_type: str = "coverage_coordinate"):
        self.logger.info(f"Analyzing Coverage directory: {directory_path} (Type: {analysis_type})")
        
        if not os.path.isdir(directory_path):
            self.logger.error(f"Directory not found: {directory_path}")
            return None

        # Get market-specific coordinates from config
        market = self.config.get("project.market", "Seattle")
        self.coords = self.config.get(f"markets.{market}")
        if not self.coords:
            self.logger.warning(f"No coordinates found for market: {market}. Using Seattle defaults.")
            self.coords = self.config.get("markets.Seattle", {"latitude": 47.128234, "longitude": -122.356792})

        if analysis_type == "coverage_coordinate":
            return self._analyze_coordinate(directory_path)
        elif analysis_type == "n41_coverage":
            return self._analyze_n41(directory_path)
        elif analysis_type == "vonr_coverage_performance":
            return self._analyze_vonr(directory_path)
        
        return None

    def _analyze_coordinate(self, path):
        subfolders = [f.name for f in os.scandir(path) if f.is_dir()]
        results = {}
        run_pattern = re.compile(r"(DUT|REF)\d+_Run(\d+)\.csv", re.IGNORECASE)

        for subfolder in subfolders:
            subfolder_path = os.path.join(path, subfolder)
            paired_files = find_dut_ref_files(subfolder_path)
            if not paired_files: continue

            subfolder_results = {"DUT": {}, "REF": {}}
            for dut_file, ref_file in paired_files:
                dut_res = analyze_coverage_coordinates(dut_file, base_coords=self.coords) if dut_file else {}
                ref_res = analyze_coverage_coordinates(ref_file, base_coords=self.coords) if ref_file else {}
                
                # Extract run name from either file if available
                sample_file = dut_file if dut_file else ref_file
                run_match = re.search(r"Run(\d+)", os.path.basename(sample_file), re.IGNORECASE) if sample_file else None
                run_name = f"Run{run_match.group(1)}" if run_match else os.path.splitext(os.path.basename(sample_file))[0] if sample_file else "UnknownRun"

                if dut_file: subfolder_results["DUT"][run_name] = dut_res
                if ref_file: subfolder_results["REF"][run_name] = ref_res
            results[subfolder] = subfolder_results
        return results

    def _analyze_n41(self, path):
        results = {}
        for run_folder_name in os.listdir(path):
            run_folder_path = os.path.join(path, run_folder_name)
            if os.path.isdir(run_folder_path) and run_folder_name.startswith("Run"):
                n41_res = analyze_n41_coverage(run_folder_path)
                if n41_res:
                    for res in n41_res:
                        if res.get('latitude') is not None and res.get('longitude') is not None:
                            res['distance_km'] = haversine_distance(
                                res['latitude'], res['longitude'],
                                self.coords["latitude"], self.coords["longitude"]
                            )
                    results[run_folder_name] = n41_res
        return results

    def _analyze_vonr(self, path):
        results = {}
        for band_folder_name in os.listdir(path):
            band_folder_path = os.path.join(path, band_folder_name)
            if os.path.isdir(band_folder_path):
                band_results = {"DUT": {}, "REF": {}}
                for file_name in os.listdir(band_folder_path):
                    if file_name.lower().endswith(".csv"):
                        file_path = os.path.join(band_folder_path, file_name)
                        analysis_res = analyze_vonr_coverage_performance(file_path)
                        if analysis_res:
                            enriched = {}
                            for key, coords in analysis_res.items():
                                if coords and coords[0] is not None and coords[1] is not None:
                                    dist = haversine_distance(coords[0], coords[1], self.coords["latitude"], self.coords["longitude"])
                                    enriched[key] = {"latitude": coords[0], "longitude": coords[1], "distance_km": dist}
                                else:
                                    enriched[key] = {"latitude": None, "longitude": None, "distance_km": None}
                            
                            device_match = re.search(r"(DUT|REF|CH0\d)", file_name, re.IGNORECASE)
                            device_type = "Unknown"
                            if device_match:
                                matched_val = device_match.group(1).upper()
                                if matched_val in ["CH01", "REF"]:
                                    device_type = "REF"
                                elif matched_val in ["CH02", "DUT"]:
                                    device_type = "DUT"
                            run_match = re.search(r"Run(\d+)\.csv", file_name, re.IGNORECASE)
                            run_name = f"Run{run_match.group(1)}" if run_match else os.path.splitext(file_name)[0]
                            
                            if device_type in band_results:
                                band_results[device_type][run_name] = enriched
                                secondary = analyze_secondary_kpis(file_path)
                                if secondary:
                                    band_results[device_type][run_name]["secondary_kpi"] = secondary
                if band_results["DUT"] or band_results["REF"]:
                    results[band_folder_name] = band_results
        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"Coverage results exported to {output_path}")
