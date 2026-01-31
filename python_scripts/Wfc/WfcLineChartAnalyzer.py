import pandas as pd
import json
import os
import re

def calculate_wfc_statistics(directory_path, output_json_path="wfc_statistics.json"):
    """
    Reads MOS values from all CSV files in a specified directory, performs interval statistics,
    calculates percentages, and outputs the aggregated results to a single JSON file.
    Separates MO and MT for both DUT and REF.

    Args:
        directory_path (str): The path to the directory containing input CSV files.
        output_json_path (str): The path for the output JSON file.
    """
    if not os.path.isdir(directory_path):
        print(f"Error: Directory not found at {directory_path}")
        return

    all_statistics_results = {}
    
    primary_column = "[Call Test] [Voice Quality] [Per Rx Clip] MOS Value"
    secondary_column = "[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)"

    for filename in os.listdir(directory_path):
        if filename.lower().endswith(".csv"):
            csv_file_path = os.path.join(directory_path, filename)
            filename_upper = filename.upper()

            # 1. Determine Device (DUT/REF)
            device = "DUT"
            if "REF" in filename_upper:
                device = "REF"
            elif "DUT" in filename_upper:
                device = "DUT"
            
            # Extract TC Number
            tc_num = None
            dir_name = os.path.basename(directory_path)
            match = re.search(r'TC(\d+)', dir_name, re.IGNORECASE)
            if match:
                tc_num = int(match.group(1))

            # 2. Determine MO/MT
            call_type = ""
            
            # For TC164+, we only want DUT/REF, no MO/MT separation
            if tc_num and tc_num >= 164:
                call_type = "" # No suffix
            else:
                if any(x in filename_upper for x in ["_MO_", "_MO-", "-MO_", "-MO-"]):
                    call_type = "MO"
                elif any(x in filename_upper for x in ["_MT_", "_MT-", "-MT_", "-MT-"]):
                    call_type = "MT"
            
            if not call_type and (not tc_num or tc_num < 164):
                # If no MO/MT in filename and it's an old TC, skip
                continue
                
            json_key = f"{device} {call_type}".strip()

            try:
                df = pd.read_csv(csv_file_path, low_memory=False)
            except Exception as e:
                print(f"Error reading CSV file {filename}: {e}")
                continue

            target_column = None
            if primary_column in df.columns:
                target_column = primary_column
            elif secondary_column in df.columns:
                target_column = secondary_column

            if not target_column:
                continue

            mos_values = pd.to_numeric(df[target_column], errors='coerce').dropna()

            if mos_values.empty:
                continue

            total_count = len(mos_values)

            interval_counts = { "< 2.0": 0 }
            for i in range(20, 45):
                lower_bound = i / 10.0
                upper_bound = (i + 1) / 10.0
                interval_counts[f"[{lower_bound:.1f}, {upper_bound:.1f})"] = 0
            interval_counts[">= 4.5"] = 0

            for value in mos_values:
                if value < 2.0:
                    interval_counts["< 2.0"] += 1
                elif value >= 4.5:
                    interval_counts[">= 4.5"] += 1
                else:
                    found = False
                    for i in range(20, 45):
                        lower_bound = i / 10.0
                        upper_bound = (i + 1) / 10.0
                        if lower_bound <= value < upper_bound:
                            interval_counts[f"[{lower_bound:.1f}, {upper_bound:.1f})"] += 1
                            found = True
                            break

            if json_key not in all_statistics_results:
                all_statistics_results[json_key] = {interval: 0 for interval in interval_counts}
                all_statistics_results[json_key]["_total_count"] = 0
            
            for interval, count in interval_counts.items():
                all_statistics_results[json_key][interval] += count
            all_statistics_results[json_key]["_total_count"] += total_count

    final_output = {}
    for device_key, stats in all_statistics_results.items():
        total_count = stats.pop("_total_count")
        device_stats = {}
        for interval, count in stats.items():
            percentage = (count / total_count) * 100 if total_count > 0 else 0
            device_stats[interval] = {
                "count": count,
                "percentage": round(percentage, 2)
            }
        final_output[device_key] = device_stats

    if final_output:
        try:
            os.makedirs(os.path.dirname(output_json_path), exist_ok=True)
            with open(output_json_path, 'w', encoding='utf-8') as f:
                json.dump(final_output, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"Error writing JSON file: {e}")

def calculate_wfc_rssi_statistics(directory_path, output_json_path="wfc_rssi_statistics.json"):
    """
    Reads WiFi RSSI values from all CSV files in a specified directory, performs interval statistics,
    calculates percentages, and outputs the aggregated results to a single JSON file.
    Separates MO and MT for both DUT and REF.
    
    Bins: < -100, [-100, -98), [-98, -96), ..., [-32, -30), >= -30
    """
    if not os.path.isdir(directory_path):
        print(f"Error: Directory not found at {directory_path}")
        return

    all_statistics_results = {}
    rssi_header = "[WiFi] [Serving AP] RSSI"

    for filename in os.listdir(directory_path):
        if filename.lower().endswith(".csv"):
            csv_file_path = os.path.join(directory_path, filename)
            filename_upper = filename.upper()

            # 1. Determine Device (DUT/REF)
            device = "DUT"
            if "REF" in filename_upper:
                device = "REF"
            elif "DUT" in filename_upper:
                device = "DUT"
            
            # Extract TC Number
            tc_num = None
            dir_name = os.path.basename(directory_path)
            match = re.search(r'TC(\d+)', dir_name, re.IGNORECASE)
            if match:
                tc_num = int(match.group(1))

            # 2. Determine MO/MT
            call_type = ""
            if tc_num and tc_num >= 164:
                call_type = ""
            else:
                if any(x in filename_upper for x in ["_MO_", "_MO-", "-MO_", "-MO-"]):
                    call_type = "MO"
                elif any(x in filename_upper for x in ["_MT_", "_MT-", "-MT_", "-MT-"]):
                    call_type = "MT"
            
            if not call_type and (not tc_num or tc_num < 164):
                continue
                
            json_key = f"{device} {call_type}".strip()

            try:
                df = pd.read_csv(csv_file_path, low_memory=False)
            except Exception as e:
                print(f"Error reading CSV file {filename}: {e}")
                continue

            if rssi_header not in df.columns:
                continue

            rssi_values = pd.to_numeric(df[rssi_header], errors='coerce').dropna()
            if rssi_values.empty:
                continue

            total_count = len(rssi_values)

            # Initialize Bins
            interval_counts = { "< -100": 0 }
            for i in range(-100, -30, 2):
                lower = i
                upper = i + 2
                interval_counts[f"[{lower}, {upper})"] = 0
            interval_counts[">= -30"] = 0

            for value in rssi_values:
                if value < -100:
                    interval_counts["< -100"] += 1
                elif value >= -30:
                    interval_counts[">= -30"] += 1
                else:
                    # Generic binning logic
                    found = False
                    for i in range(-100, -30, 2):
                        lower = i
                        upper = i + 2
                        if lower <= value < upper:
                            interval_counts[f"[{lower}, {upper})"] += 1
                            found = True
                            break

            if json_key not in all_statistics_results:
                all_statistics_results[json_key] = {interval: 0 for interval in interval_counts}
                all_statistics_results[json_key]["_total_count"] = 0
            
            for interval, count in interval_counts.items():
                all_statistics_results[json_key][interval] += count
            all_statistics_results[json_key]["_total_count"] += total_count

    final_output = {}
    for device_key, stats in all_statistics_results.items():
        total_count = stats.pop("_total_count")
        device_stats = {}
        ordered_intervals = list(stats.keys())
        for interval in ordered_intervals:
            count = stats[interval]
            percentage = (count / total_count) * 100 if total_count > 0 else 0
            device_stats[interval] = {
                "count": count,
                "percentage": round(percentage, 2)
            }
        final_output[device_key] = device_stats

    if final_output:
        try:
            os.makedirs(os.path.dirname(output_json_path), exist_ok=True)
            with open(output_json_path, 'w', encoding='utf-8') as f:
                json.dump(final_output, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"Error writing JSON file: {e}")

