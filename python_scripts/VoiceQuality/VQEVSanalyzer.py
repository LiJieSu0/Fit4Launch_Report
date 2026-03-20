import os
import pandas as pd
import argparse
import re
import numpy as np

def parse_mos_metrics(file_path):
    """
    Parses a CSV file to extract MOS values from the relevant column and calculate metrics.
    """
    try:
        # Read the CSV file, skipping initial rows if they are empty or not part of the header
        # The actual header is the first line that contains '[Call Test] [Voice Quality] [Per Rx Clip] MOS Value'
        
        # Find the header row index
        header_row_index = -1
        primary_header = '[Call Test] [Voice Quality] [Per Rx Clip] MOS Value'
        fallback_header = '[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)'
        
        with open(file_path, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f):
                if primary_header in line or fallback_header in line:
                    header_row_index = i
                    break
        
        if header_row_index == -1:
            print(f"Warning: Neither '{primary_header}' nor '{fallback_header}' found in {file_path}")
            return None

        df = pd.read_csv(file_path, skiprows=header_row_index, encoding='utf-8')

        # Identify the correct column for MOS Value
        mos_value_col = None
        for col in df.columns:
            if primary_header in col or fallback_header in col:
                mos_value_col = col
                break
        
        if mos_value_col is None:
            print(f"Warning: Column for MOS Value not found in {file_path}")
            return None

        # Extract MOS values, convert to numeric, and drop NaNs
        mos_values = pd.to_numeric(df[mos_value_col], errors='coerce').dropna()

        if mos_values.empty:
            print(f"Warning: No valid MOS values found in column '{mos_value_col}' in {file_path}")
            return None

        # Calculate the required metrics
        metrics = {
            'MOS Average': mos_values.mean(),
            'MOS Stdev': mos_values.std(),
            'Maximum MOS': mos_values.max(),
            'Counts': len(mos_values),
            '% MOS < 3.0': (mos_values < 3.0).sum() / len(mos_values) * 100,
            '% MOS < 3.4': (mos_values < 3.4).sum() / len(mos_values) * 100
        }

        # New Statistics: Attenuation and Level
        new_stats_headers = {
            'UL MOS ATTN': "[Call Test] [Voice Quality] [UL MOS] Attenuation",
            'DL MOS ATTN': "[Call Test] [Voice Quality] [Per Rx Clip] Attenuation",
            'INPUT LEVEL': "[Call Test] [Voice Quality] [Loudness] [Volume] [Reference signal's Level] Reference signal's Level #1",
            'OUTPUT LEVEL': "[Call Test] [Voice Quality] [Loudness] [Volume] [Received signal's Level] Received signal's Level #1"
        }
        
        for key, header in new_stats_headers.items():
            if header in df.columns:
                vals = pd.to_numeric(df[header], errors='coerce').dropna()
                if not vals.empty:
                    metrics[key] = round(float(vals.mean()), 4)
                else:
                    metrics[key] = "N/A"
            else:
                metrics[key] = "N/A"

        # Call Drop and Initiation Failure counts
        call_result_header = '[Call Test] Call Result'
        if call_result_header in df.columns:
            call_results = df[call_result_header].dropna().astype(str)
            metrics['call_drop_count'] = int((call_results == 'Drop').sum())
        else:
            metrics['call_drop_count'] = 0
        
        # Handle cases where std might be NaN if there's only one value
        if pd.isna(metrics['MOS Stdev']):
            metrics['MOS Stdev'] = 0.0

        return metrics

    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return None

def analyze_vqe_vs_quality(paths):
    """
    Analyzes EVS WB voice quality data from specified paths, including Base and Mobile folders.
    """
    all_results = {}
    subfolders = ['Base', 'Mobile']
    
    for base_path in paths:
        scenario_name = os.path.basename(base_path)
        all_results[scenario_name] = {}
        
        for subfolder in subfolders:
            subfolder_path = os.path.join(base_path, subfolder)
            if not os.path.isdir(subfolder_path):
                print(f"Warning: Subfolder '{subfolder_path}' not found. Skipping.")
                continue

            all_results[scenario_name][subfolder] = {}
            # Dynamically find all CSV files in the subfolder
            found_csv_files = [f for f in os.listdir(subfolder_path) if f.endswith('.csv')]
            
            if not found_csv_files:
                print(f"Warning: No CSV files found in '{subfolder_path}'. Skipping.")
                continue

            for csv_file_name in found_csv_files:
                file_path = os.path.join(subfolder_path, csv_file_name)
                
                # Extract device identifier (DUT1, DUT2, REF1, etc.)
                match = re.search(r'(DUT[12]|REF[12]?)', csv_file_name, re.IGNORECASE)
                device = match.group(1).upper() if match else csv_file_name.replace('.csv', '')
                
                # Determine enable/disable status from scenario name
                status = "enable" if "Enabled" in scenario_name else "disable"
                
                # Formulate the standardized key for React (e.g., "vonr enable evs wb DUT1 mobile")
                react_key = f"vonr {status} evs wb {device} {subfolder.lower()}"
                
                print(f"Processing {file_path} as key '{react_key}'...")
                metrics = parse_mos_metrics(file_path)
                if metrics:
                    if react_key not in all_results[scenario_name][subfolder]:
                        all_results[scenario_name][subfolder][react_key] = metrics
                    else:
                        existing = all_results[scenario_name][subfolder][react_key]
                        merged = {}
                        total_counts = existing['Counts'] + metrics['Counts']
                        
                        if total_counts > 0:
                            merged['Counts'] = total_counts
                            merged['MOS Average'] = round((existing['MOS Average'] * existing['Counts'] + metrics['MOS Average'] * metrics['Counts']) / total_counts, 4)
                            merged['MOS Stdev'] = round((existing['MOS Stdev'] * existing['Counts'] + metrics['MOS Stdev'] * metrics['Counts']) / total_counts, 4)
                            merged['Maximum MOS'] = max(existing['Maximum MOS'], metrics['Maximum MOS'])
                            merged['% MOS < 3.0'] = round((existing['% MOS < 3.0'] * existing['Counts'] + metrics['% MOS < 3.0'] * metrics['Counts']) / total_counts, 4)
                            merged['% MOS < 3.4'] = round((existing['% MOS < 3.4'] * existing['Counts'] + metrics['% MOS < 3.4'] * metrics['Counts']) / total_counts, 4)
                        else:
                            merged = existing
                        
                        # Merge Attenuation and Levels
                        for extra in ['UL MOS ATTN', 'DL MOS ATTN', 'INPUT LEVEL', 'OUTPUT LEVEL']:
                            e_v = existing.get(extra, "N/A")
                            n_v = metrics.get(extra, "N/A")
                            if e_v != "N/A" and n_v != "N/A":
                                merged[extra] = round((e_v * existing['Counts'] + n_v * metrics['Counts']) / total_counts, 4) if total_counts > 0 else e_v
                            elif e_v != "N/A":
                                merged[extra] = e_v
                            else:
                                merged[extra] = n_v

                        # Merge call drop counts (simple sum)
                        merged['call_drop_count'] = existing.get('call_drop_count', 0) + metrics.get('call_drop_count', 0)
                        
                        all_results[scenario_name][subfolder][react_key] = merged

    
    return all_results

def print_results(all_results):
    """
    Prints the aggregated results in a readable format.
    """
    if not all_results:
        print("No data to display.")
        return

    for scenario_name, results in all_results.items():
        print(f"\n=== Scenario: {scenario_name} ===")
        if not results:
            print("No data found for this scenario.")
            continue

        for subfolder, data in results.items():
            print(f"\n--- {subfolder} ---")
            if not data:
                print("No data found for this subfolder.")
                continue
            
            # Prepare data for a pandas DataFrame for better display
            df_data = {}
            for device, metrics in data.items():
                for metric_name, value in metrics.items():
                    if metric_name not in df_data:
                        df_data[metric_name] = {}
                    df_data[metric_name][device] = value
            
            df = pd.DataFrame(df_data).T # Transpose to have metrics as index and devices as columns
            print(df.to_string())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze EVS WB voice quality from specified directories.")
    parser.add_argument("--paths", nargs='+', type=str, 
                        help="List of paths to the directories containing Base and Mobile folders. "
                             "Example: --paths 'D:\\Fit4Launch\\Raw Data\\Voice Quality\\5G Auto VoNR Disabled EVS WB VQ' "
                             "'D:\\Fit4Launch\\Raw Data\\Voice Quality\\5G Auto VoNR Enabled EVS WB VQ'")
    args = parser.parse_args()

    if args.paths:
        input_paths = args.paths
    else:
        # Default paths if not provided via command line
        input_paths = [
            r"D:\Fit4Launch\Raw Data\Voice Quality\5G Auto VoNR Disabled EVS WB VQ",
            r"D:\Fit4Launch\Raw Data\Voice Quality\5G Auto VoNR Enabled EVS WB VQ"
        ]

    valid_paths = []
    for path in input_paths:
        if not os.path.isdir(path):
            print(f"Error: The provided path '{path}' is not a valid directory. Skipping.")
        else:
            valid_paths.append(path)

    if not valid_paths:
        print("No valid paths provided or found for analysis. Exiting.")
    else:
        print(f"Starting analysis for paths: {', '.join(valid_paths)}")
        analysis_results = analyze_vqe_vs_quality(valid_paths)
        print_results(analysis_results)
