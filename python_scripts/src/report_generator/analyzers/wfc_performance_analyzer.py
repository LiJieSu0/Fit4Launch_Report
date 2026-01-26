import os
import logging
import pandas as pd
import re
from report_generator.base_analyzer import BaseAnalyzer

class WfcPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger
        self.primary_mos_column = "[Call Test] [Voice Quality] [Per Rx Clip] MOS Value"
        self.secondary_mos_column = "[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)"

    def _determine_category(self, filename):
        """
        Determines the category (DUT MO, DUT MT, REF MO, REF MT) from the filename.
        """
        filename_upper = filename.upper()
        
        # Determine Device
        device = "DUT"
        if "REF" in filename_upper:
            device = "REF"
        elif "DUT" in filename_upper:
            device = "DUT"
            
        # Determine MO/MT
        call_type = ""
        if "_MO_" in filename_upper or "_MO-" in filename_upper:
            call_type = "MO"
        elif "_MT_" in filename_upper or "_MT-" in filename_upper:
            call_type = "MT"
            
        if call_type:
            return f"{device} {call_type}"
        return None

    def _calculate_mos_average(self, file_path):
        """Calculates the average MOS value from a CSV file."""
        try:
            df = pd.read_csv(file_path, low_memory=False)
            target_column = None
            if self.primary_mos_column in df.columns:
                target_column = self.primary_mos_column
            elif self.secondary_mos_column in df.columns:
                target_column = self.secondary_mos_column

            if target_column:
                df[target_column] = pd.to_numeric(df[target_column], errors='coerce')
                mean_val = df[target_column].mean()
                if pd.notna(mean_val):
                    return round(float(mean_val), 4)
        except Exception as e:
            self.logger.error(f"Error calculating MOS for {file_path}: {e}")
        return None

    def analyze(self, root_directory: str):
        """
        Analyzes a WFC directory containing multiple test case subdirectories.
        Groups results by TC and then by category (DUT MO, DUT MT, etc.).
        """
        self.logger.info(f"Analyzing WFC root directory: {root_directory}")
        
        if not os.path.isdir(root_directory):
            self.logger.error(f"Directory not found: {root_directory}")
            return None

        results = {}
        
        for tc_dir_name in os.listdir(root_directory):
            tc_dir_path = os.path.join(root_directory, tc_dir_name)
            if not os.path.isdir(tc_dir_path):
                continue

            self.logger.info(f"Processing WFC Test Case: {tc_dir_name}")
            tc_stats = {}

            csv_files = [f for f in os.listdir(tc_dir_path) if f.lower().endswith('.csv')]
            
            for csv_file in csv_files:
                category = self._determine_category(csv_file)
                if not category:
                    self.logger.warning(f"Could not determine category for {csv_file}, skipping.")
                    continue
                
                file_path = os.path.join(tc_dir_path, csv_file)
                mos_avg = self._calculate_mos_average(file_path)
                
                if mos_avg is not None:
                    if category not in tc_stats:
                        tc_stats[category] = {
                            "mos_average": mos_avg,
                            "count": 1
                        }
                    else:
                        # If multiple files for same category, compute running average
                        # This is a precaution, usually there is one file per category
                        current = tc_stats[category]
                        new_avg = (current["mos_average"] * current["count"] + mos_avg) / (current["count"] + 1)
                        current["mos_average"] = round(new_avg, 4)
                        current["count"] += 1

            if tc_stats:
                # Clean up the output to only show mos_average
                final_tc_stats = {k: v["mos_average"] for k, v in tc_stats.items()}
                results[tc_dir_name] = final_tc_stats

        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        import json
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        self.logger.info(f"WFC Performance results exported to {output_path}")
