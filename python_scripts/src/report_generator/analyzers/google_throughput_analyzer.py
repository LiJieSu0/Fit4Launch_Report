import os
import logging
import re
from report_generator.base_analyzer import BaseAnalyzer
from DataPerformance.google_throughput_analyzer import analyze_throughput as google_analyze_throughput

class GoogleThroughputAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, path: str):
        if os.path.isfile(path):
            self.logger.info(f"Analyzing Google Throughput file: {path}")
            return self._analyze_file(path)
        elif os.path.isdir(path):
            self.logger.info(f"Analyzing Google Throughput directory: {path}")
            return self._analyze_directory(path)
        return None

    def _analyze_file(self, file_path):
        filename_pattern = re.compile(r".*APP-(\d+M)_(DUT|REF)_.*\.csv", re.IGNORECASE)
        file_name = os.path.basename(file_path)
        match = filename_pattern.match(file_name)
        if match:
            test_content = match.group(1).upper()
            device_type = match.group(2).upper()
            analysis_res = google_analyze_throughput(file_path)
            if analysis_res:
                return {
                    device_type: {
                        test_content: {
                            "overall_average_throughput": analysis_res["overall_average"]
                        }
                    }
                }
        return None

    def _analyze_directory(self, directory_path):
        results = {}
        filename_pattern = re.compile(r".*APP-(\d+M)_(DUT|REF)_.*\.csv", re.IGNORECASE)
        quality_location_pattern = re.compile(r"(Good|Moderate|Poor)", re.IGNORECASE)
        location_pattern = re.compile(r"Location (\d+)", re.IGNORECASE)

        for root, _, files in os.walk(directory_path):
            location = "unknown_location"
            quality_match = quality_location_pattern.search(root)
            if quality_match:
                location = quality_match.group(1)
            else:
                loc_match = location_pattern.search(root)
                if loc_match:
                    location = f"location{loc_match.group(1)}"

            for file_name in files:
                if file_name.lower().endswith(".csv"):
                    match = filename_pattern.match(file_name)
                    if match:
                        test_content = match.group(1).upper()
                        device_type = match.group(2).upper()
                        file_path = os.path.join(root, file_name)
                        
                        analysis_res = google_analyze_throughput(file_path)
                        if analysis_res:
                            if location not in results:
                                results[location] = {}
                            if device_type not in results[location]:
                                results[location][device_type] = {}
                            
                            results[location][device_type][test_content] = {
                                "overall_average_throughput": analysis_res["overall_average"]
                            }
        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"Google Throughput results exported to {output_path}")
