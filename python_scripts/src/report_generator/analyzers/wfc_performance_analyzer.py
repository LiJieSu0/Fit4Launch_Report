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
        self.rsrp_fallback_header = '[NR5G] [RF] RSRP'
        self.rsrp_fallback_header_2 = '[NR5G] [Cell Info] Dominant Cell RSRP'
        # Handover Header
        self.network_type_header = '[Mobile Info] [Android] [Radio] Network Type (Data Svc)'

    def _calculate_column_average(self, df, header):
        """Calculates the average of a specific column, handling numeric conversion."""
        if header in df.columns:
            values = pd.to_numeric(df[header], errors='coerce').dropna()
            if not values.empty:
                return round(float(values.mean()), 4)
        return None

    def _extract_tc_number(self, tc_name):
        """Extracts the numeric part of the TC name (e.g., 'TC164' -> 164)."""
        if not tc_name: return None
        match = re.search(r'TC(\d+)', tc_name, re.IGNORECASE)
        if match:
            return int(match.group(1))
        return None

    def _determine_tc(self, filename):
        """Extracts TC label from filename and standardizes it to TCxxx."""
        match = re.search(r'TC-?(\d+)', filename, re.IGNORECASE)
        if match:
            return f"TC{match.group(1)}"
        return None

    def _calculate_handover_count(self, df):
        """Counts transitions between NR (NR_SA) and IWLAN, ignoring blanks."""
        if self.network_type_header not in df.columns:
            return 0
        
        # Get values, strip whitespace, and filter out empty ones
        types = df[self.network_type_header].astype(str).str.strip()
        filtered_types = [t for t in types if t and t.lower() != 'nan' and t != '']
        
        count = 0
        if len(filtered_types) < 2:
            return 0
            
        for i in range(len(filtered_types) - 1):
            prev = filtered_types[i]
            curr = filtered_types[i+1]
            
            # Check for transition between NR and IWLAN
            # NR might be "NR (NR_SA)" or just "NR"
            is_nr_prev = "NR" in prev.upper()
            is_iwlan_prev = "IWLAN" in prev.upper()
            is_nr_curr = "NR" in curr.upper()
            is_iwlan_curr = "IWLAN" in curr.upper()
            
            if (is_nr_prev and is_iwlan_curr) or (is_iwlan_prev and is_nr_curr):
                count += 1
        return count

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
        # Improved regex to catch MO/MT with various delimiters (any non-alphanumeric) or at boundaries
        match_call = re.search(r'(?:[^a-zA-Z0-9]|^)(MO|MT)(?:[^a-zA-Z0-9]|$)', filename_upper)
        if match_call:
            call_type = f" {match_call.group(1)}"
            
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

    def _calculate_ip_impairments_mos(self, df):
        """
        Calculates MOS Before/After Handover for IP Impairment cases (TC171, TC172, TC173).
        Finds the first transition from IWLAN to NR(NR_SA).
        Block 1: IWLAN part before transition.
        Block 2: NR part after transition (until it changes back to IWLAN or ends).
        """
        if self.network_type_header not in df.columns:
            return None
            
        target_column = None
        if self.primary_mos_column in df.columns:
            target_column = self.primary_mos_column
        elif self.secondary_mos_column in df.columns:
            target_column = self.secondary_mos_column
            
        if not target_column:
            return None

        # Forward fill the network type to ensure all rows have a state
        df_temp = df.copy()
        df_temp[self.network_type_header] = df_temp[self.network_type_header].replace('', pd.NA).ffill()
        df_temp[target_column] = pd.to_numeric(df_temp[target_column], errors='coerce')
        
        # Filter out rows without MOS value to get effective blocks
        df_valid_mos = df_temp.dropna(subset=[target_column])
        if df_valid_mos.empty:
            return None
            
        types = df_valid_mos[self.network_type_header].astype(str).str.strip().str.upper()
        
        # Find the transition IWLAN -> NR
        transition_idx = -1
        for i in range(len(types) - 1):
            prev = types.iloc[i]
            curr = types.iloc[i+1]
            if "IWLAN" in prev and "NR" in curr:
                transition_idx = i
                break
                
        if transition_idx == -1:
            return None
            
        # Block 1: The contiguous IWLAN rows ending at transition_idx
        block1_start = transition_idx
        while block1_start >= 0 and "IWLAN" in types.iloc[block1_start]:
            block1_start -= 1
        block1_start += 1
        
        # Block 2: The contiguous NR rows starting at transition_idx + 1
        block2_end = transition_idx + 1
        while block2_end < len(types) and "NR" in types.iloc[block2_end]:
            block2_end += 1
            
        block1_mos = df_valid_mos[target_column].iloc[block1_start : transition_idx + 1]
        block2_mos = df_valid_mos[target_column].iloc[transition_idx + 1 : block2_end]
        
        mos_before = None
        mos_after = None
        
        if not block1_mos.empty:
            mos_before = round(float(block1_mos.mean()), 4)
            
        if not block2_mos.empty:
            mos_after = round(float(block2_mos.mean()), 4)
            
        if mos_before is not None or mos_after is not None:
            return {
                "mos_before_handover": mos_before,
                "mos_after_handover": mos_after
            }
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
        """Calculates call performance metrics (Drop/Block) for non-MT calls."""
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
        TC is determined from filename, and multiple runs for the same Case are aggregated.
        """
        self.logger.info(f"Analyzing WFC root directory: {root_directory}")
        
        if not os.path.isdir(root_directory):
            self.logger.error(f"Directory not found: {root_directory}")
            return None

        # 1. Collect all CSV files and group them by TC and Category
        tc_groups = {} # {tc_name: {category: [file_paths]}}
        
        for root, _, files in os.walk(root_directory):
            for filename in files:
                if filename.lower().endswith('.csv'):
                    tc_name = self._determine_tc(filename)
                    if not tc_name:
                        # Fallback to directory name if filename doesn't have TC
                        tc_name = self._determine_tc(os.path.basename(root))
                    
                    if not tc_name:
                        self.logger.debug(f"Could not determine TC for file: {filename}")
                        continue
                        
                    category = self._determine_category(filename)
                    
                    if tc_name not in tc_groups:
                        tc_groups[tc_name] = {}
                    if category not in tc_groups[tc_name]:
                        tc_groups[tc_name][category] = []
                    
                    tc_groups[tc_name][category].append(os.path.join(root, filename))

        if not tc_groups:
            self.logger.warning(f"No WFC CSV files with valid TC found in {root_directory}")
            return None

        results = {}
        
        # 2. Process each TC (Sorted numerically)
        sorted_tc_items = sorted(tc_groups.items(), key=lambda x: self._extract_tc_number(x[0]) or 0)
        for tc_name, categories in sorted_tc_items:
            self.logger.info(f"Processing WFC Test Case: {tc_name}")
            tc_results = {}
            tc_num = self._extract_tc_number(tc_name)
            
            for category, file_paths in categories.items():
                category_metrics = {
                    "mos": [], 
                    "setup_time": [],
                    "cp": [],
                    "rssi": [],
                    "rsrp": [],
                    "handover_counts": []
                }
                
                for file_path in file_paths:
                    try:
                        df = pd.read_csv(file_path, low_memory=False)
                        
                        # Metrics
                        mos_avg = self._calculate_mos_average(df)
                        setup_time = self._calculate_setup_time(df)
                        rssi_avg = self._calculate_column_average(df, self.rssi_header)
                        rsrp_avg = self._calculate_column_average(df, self.rsrp_header)
                        if rsrp_avg is None:
                            rsrp_avg = self._calculate_column_average(df, self.rsrp_fallback_header)
                        if rsrp_avg is None:
                            rsrp_avg = self._calculate_column_average(df, self.rsrp_fallback_header_2)
                        
                        if mos_avg is not None: category_metrics["mos"].append(mos_avg)
                        if setup_time is not None: category_metrics["setup_time"].append(setup_time)
                        if rssi_avg is not None: category_metrics["rssi"].append(rssi_avg)
                        if rsrp_avg is not None: category_metrics["rsrp"].append(rsrp_avg)
                        
                        if tc_num in [171, 172, 173]:
                            ip_mos = self._calculate_ip_impairments_mos(df)
                            if ip_mos:
                                if "ip_mos_before" not in category_metrics:
                                    category_metrics["ip_mos_before"] = []
                                    category_metrics["ip_mos_after"] = []
                                if ip_mos.get("mos_before_handover") is not None:
                                    category_metrics["ip_mos_before"].append(ip_mos["mos_before_handover"])
                                if ip_mos.get("mos_after_handover") is not None:
                                    category_metrics["ip_mos_after"].append(ip_mos["mos_after_handover"])
                        
                        if "MT" not in category:
                            cp_stats = self._calculate_call_performance(df)
                            if cp_stats: category_metrics["cp"].append(cp_stats)
                            
                        if tc_num and tc_num >= 162:
                            ho_count = self._calculate_handover_count(df)
                            category_metrics["handover_counts"].append(ho_count)
                            
                    except Exception as e:
                        self.logger.error(f"Error processing {file_path}: {e}")

                # Aggregate Category results
                tc_results[category] = {}
                
                mos_values = category_metrics["mos"]
                tc_results[category]["mos_average"] = round(sum(mos_values) / len(mos_values), 4) if mos_values else "N/A"
                
                setup_values = category_metrics["setup_time"]
                tc_results[category]["mean_setup_time"] = round(sum(setup_values) / len(setup_values), 4) if setup_values else "N/A"
                
                rssi_values = category_metrics["rssi"]
                tc_results[category]["rssi_average"] = round(sum(rssi_values) / len(rssi_values), 4) if rssi_values else "N/A"

                rsrp_values = category_metrics["rsrp"]
                tc_results[category]["rsrp_average"] = round(sum(rsrp_values) / len(rsrp_values), 4) if rsrp_values else "N/A"

                if tc_num and tc_num >= 162:
                    ho_values = category_metrics["handover_counts"]
                    tc_results[category]["minimum_handover"] = sum(ho_values) if ho_values else 0

                if "ip_mos_before" in category_metrics:
                    mos_before_vals = category_metrics["ip_mos_before"]
                    tc_results[category]["mos_before_handover_average"] = round(sum(mos_before_vals) / len(mos_before_vals), 4) if mos_before_vals else "N/A"
                if "ip_mos_after" in category_metrics:
                    mos_after_vals = category_metrics["ip_mos_after"]
                    tc_results[category]["mos_after_handover_average"] = round(sum(mos_after_vals) / len(mos_after_vals), 4) if mos_after_vals else "N/A"

                if category_metrics["cp"]:
                    agg_cp = {
                        "total_mo_attempts": 0,
                        "total_initiation_failures": 0,
                        "total_retention_failures": 0,
                        "total_initiation_successes": 0
                    }
                    for entry in category_metrics["cp"]:
                        for k in agg_cp:
                            agg_cp[k] += entry.get(k, 0)
                    tc_results[category].update(agg_cp)

            # 3. Calculate p-values
            if "DUT MO" in tc_results and "REF MO" in tc_results:
                dut_mo = tc_results["DUT MO"]
                ref_mo = tc_results["REF MO"]
                
                if "total_mo_attempts" in dut_mo and "total_mo_attempts" in ref_mo:
                    _, p_init = _calculate_fisher_exact_criteria(
                        dut_mo.get('total_initiation_failures', 0), 
                        dut_mo.get('total_mo_attempts', 0) - dut_mo.get('total_initiation_failures', 0),
                        ref_mo.get('total_initiation_failures', 0), 
                        ref_mo.get('total_mo_attempts', 0) - ref_mo.get('total_initiation_failures', 0),
                        criteria_type="WFC MO Initiation"
                    )
                    if p_init is not None: tc_results["initiation_p_value"] = p_init
                        
                    _, p_ret = _calculate_fisher_exact_criteria(
                        dut_mo.get('total_retention_failures', 0), 
                        dut_mo.get('total_initiation_successes', 0),
                        ref_mo.get('total_retention_failures', 0), 
                        ref_mo.get('total_initiation_successes', 0),
                        criteria_type="WFC MO Retention"
                    )
                    if p_ret is not None: tc_results["retention_p_value"] = p_ret

            if tc_results:
                results[tc_name] = tc_results

        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        import json
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        self.logger.info(f"WFC Performance results exported to {output_path}")


    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        import json
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        self.logger.info(f"WFC Performance results exported to {output_path}")
