import os
import logging
import re
from report_generator.base_analyzer import BaseAnalyzer
from DataPerformance.mhs_drive_analyzer import analyze_mhs_drive_data

class MHSDriveAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, path: str):
        if os.path.isfile(path):
            self.logger.info(f"Analyzing MHS Drive file: {path}")
            return self._analyze_file(path)
        elif os.path.isdir(path):
            self.logger.info(f"Analyzing MHS Drive directory: {path}")
            return self._analyze_directory(path)
        return None

    def _analyze_file(self, file_path):
        filename_pattern = re.compile(r"(DUT|REF)\s+MHS UDP Drive\.csv", re.IGNORECASE)
        file_name = os.path.basename(file_path)
        match = filename_pattern.match(file_name)
        if match:
            device_type = match.group(1).upper()
            analysis_res = analyze_mhs_drive_data(file_path, device_type)
            if analysis_res:
                filename_without_ext = os.path.splitext(file_name)[0]
                if "REF" in filename_without_ext.upper(): filename_without_ext = "REF"
                elif "DUT" in filename_without_ext.upper(): filename_without_ext = "DUT"
                return {
                    filename_without_ext: {
                        "Device Type": device_type,
                        "Network Type": "5G",
                        "Analysis Type": "mhs_drive_performance",
                        **analysis_res
                    }
                }
        return None

    def _analyze_directory(self, directory_path):
        results = {}
        filename_pattern = re.compile(r"(DUT|REF)\s+MHS UDP Drive\.csv", re.IGNORECASE)

        for file_name in os.listdir(directory_path):
            if file_name.lower().endswith(".csv"):
                file_path = os.path.join(directory_path, file_name)
                res = self._analyze_file(file_path)
                if res:
                    results.update(res)
        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"MHS Drive results exported to {output_path}")
