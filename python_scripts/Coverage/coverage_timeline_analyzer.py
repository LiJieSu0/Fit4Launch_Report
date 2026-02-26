import pandas as pd
import os
import re

def get_valid_coverage_range(file_path):
    """
    Determines the valid coverage range for a CSV file.
    Returns the end index (exclusive) of valid data.
    
    Logic:
    1. Find the first 'No Service' AFTER valid service has started
    2. Valid service starts when network contains 'nr sa' (5G) or 'lte' (LTE)
    3. Return the index of 'No Service' as the cut-off point
    """
    col_network = '[General] Serving Network'
    
    try:
        df = pd.read_csv(file_path, usecols=[col_network])
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None
    
    if col_network not in df.columns:
        return None
    
    is_lte_mode = "lte" in file_path.lower()
    
    service_started = False
    first_no_service_index = None
    
    for idx, row in df.iterrows():
        network_status = str(row[col_network]).lower()
        
        if not service_started:
            if is_lte_mode:
                if "lte" in network_status:
                    service_started = True
            else:
                if "nr sa" in network_status:
                    service_started = True
        
        if service_started and network_status == 'no service':
            first_no_service_index = idx
            break
    
    return first_no_service_index


def extract_timeline_data(file_path, column_names):
    """
    Extracts timeline data for a specific column within valid coverage range.
    
    Args:
        file_path: Path to the CSV file
        column_names: Header name (str) or list of header names to try in order
        
    Returns:
        List of numeric values (from top to bottom within valid range)
    """
    if isinstance(column_names, str):
        column_names = [column_names]
    
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return []
    
    selected_column = None
    for col in column_names:
        if col in df.columns:
            selected_column = col
            break
    
    if selected_column is None:
        return []
    
    end_index = get_valid_coverage_range(file_path)
    
    if end_index is None:
        end_index = len(df)
    
    df_valid = df.iloc[:end_index].copy()
    
    df_valid[selected_column] = pd.to_numeric(df_valid[selected_column], errors='coerce')
    
    values = df_valid[selected_column].dropna().tolist()
    
    return values


def analyze_rsrp_timeline(file_path):
    """
    Extracts RSRP timeline data.
    5G Header: [NR5G] [RF] RSRP
    LTE Header: [LTE] [L1] [RF] RSRP
    """
    is_lte_mode = "lte" in file_path.lower()
    
    if is_lte_mode:
        column_names = [
            '[LTE] [L1] [RF] RSRP',
            '[NR5G] [RF] RSRP'
        ]
    else:
        column_names = ['[NR5G] [RF] RSRP']
    
    return extract_timeline_data(file_path, column_names)


def analyze_sinr_timeline(file_path):
    """
    Extracts SINR timeline data.
    5G Header: [NR5G] [RF] SINR
    LTE Header: [LTE] [Cell Info] [Serving Cell List] [Top N] [Top1] SINR
    """
    is_lte_mode = "lte" in file_path.lower()
    
    if is_lte_mode:
        column_names = [
            '[LTE] [Cell Info] [Serving Cell List] [Top N] [Top1] SINR',
            '[NR5G] [RF] SINR'
        ]
    else:
        column_names = ['[NR5G] [RF] SINR']
    
    return extract_timeline_data(file_path, column_names)


def analyze_txpower_timeline(file_path):
    """
    Extracts Tx Power timeline data.
    5G Header: [NR5G] [Power] Tx power (PUSCH Actual)
    LTE Header: [LTE] [Power] [Tx Power] Tx Power (PUSCH Actual)
    """
    is_lte_mode = "lte" in file_path.lower()
    
    if is_lte_mode:
        column_names = [
            '[LTE] [Power] [Tx Power] Tx Power (PUSCH Actual)',
            '[NR5G] [Power] Tx power (PUSCH Actual)'
        ]
    else:
        column_names = ['[NR5G] [Power] Tx power (PUSCH Actual)']
    
    return extract_timeline_data(file_path, column_names)


def get_device_type(file_name):
    """
    Determines device type from filename.
    Returns 'DUT' or 'REF'
    """
    if re.search(r"DUT", file_name, re.IGNORECASE):
        return "DUT"
    elif re.search(r"REF", file_name, re.IGNORECASE):
        return "REF"
    else:
        ch_match = re.search(r"CH(\d+)", file_name, re.IGNORECASE)
        if ch_match:
            ch_num = int(ch_match.group(1))
            return "REF" if ch_num % 2 != 0 else "DUT"
    return "Unknown"


def extract_timestamp(file_name):
    """
    Extracts timestamp from filename.
    Format: _YYYYMMDD_HHMMSS_
    Returns: timestamp string (e.g., '20260211_130627')
    """
    match = re.search(r'_(\d{8}_\d{6})_', file_name)
    return match.group(1) if match else None


def extract_band_from_path(path):
    """
    Extracts band identifier from folder path or filename.
    Examples: N25, N41, B66
    """
    path_lower = path.lower()
    
    band_patterns = [
        r'[\\/](n\d+)',
        r'[\\/](b\d+)',
        r'[_\-](n\d+)[_\-]',
        r'[_\-](b\d+)[_\-]',
    ]
    
    for pattern in band_patterns:
        match = re.search(pattern, path_lower)
        if match:
            return match.group(1).upper()
    
    folder_name = os.path.basename(path)
    if folder_name:
        return folder_name
    
    return "Unknown"


def process_timeline_for_band(band_folder_path, timeline_type):
    """
    Processes all CSV files in a band folder and extracts timeline data.
    Groups files by timestamp to pair DUT and REF together.
    
    Args:
        band_folder_path: Path to the band folder (e.g., .../N25/)
        timeline_type: 'rsrp' | 'sinr' | 'txpower'
        
    Returns:
        Dictionary with run numbers as keys and {'DUT': [], 'REF': []} as values
    """
    if not os.path.isdir(band_folder_path):
        return {}
    
    csv_files = [f for f in os.listdir(band_folder_path) if f.lower().endswith('.csv')]
    
    def get_timeline_values(file_path):
        if timeline_type == 'rsrp':
            return analyze_rsrp_timeline(file_path)
        elif timeline_type == 'sinr':
            return analyze_sinr_timeline(file_path)
        elif timeline_type == 'txpower':
            return analyze_txpower_timeline(file_path)
        return []
    
    timestamp_files = {}
    
    for file_name in csv_files:
        timestamp = extract_timestamp(file_name)
        if not timestamp:
            continue
            
        device_type = get_device_type(file_name)
        
        if timestamp not in timestamp_files:
            timestamp_files[timestamp] = {'DUT': None, 'REF': None}
        
        timestamp_files[timestamp][device_type] = file_name
    
    sorted_timestamps = sorted(timestamp_files.keys())
    
    results = {}
    
    for run_idx, timestamp in enumerate(sorted_timestamps, start=1):
        run_key = f"Run{run_idx}"
        files = timestamp_files[timestamp]
        
        dut_values = []
        ref_values = []
        
        if files['DUT']:
            dut_file_path = os.path.join(band_folder_path, files['DUT'])
            dut_values = get_timeline_values(dut_file_path)
        
        if files['REF']:
            ref_file_path = os.path.join(band_folder_path, files['REF'])
            ref_values = get_timeline_values(ref_file_path)
        
        results[run_key] = {'DUT': dut_values, 'REF': ref_values}
    
    return results


def save_timeline_to_csv(results, output_file_path):
    """
    Saves timeline data to CSV file.
    
    Args:
        results: Dictionary with run data {'DUT': [...], 'REF': [...]}
        output_file_path: Path for output CSV file
    """
    if not results:
        return
    
    dut_values = results.get('DUT', [])
    ref_values = results.get('REF', [])
    
    max_len = max(len(dut_values), len(ref_values))
    
    with open(output_file_path, 'w', newline='') as f:
        f.write('DUT,REF\n')
        
        for i in range(max_len):
            dut_val = dut_values[i] if i < len(dut_values) else ''
            ref_val = ref_values[i] if i < len(ref_values) else ''
            
            if isinstance(dut_val, float):
                dut_val = round(dut_val, 2)
            if isinstance(ref_val, float):
                ref_val = round(ref_val, 2)
            
            f.write(f'{dut_val},{ref_val}\n')


def analyze_coverage_timeline(base_path, output_base_path, timeline_type):
    """
    Main function to analyze coverage timeline for a test folder.
    
    Args:
        base_path: Path to the coverage test folder (e.g., .../5G VoNR Coverage Test/)
        output_base_path: Base path for output files
        timeline_type: 'rsrp' | 'sinr' | 'txpower'
        
    Returns:
        Dictionary with analysis results
    """
    timeline_type_map = {
        'rsrp': 'RSRPTimeLine',
        'sinr': 'SINRTimeLine', 
        'txpower': 'TxPowerTimeLine'
    }
    
    output_folder = os.path.join(output_base_path, timeline_type_map[timeline_type])
    os.makedirs(output_folder, exist_ok=True)
    
    results = {}
    
    if not os.path.isdir(base_path):
        print(f"Warning: Base path does not exist: {base_path}")
        return results
    
    for band_folder_name in os.listdir(base_path):
        band_folder_path = os.path.join(base_path, band_folder_name)
        
        if not os.path.isdir(band_folder_path):
            continue
        
        band_name = extract_band_from_path(band_folder_path)
        
        band_results = process_timeline_for_band(band_folder_path, timeline_type)
        
        for run_key, run_data in band_results.items():
            output_file_name = f"{band_name}_{run_key}.csv"
            output_file_path = os.path.join(output_folder, output_file_name)
            
            save_timeline_to_csv(run_data, output_file_path)
            
            results[f"{band_name}_{run_key}"] = {
                'dut_count': len(run_data.get('DUT', [])),
                'ref_count': len(run_data.get('REF', []))
            }
    
    return results


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 3:
        print("Usage: python coverage_timeline_analyzer.py <input_folder> <output_folder> <rsrp|sinr|txpower>")
        sys.exit(1)
    
    input_folder = sys.argv[1]
    output_folder = sys.argv[2]
    timeline_type = sys.argv[3] if len(sys.argv) > 3 else 'rsrp'
    
    print(f"Analyzing {timeline_type} timeline for: {input_folder}")
    results = analyze_coverage_timeline(input_folder, output_folder, timeline_type)
    print(f"Results: {results}")
    print(f"Output saved to: {output_folder}")
