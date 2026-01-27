import os
import logging
import pandas as pd
import re
from report_generator.base_analyzer import BaseAnalyzer
from CallPerformance.call_analyze import _calculate_fisher_exact_criteria

class WfcPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger
        # MOS Headers
        self.primary_mos_column = "[Call Test] [Voice Quality] [Per Rx Clip] MOS Value"
        self.secondary_mos_column = "[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)"
        # Setup Time Headers
        self.sip_setup_header = '[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)'
        # Call Performance Headers
        self.call_type_header = '[Call Test] Call Type'
        self.call_result_header = '[Call Test] Call Result'
        # RSSI/RSRP Headers
        self.rssi_header = '[WiFi] [Serving AP] RSSI'
        self.rsrp_header = '[Call Test] [Voice Quality] [Per Rx Clip] [RF Quality] 5G RSRP'

    def _calculate_column_average(self, df, header):
        """Calculates the average of a specific column, handling numeric conversion."""
        if header in df.columns:
            values = pd.to_numeric(df[header], errors='coerce').dropna()
            if not values.empty:
                return round(float(values.mean()), 4)
        return None

    def _determine_category(self, filename):
        """
        Determines the category from the filename.
        Prioritizes [Device] [Orientation] (e.g., DUT MO), 
        falls back to [Device] (e.g., DUT) if MO/MT is missing.
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
            call_type = " MO"
        elif "_MT_" in filename_upper or "_MT-" in filename_upper:
            call_type = " MT"
            
        return f"{device}{call_type}"

    def _calculate_mos_average(self, df):
        """Calculates the average MOS value from a DataFrame."""
        target_column = None
        if self.primary_mos_column in df.columns:
            target_column = self.primary_mos_column
        elif self.secondary_mos_column in df.columns:
            target_column = self.secondary_mos_column

        if target_column:
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

    def _calculate_call_performance(self, df):
        """Calculates call performance metrics for MO calls."""
        if self.call_type_header not in df.columns or self.call_result_header not in df.columns:
            return None

        # Filter for Voice calls
        voice_calls = df[df[self.call_type_header].astype(str).str.contains('Voice', na=False)]
        if voice_calls.empty:
            return None

        # In WFC MO files, all "Voice" calls are MO calls.
        total_mo_attempts = voice_calls.shape[0]
        
        # Call results
        results = voice_calls[self.call_result_header].value_counts().to_dict()
        
        total_initiation_failures = results.get('Orig. Fail', 0)
        total_retention_failures = results.get('Drop', 0)
        total_attempts = voice_calls.shape[0]
        total_initiation_successes = total_attempts - total_initiation_failures

        return {
            "total_mo_attempts": int(total_mo_attempts),
            "total_initiation_failures": int(total_initiation_failures),
            "total_retention_failures": int(total_retention_failures),
            "total_initiation_successes": int(total_initiation_successes)
        }

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
                    
                    # 1. MOS
                    mos_avg = self._calculate_mos_average(df)
                    # 2. Setup Time
                    setup_time = self._calculate_setup_time(df)
                    # 3. Call Performance (MO Only)
                    cp_stats = None
                    if "MO" in category:
                        cp_stats = self._calculate_call_performance(df)
                    
                    # 4. RSSI and RSRP
                    rssi_avg = self._calculate_column_average(df, self.rssi_header)
                    rsrp_avg = self._calculate_column_average(df, self.rsrp_header)
                    
                    if category not in tc_stats:
                        tc_stats[category] = {
                            "mos": [], 
                            "setup_time": [],
                            "cp": [],
                            "rssi": [],
                            "rsrp": []
                        }
                    
                    if mos_avg is not None:
                        tc_stats[category]["mos"].append(mos_avg)
                    if setup_time is not None:
                        tc_stats[category]["setup_time"].append(setup_time)
                    if cp_stats is not None:
                        tc_stats[category]["cp"].append(cp_stats)
                    if rssi_avg is not None:
                        tc_stats[category]["rssi"].append(rssi_avg)
                    if rsrp_avg is not None:
                        tc_stats[category]["rsrp"].append(rsrp_avg)
                        
                except Exception as e:
                    self.logger.error(f"Error processing {file_path}: {e}")

            if tc_stats:
                final_tc_results = {}
                for category, metrics in tc_stats.items():
                    final_tc_results[category] = {}
                    
                    # Metric: MOS
                    mos_values = metrics["mos"]
                    final_tc_results[category]["mos_average"] = round(sum(mos_values) / len(mos_values), 4) if mos_values else "N/A"
                    
                    # Metric: Setup Time
                    setup_values = metrics["setup_time"]
                    final_tc_results[category]["mean_setup_time"] = round(sum(setup_values) / len(setup_values), 4) if setup_values else "N/A"
                    
                    # Metric: RSSI
                    rssi_values = metrics["rssi"]
                    final_tc_results[category]["rssi_average"] = round(sum(rssi_values) / len(rssi_values), 4) if rssi_values else "N/A"

                    # Metric: RSRP
                    rsrp_values = metrics["rsrp"]
                    final_tc_results[category]["rsrp_average"] = round(sum(rsrp_values) / len(rsrp_values), 4) if rsrp_values else "N/A"

                    # Metric: Call Performance (MO/DUT with CP only)
                    if metrics["cp"]:
                        agg_cp = {
                            "total_mo_attempts": 0,
                            "total_initiation_failures": 0,
                            "total_retention_failures": 0,
                            "total_initiation_successes": 0
                        }
                        for entry in metrics["cp"]:
                            for k in agg_cp:
                                agg_cp[k] += entry.get(k, 0)
                        final_tc_results[category].update(agg_cp)
                
                # Calculate p-values for MO calls if both DUT MO and REF MO exist
                if "DUT MO" in final_tc_results and "REF MO" in final_tc_results:
                    dut_mo = final_tc_results["DUT MO"]
                    ref_mo = final_tc_results["REF MO"]
                    
                    # initiation_p_value
                    if "total_mo_attempts" in dut_mo and "total_mo_attempts" in ref_mo:
                        _, p_init = _calculate_fisher_exact_criteria(
                            dut_mo.get('total_initiation_failures', 0), 
                            dut_mo.get('total_mo_attempts', 0) - dut_mo.get('total_initiation_failures', 0),
                            ref_mo.get('total_initiation_failures', 0), 
                            ref_mo.get('total_mo_attempts', 0) - ref_mo.get('total_initiation_failures', 0),
                            criteria_type="WFC MO Initiation"
                        )
                        if p_init is not None:
                            final_tc_results["initiation_p_value"] = p_init
                            
                        # retention_p_value
                        _, p_ret = _calculate_fisher_exact_criteria(
                            dut_mo.get('total_retention_failures', 0), 
                            dut_mo.get('total_initiation_successes', 0),
                            ref_mo.get('total_retention_failures', 0), 
                            ref_mo.get('total_initiation_successes', 0),
                            criteria_type="WFC MO Retention"
                        )
                        if p_ret is not None:
                            final_tc_results["retention_p_value"] = p_ret

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
