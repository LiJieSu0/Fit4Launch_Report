import os
import logging
from report_generator.base_analyzer import BaseAnalyzer
import mrab_statistics

class MrabPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, file_path):
        """
        Analyze MRAB performance for one or more files.
        
        Args:
            file_path: Either a single file path (str) or a list of file paths (list)
        """
        # Handle both single file and file list
        if isinstance(file_path, list):
            file_paths = file_path
            first_file = file_paths[0] if file_paths else None
        else:
            file_paths = [file_path]
            first_file = file_path
        
        self.logger.info(f"Analyzing MRAB Performance for: {file_path}")
        
        if not first_file:
            self.logger.error("No files provided for MRAB analysis")
            return None
        
        from DataPerformance import data_performance_statics
        # Use first file to determine parameters
        params = data_performance_statics._determine_analysis_parameters(first_file)
        
        target_header = "[Call Test] [Throughput] Application DL TP"
        threshold = 10
        # Pass the file list to extract_intervals_and_values
        mrab_intervals = mrab_statistics.extract_intervals_and_values(file_paths, target_header, threshold)
        
        if mrab_intervals:
            mrab_analysis_results, _, _ = mrab_statistics.analyze_grouped_intervals(mrab_intervals)
            if mrab_analysis_results:
                results = {
                    "MRAB Statistics": mrab_analysis_results
                }
                if params:
                    results.update({
                        "Device Type": params.get("device_type_detected"),
                        "Network Type": params.get("network_type_detected"),
                        "Analysis Type": "mrab_performance"
                    })
                return results
        
        self.logger.warning(f"No MRAB intervals found for: {file_path}")
        return None

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"MRAB results exported to {output_path}")
