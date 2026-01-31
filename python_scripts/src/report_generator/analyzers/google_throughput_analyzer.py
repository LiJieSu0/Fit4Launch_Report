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
        dev_pattern = re.compile(r"(DUT|REF)", re.IGNORECASE)
        size_pattern = re.compile(r"(?:APP-|Playstore |Play Store )(\d+)\s*M[B]?", re.IGNORECASE)
        file_name = os.path.basename(file_path)
        dev_match = dev_pattern.search(file_name)
        size_match = size_pattern.search(file_name)
        if dev_match and size_match:
            test_content = size_match.group(1).upper() + "M"
            device_type = dev_match.group(1).upper()
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
        dev_pattern = re.compile(r"(DUT|REF)", re.IGNORECASE)
        size_pattern = re.compile(r"(?:APP-|Playstore |Play Store )(\d+)\s*M[B]?", re.IGNORECASE)
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
                    dev_match = dev_pattern.search(file_name)
                    size_match = size_pattern.search(file_name)
                    if dev_match and size_match:
                        test_content = size_match.group(1).upper() + "M"
                        device_type = dev_match.group(1).upper()
                        file_path = os.path.join(root, file_name)
                        
                        self.logger.info(f"Processing Play Store file: {file_name} (Size: {test_content}, Device: {device_type}, Location: {location})")
                        analysis_res = google_analyze_throughput(file_path)
                        if analysis_res:
                            self.logger.info(f"Successfully analyzed {file_name}: {analysis_res['overall_average']}")
                            if location not in results:
                                results[location] = {}
                            if device_type not in results[location]:
                                results[location][device_type] = {}
                            
                            results[location][device_type][test_content] = {
                                "overall_average_throughput": analysis_res["overall_average"]
                            }
                        else:
                            self.logger.warning(f"Failed to analyze {file_name} (likely no valid throughput data)")
                    else:
                        self.logger.debug(f"File {file_name} did not match Play Store pattern")
        self.logger.info(f"Google Throughput analysis directory processing complete. Results found: {bool(results)}")
        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"Google Throughput results exported to {output_path}")
