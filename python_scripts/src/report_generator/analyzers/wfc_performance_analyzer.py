import os
import logging
import pandas as pd
import re
from report_generator.base_analyzer import BaseAnalyzer

class WfcPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger
        # MOS Headers
        self.primary_mos_column = "[Call Test] [Voice Quality] [Per Rx Clip] MOS Value"
        self.secondary_mos_column = "[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)"
        # Setup Time Headers
        self.sip_setup_header = '[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)'

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

    def _calculate_mos_average(self, df):
        """Calculates the average MOS value from a DataFrame."""
        target_column = None
        if self.primary_mos_column in df.columns:
            target_column = self.primary_mos_column
        elif self.secondary_mos_column in df.columns:
            target_column = self.secondary_mos_column

        if target_column:
            # Ensure numeric conversion
            mos_values = pd.to_numeric(df[target_column], errors='coerce').dropna()
            if not mos_values.empty:
                return round(float(mos_values.mean()), 4)
        return None

    def _calculate_setup_time(self, df):
        """Calculates the Mean Setup Time using multiple fallback methods."""
        setup_times = []

        # Method 1: SIP Setup Duration Header
        if self.sip_setup_header in df.columns:
            durations = pd.to_numeric(df[self.sip_setup_header], errors='coerce').dropna()
            if not durations.empty:
                setup_times.extend(durations.tolist())

        # Method 2: Time difference between Orig Success and Setup Success
        if not setup_times and 'Time' in df.columns and '[Event] Voice Call Event' in df.columns:
            df_temp = df.copy()
            df_temp['Time'] = pd.to_datetime(df_temp['Time'], errors='coerce')
            df_temp = df_temp.dropna(subset=['Time'])
            
            relevant_events = df_temp[df_temp['[Event] Voice Call Event'].isin([
                '[UE]   Voice - Orig Success', 
                '[UE]   Voice - Setup Success'
            ])].sort_values(by='Time')

            if not relevant_events.empty:
                orig_time = None
                for _, row in relevant_events.iterrows():
                    event_type = row['[Event] Voice Call Event']
                    current_time = row['Time']
                    if event_type == '[UE]   Voice - Orig Success':
                        orig_time = current_time
                    elif event_type == '[UE]   Voice - Setup Success' and orig_time is not None:
                        setup_times.append((current_time - orig_time).total_seconds())
                        orig_time = None

        # Method 3: Scheduling Start to Answer Request
        if not setup_times and 'Time' in df.columns and '[Event] Voice Call Event' in df.columns:
            df_temp = df.copy()
            df_temp['Time'] = pd.to_datetime(df_temp['Time'], errors='coerce')
            df_temp = df_temp.dropna(subset=['Time'])
            
            start_event = '[Tool] Voice - Call Scheduling Start(Term)'
            end_event = '[Tool] Voice - Answer Request'
            
            relevant_events = df_temp[df_temp['[Event] Voice Call Event'].isin([start_event, end_event])].sort_values(by='Time')

            if not relevant_events.empty:
                start_time = None
                for _, row in relevant_events.iterrows():
                    event_type = row['[Event] Voice Call Event']
                    current_time = row['Time']
                    if event_type == start_event:
                        start_time = current_time
                    elif event_type == end_event and start_time is not None:
                        setup_times.append((current_time - start_time).total_seconds())
                        start_time = None

        if setup_times:
            return round(sum(setup_times) / len(setup_times), 4)
        return None

    def analyze(self, root_directory: str):
        """
        Analyzes a WFC directory. Groups results by TC -> Category -> Metrics.
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
                    continue
                
                file_path = os.path.join(tc_dir_path, csv_file)
                try:
                    df = pd.read_csv(file_path, low_memory=False)
                    
                    mos_avg = self._calculate_mos_average(df)
                    setup_time = self._calculate_setup_time(df)
                    
                    if category not in tc_stats:
                        tc_stats[category] = {"mos": [], "setup_time": []}
                    
                    if mos_avg is not None:
                        tc_stats[category]["mos"].append(mos_avg)
                    if setup_time is not None:
                        tc_stats[category]["setup_time"].append(setup_time)
                        
                except Exception as e:
                    self.logger.error(f"Error processing {file_path}: {e}")

            if tc_stats:
                final_tc_results = {}
                for category, metrics in tc_stats.items():
                    final_tc_results[category] = {}
                    if metrics["mos"]:
                        final_tc_results[category]["mos_average"] = round(sum(metrics["mos"]) / len(metrics["mos"]), 4)
                    if metrics["setup_time"]:
                        final_tc_results[category]["mean_setup_time"] = round(sum(metrics["setup_time"]) / len(metrics["setup_time"]), 4)
                
                if final_tc_results:
                    results[tc_dir_name] = final_tc_results

        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        import json
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        self.logger.info(f"WFC Performance results exported to {output_path}")
