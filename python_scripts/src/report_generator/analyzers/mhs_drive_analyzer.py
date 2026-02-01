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
        file_name = os.path.basename(file_path)
        
        # Simple check for DUT/REF in filename (case-insensitive)
        device_type = None
        if "DUT" in file_name.upper():
            device_type = "DUT"
        elif "REF" in file_name.upper():
            device_type = "REF"
            
        if device_type:
            analysis_res = analyze_mhs_drive_data(file_path, device_type)
            if analysis_res:
                filename_without_ext = os.path.splitext(file_name)[0]
                # Clean up filename for the key if needed, or just use it as is. 
                # The pipeline usually expects keys like "DUT" or "REF" which is handled by pipeline.py logic 
                # after receiving this result. However, for consistency with previous logic:
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
        # Iterate over all CSV files in the directory
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
