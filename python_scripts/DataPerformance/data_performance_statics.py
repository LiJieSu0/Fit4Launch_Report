
import pandas as pd
import sys
import argparse
import os
import re
import logging

# Add src to sys.path to enable imports from it
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src'))
try:
    from report_generator.utils.logger import setup_logger
    logger = logging.getLogger("data_performance")
except ImportError:
    # Fallback if the package structure is not yet fully in place during development
    logger = logging.getLogger("data_performance")
    if not logger.handlers:
        logging.basicConfig(level=logging.INFO)

def _clean_header(header):
    """
    Removes content within square brackets (tags) and strips leading/trailing whitespace from a header string.
    """
    # Remove content within square brackets, including the brackets themselves
    cleaned_header = re.sub(r'\[.*?\]', '', header)
    # Strip leading/trailing whitespace
    return cleaned_header.strip()

def _get_series_from_dataframe(data, column_name):
    """
    Helper function to safely extract a Series from a DataFrame given a column name.
    If multiple columns exist with the same name (after cleaning), it returns the one with the most valid data.
    Returns None if the column doesn't exist or is empty.
    """
    if column_name not in data.columns:
        return None

    col_data = data[column_name]

    if isinstance(col_data, pd.Series):
        if col_data.dropna().empty:
            return None
        return col_data
    elif isinstance(col_data, pd.DataFrame):
        # Handle duplicate columns
        best_series = None
        max_valid_count = -1
        
        # Iterate over the columns in the DataFrame (which are the duplicates)
        for i in range(col_data.shape[1]):
            series = col_data.iloc[:, i]
            valid_count = series.count() # count() excludes NA/null values
            
            if valid_count > max_valid_count:
                max_valid_count = valid_count
                best_series = series
        
        if best_series is not None and not best_series.dropna().empty:
            return best_series
        else:
            return None
    else:
        return None

def _determine_analysis_parameters(file_path):
    """
    Determines analysis parameters (direction, protocol, network, device, column names, event strings)
    from the filename.
    Returns a dictionary of parameters or None if essential parameters cannot be determined.
    """
    file_name = os.path.basename(file_path).lower()
    dir_name = os.path.basename(os.path.dirname(file_path)).lower() # Get parent directory name
    
    file_name = os.path.basename(file_path).lower()
    # Get the directory name of the file, then its parent directory name
    # This is to correctly identify the "drive" context which is usually one level up from the specific test type directory
    current_file_dir = os.path.dirname(file_path)
    parent_dir_of_file_dir = os.path.basename(os.path.dirname(current_file_dir)).lower()
    
    logger.debug(f"_determine_analysis_parameters - file_path: {file_path}")
    logger.debug(f"_determine_analysis_parameters - file_name (from basename): {file_name}")
    logger.debug(f"_determine_analysis_parameters - parent_dir_of_file_dir: {parent_dir_of_file_dir}")

    params = {
        "event_col": None,
        "event_col_fallback": None, # Added for fallback event column
        "start_event": None,
        "end_event": None,
        "analysis_direction_detected": None,
        "protocol_type_detected": None,
        "network_type_detected": None,
        "device_type_detected": "Unknown",
        "analysis_type_detected": "Unknown", # Added for analysis type
        "column_to_analyze_throughput": None,
        "column_to_analyze_throughput_fallback": None, # Added for fallback throughput column
        "column_to_analyze_throughput_third_fallback": None, # Added for third fallback throughput column
        "column_to_analyze_jitter": None,
        "column_to_analyze_error_ratio": None,
        "column_to_analyze_ul_jitter": None,
        "column_to_analyze_ul_error_ratio": None,
        "column_to_analyze_ping_rtt": None, # Added for Ping RTT
        "is_drive_path": False, # Added to indicate if path contains "drive"
    }

    # Determine if it's a "drive" path based on the full file path
    if "drive" in file_path.lower():
        params["is_drive_path"] = True

    # Determine analysis direction from filename
    if "download" in file_name:
        params["analysis_direction_detected"] = "DL"
    elif "upload" in file_name:
        params["analysis_direction_detected"] = "UL"
    elif "dl" in file_name: # Fallback for "dl" if "download" not found
        params["analysis_direction_detected"] = "DL"
    elif "ul" in file_name: # Fallback for "ul" if "upload" not found
        params["analysis_direction_detected"] = "UL"
    
    # Fallback: Check parent directories if direction not detected in filename
    if not params["analysis_direction_detected"]:
        if "dl" in parent_dir_of_file_dir or "download" in parent_dir_of_file_dir:
            params["analysis_direction_detected"] = "DL"
        elif "ul" in parent_dir_of_file_dir or "upload" in parent_dir_of_file_dir:
             params["analysis_direction_detected"] = "UL"
        elif "dl" in dir_name or "download" in dir_name:
             params["analysis_direction_detected"] = "DL"
        elif "ul" in dir_name or "upload" in dir_name:
             params["analysis_direction_detected"] = "UL"
    
    # Determine protocol type from filename
    # First, prepare the lowercase file path for path-based checks
    file_path_lower = file_path.lower()
    
    if "web page" in file_name:
        params["protocol_type_detected"] = "WEB_PAGE"
    elif "http" in file_name:
        params["protocol_type_detected"] = "HTTP"
    elif "udp" in file_name:
        params["protocol_type_detected"] = "UDP"
    elif "ping" in file_name: # Detect PING protocol
        params["protocol_type_detected"] = "PING"
    
    # Check file path for Web-Kepler (path-based detection)
    if "web-kepler" in file_path_lower or "kepler" in file_path_lower:
        params["protocol_type_detected"] = "WEB_PAGE"
    
    # Determine network type (5G/LTE) from the full file path
    if "5g nsa" in file_path_lower:
        params["network_type_detected"] = "5G NSA"
    elif "5g sa" in file_path_lower:
        params["network_type_detected"] = "5G SA"
    elif "5g" in file_path_lower:
        params["network_type_detected"] = "5G" # Generic 5G if SA/NSA not specified
    elif "lte" in file_path_lower:
        params["network_type_detected"] = "LTE"

    # Determine analysis type based on directory name
    if "5g vonr mrab stationary" in file_path_lower:
        params["analysis_type_detected"] = "mrab_performance"
    elif "5g auto data test mhs drive" in file_path_lower:
        params["analysis_type_detected"] = "mhs_drive_performance"
        params["protocol_type_detected"] = "UDP" # MHS Drive is UDP
    elif "play-store app" in file_path_lower: # Specific condition for Play-store app analysis
        params["analysis_type_detected"] = "google_throughput_analysis"
        params["protocol_type_detected"] = "HTTP" # Play-store app is typically HTTP
        params["analysis_direction_detected"] = "DL" # Explicitly set to DL for Play-store app DL Stationary
    elif "5g auto dp" in file_path_lower or "5g nsa dp" in file_path_lower:
        params["analysis_type_detected"] = "data_performance"
    elif "5g n41 hpue coverage test" in file_path_lower:
        params["analysis_type_detected"] = "n41_coverage"
    elif "coverage" in file_path_lower: # Generic condition for other coverage analysis
        params["analysis_type_detected"] = "coverage_coordinate"

    logger.debug(f"_determine_analysis_parameters - 'dut' in file_name: {'dut' in file_name}")
    logger.debug(f"_determine_analysis_parameters - 'ref' in file_name: {'ref' in file_name}")

    device_type_match = re.search(r'(DUT|REF|PC\d+)', file_name, re.IGNORECASE) # Modified regex to match DUT/REF without digits
    if device_type_match:
        params["device_type_detected"] = device_type_match.group(0).upper() # Convert to uppercase for consistency
    else:
        params["device_type_detected"] = "Unknown" # Default to Unknown if no match

    logger.debug(f"_determine_analysis_parameters - device_type_detected (after logic): {params['device_type_detected']}")
    logger.debug(f"_determine_analysis_parameters - is_drive_path: {params['is_drive_path']}")

    # If essential parameters are not detected, return None
    # For WEB_PAGE, analysis_direction_detected is not strictly necessary as it's a single metric
    # For PING, analysis_direction_detected is not strictly necessary as it's a single metric (RTT)
    # For MRAB and MHS Drive, protocol_type_detected and analysis_direction_detected are not strictly necessary as it's a specific analysis
    if params["analysis_type_detected"] == "mrab_performance" or params["analysis_type_detected"] == "mhs_drive_performance":
        # Only need network type and device type for MRAB and MHS Drive
        if not params["network_type_detected"] or not params["device_type_detected"]:
            return None
    elif params["protocol_type_detected"] not in ["WEB_PAGE", "PING"] and (not params["analysis_direction_detected"] or not params["protocol_type_detected"] or not params["network_type_detected"]):
        return None
    elif params["protocol_type_detected"] == "WEB_PAGE" and (not params["protocol_type_detected"] or not params["network_type_detected"]):
        return None
    elif params["protocol_type_detected"] == "PING" and (not params["protocol_type_detected"] or not params["network_type_detected"]):
        return None
    elif params["analysis_type_detected"] == "coverage_coordinate":
        # For coverage, only need device type
        if not params["device_type_detected"]:
            return None


    if params["protocol_type_detected"] == "HTTP":
        params["event_col"] = _clean_header("[Call Test] [HTTP Transfer] HTTP Transfer Call Event")
        if params["analysis_direction_detected"] == "DL":
            params["start_event"] = "Download Started"
            params["end_event"] = "Download Ended"
            if params["network_type_detected"] in ["5G", "5G NSA", "5G SA"]:
                params["column_to_analyze_throughput"] = _clean_header("[Call Test] [Throughput] Application DL TP")
                params["column_to_analyze_throughput_fallback"] = _clean_header("[NR5G] [(NR + LTE)] [Throughput] PDSCH TP") # Fallback for 5G DL HTTP
                params["column_to_analyze_throughput_third_fallback"] = _clean_header("DL TP (excl. slow start)") # Third fallback for 5G DL HTTP
            else: # LTE
                params["column_to_analyze_throughput"] = _clean_header("[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)")
                params["column_to_analyze_throughput_third_fallback"] = _clean_header("DL TP (excl. slow start)") # Third fallback for LTE DL HTTP
        elif params["analysis_direction_detected"] == "UL":
            params["start_event"] = "Upload Started"
            params["end_event"] = "Upload Ended"
            if params["network_type_detected"] in ["5G", "5G NSA", "5G SA"]:
                params["column_to_analyze_throughput"] = _clean_header("[Call Test] [Throughput] Application UL TP")
                params["column_to_analyze_throughput_fallback"] = _clean_header("[NR5G] [(NR + LTE)] [Throughput] PUSCH TP") # Fallback for 5G UL HTTP
                params["column_to_analyze_throughput_third_fallback"] = _clean_header("UL Avg TP") # Third fallback for 5G UL HTTP
            else: # LTE
                params["column_to_analyze_throughput"] = _clean_header("[LTE] [Data Throughput] [Uplink (All)] [PUSCH] PUSCH TP (Total)")
                params["column_to_analyze_throughput_third_fallback"] = _clean_header("UL Avg TP") # Third fallback for LTE UL HTTP
    elif params["protocol_type_detected"] == "UDP":
        params["event_col"] = _clean_header("[Event][Data call test detail events]IPERF Call Event") # Primary event column
        params["event_col_fallback"] = _clean_header("[Event] [Data call test detail events] IPERF Call Event") # Fallback event column
        params["start_event"] = "IPERF_T_Start"
        params["end_event"] = "IPERF_T_End"

        if params["analysis_direction_detected"] == "DL":
            params["column_to_analyze_throughput"] = _clean_header("[Call Test] [Throughput] Application DL TP") if params["network_type_detected"] in ["5G", "5G NSA", "5G SA"] else _clean_header("[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)")
            params["column_to_analyze_throughput_fallback"] = _clean_header("[NR5G] [(NR + LTE)] [Throughput] PDSCH TP") # Added fallback for 5G DL UDP
            params["column_to_analyze_throughput_third_fallback"] = _clean_header("DL TP (excl. slow start)") # Third fallback for DL UDP
            params["column_to_analyze_jitter"] = _clean_header("[Call Test] [iPerf] [Throughput] DL Jitter")
            params["column_to_analyze_error_ratio"] = _clean_header("[Call Test] [iPerf] [Throughput] DL Error Ratio")
        elif params["analysis_direction_detected"] == "UL":
            params["column_to_analyze_throughput"] = _clean_header("[Call Test] [Throughput] Application UL TP") # Primary UL Throughput
            params["column_to_analyze_throughput_fallback"] = _clean_header("[NR5G] [Throughput] PUSCH TP") # Fallback UL Throughput
            params["column_to_analyze_throughput_third_fallback"] = _clean_header("UL Avg TP") # Third fallback for UL Throughput
            params["column_to_analyze_ul_jitter"] = _clean_header("[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter")
            params["column_to_analyze_ul_error_ratio"] = _clean_header("[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio")
    elif params["protocol_type_detected"] == "WEB_PAGE":
        params["event_col"] = _clean_header("[Event] [Data call test detail events] HTTP Call Event")
        params["start_event"] = "HTTP Traffic Start"
        params["end_event"] = "HTTP Traffic End"
        params["column_to_analyze_total_duration"] = _clean_header("[Call Test] [HTTP] Total duration")
    elif params["protocol_type_detected"] == "PING":
        params["event_col"] = _clean_header("[Event] [Data call test detail events] Ping Call Event")
        params["start_event"] = "PING Traffic Start"
        params["end_event"] = "PING Traffic End"
        params["column_to_analyze_ping_rtt"] = _clean_header("[Call Test] [PING] [RTT] RTT")
    logger.debug(f"_determine_analysis_parameters returning: {params}")
    return params

def _find_related_ping_file(current_file_path, device_type):
    """
    Attempts to find a related PING CSV file by searching within the 'Raw Data' directory.
    """
    # Assuming 'Raw Data' is at the root of the current working directory
    raw_data_root = "Raw Data" 
    
    if not os.path.isdir(raw_data_root):
        print(f"Error: '{raw_data_root}' directory not found at the project root.")
        return None

    device_type_lower = device_type.lower()

    for root, _, files in os.walk(raw_data_root):
        for f in files:
            file_lower = f.lower()
            # Check if it's a CSV, contains "ping" in the filename, and matches the device type
            if file_lower.endswith(".csv") and "ping" in file_lower and device_type_lower in file_lower:
                return os.path.join(root, f)
    return None

def _calculate_statistics(data_series, column_name):
    """
    Calculates statistical data for a given pandas Series.
    Returns a dictionary of statistics.
    """
    if data_series.empty:
        # print(f"\nNo valid data found to calculate statistics for '{column_name}'.")
        return {} # Return empty dict instead of None
    
    mean_val = data_series.mean()
    std_dev_val = data_series.std()
    min_val = data_series.min()
    max_val = data_series.max()
    
    stats = {
        "Mean": mean_val,
        "Standard Deviation": std_dev_val,
        "Minimum": min_val,
        "Maximum": max_val
    }
    
    return stats

def analyze_throughput(file_path, column_name_to_analyze, event_col_name, start_event_str, end_event_str, fallback_column_name=None, fallback_event_col_name=None, third_fallback_column_name=None):
    """
    Reads a data CSV file, identifies intervals based on start/end event markers,
    calculates average throughput for each, and then performs full statistics on these averages.
    Returns a dictionary of statistics or None.
    """
    try:
        data = pd.read_csv(file_path)
        # Apply the cleaning function to all column names in the DataFrame
        data.columns = [_clean_header(col) for col in data.columns]
        
        current_column_to_use = None
        data_series_to_use = None
        
        # Check primary column
        data_series_to_use = _get_series_from_dataframe(data, column_name_to_analyze)
        if data_series_to_use is not None:
            current_column_to_use = column_name_to_analyze
        else:
            # Primary column is not good, try fallbacks
            data_series_to_use = _get_series_from_dataframe(data, fallback_column_name)
            if data_series_to_use is not None:
                logger.warning(f"Primary throughput column '{column_name_to_analyze}' is empty or not found. Using fallback column '{fallback_column_name}'.")
                current_column_to_use = fallback_column_name
            else:
                data_series_to_use = _get_series_from_dataframe(data, third_fallback_column_name)
                if data_series_to_use is not None:
                    logger.warning(f"Primary throughput column '{column_name_to_analyze}' and first fallback '{fallback_column_name}' are empty or not found. Using third fallback column '{third_fallback_column_name}'.")
                    current_column_to_use = third_fallback_column_name
                else:
                    logger.error(f"Primary throughput column '{column_name_to_analyze}' is empty or not found, and fallback column '{fallback_column_name}' is also empty or not found, and third fallback '{third_fallback_column_name}' is also empty or not found.")
                    logger.debug(f"Available columns: {data.columns.tolist()}")
                    return {} # Return empty dict instead of None
        
        # NOTE: At this point data_series_to_use holds the valid data series, 
        # but the logic below relies on accessing data[current_column_to_use].
        # Because we've already resolved duplicates in _get_series_from_dataframe, data[current_column_to_use] might return the DataFrame again.
        # So we should use data_series_to_use for calculations, OR fix the DataFrame to only have the valid series.
        # To avoid large refactoring, we'll overwrite the column in 'data' with the valid series if it exists.
        
        if current_column_to_use and data_series_to_use is not None:
            # If the column name exists multiple times, drop them and add the single valid series
            if isinstance(data[current_column_to_use], pd.DataFrame):
                 # Drop all columns with this name
                data = data.drop(columns=[current_column_to_use])
                # Add the valid series back
                data[current_column_to_use] = data_series_to_use
            # If it's already a series but we picked it via fallback, it's fine. 
            # If it was a duplicate and we picked the best one, we just replaced the duplicates with the single best series.

        # Check if primary event column exists, otherwise try fallback
        current_event_col_to_use = event_col_name
        if current_event_col_to_use not in data.columns:
            if fallback_event_col_name:
                if fallback_event_col_name in data.columns:
                    print(f"Warning: Primary event column '{current_event_col_to_use}' not found. Using fallback event column '{fallback_event_col_name}'.")
                    current_event_col_to_use = fallback_event_col_name
                else:
                    print(f"\nError: Primary event column '{current_event_col_to_use}' not found, and fallback event column '{fallback_event_col_name}' is also not found.")
                    print(f"Available columns: {data.columns.tolist()}")
                    return {} # Return empty dict instead of None
            else:
                print(f"\nError: Event column '{current_event_col_to_use}' not found in the CSV file, and no fallback event column was provided.")
                print(f"Available columns: {data.columns.tolist()}")
                return {} # Return empty dict instead of None
        
        filtered_data = data.copy()

        started_indices = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(start_event_str, na=False)].index
        ended_indices = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(end_event_str, na=False)].index

        if started_indices.empty:
            print(f"\nWarning: Could not find '{start_event_str}' events in '{current_event_col_to_use}'. Cannot calculate interval averages.")
            print(f"Proceeding with overall statistics calculation for {current_column_to_use} using available data.")
            overall_data = filtered_data[current_column_to_use].dropna()
            
            # If overall_data has more than 20 entries, take only the last 20 as per old script's fallback behavior
            if len(overall_data) > 20:
                overall_data = overall_data.tail(20)
                print(f"Warning: Overall data exceeded 20 rows. Using last 20 rows for calculation.")
            
            stats_result = _calculate_statistics(overall_data, current_column_to_use)
            if stats_result:
                stats_result["Number of Intervals"] = len(overall_data)
                stats_result["Note"] = "Calculated statistics on last 20 available rows due to missing start events."
            return stats_result if stats_result is not None else {}
        
        interval_averages = []
        
        # New logic: Each interval starts at a start index and ends just before the next start index (or end of data)
        for idx in range(len(started_indices)):
            start_idx = started_indices[idx]
            if idx + 1 < len(started_indices):
                end_idx = started_indices[idx + 1] - 1
            else:
                end_idx = len(filtered_data) - 1
            
            interval_data = filtered_data.loc[start_idx : end_idx, current_column_to_use].dropna()
            
            if not interval_data.empty:
                interval_avg = interval_data.mean()
                interval_averages.append(interval_avg)

        if not interval_averages:
            # Fallback logic if intervals define no valid data
            overall_data_for_sum = filtered_data[current_column_to_use].dropna()
            
            if len(overall_data_for_sum) > 20:
                overall_data_for_sum = overall_data_for_sum.tail(20)
                print(f"Warning: Overall data for sum exceeded 20 rows. Using last 20 rows for calculation.")

            num_intervals_detected = len(started_indices)

            if not overall_data_for_sum.empty and num_intervals_detected > 0:
                stats = _calculate_statistics(overall_data_for_sum, current_column_to_use)
                if stats:
                    # Specific legacy calculation: sum of last 20 rows / number of rows
                    # This aligns with the OldScripts behavior
                    total_sum = overall_data_for_sum.sum()
                    calculated_mean = total_sum / len(overall_data_for_sum) if len(overall_data_for_sum) > 0 else 0
                    stats["Mean"] = calculated_mean
                    stats["Number of Intervals"] = len(overall_data_for_sum)
                    stats["Note"] = "Calculated overall sum divided by number of detected points due to no valid interval data segments. Limited to last 20 rows."
                    return stats
                else:
                    return {}
            else:
                return {}

        # If interval_averages has more than 20 entries, take only the last 20
        if len(interval_averages) > 20:
            interval_averages = interval_averages[-20:]
            print(f"Warning: Throughput interval groups exceeded 20. Using last 20 groups for statistics.")

        averages_series = pd.Series(interval_averages)
        
        # Get statistics and add interval count
        stats = _calculate_statistics(averages_series, current_column_to_use)
        if stats:
            stats["Number of Intervals"] = len(interval_averages)
        return stats

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return {} # Return empty dict instead of None
    except Exception as e:
        print(f"An error occurred during throughput analysis: {e}")
        return {} # Return empty dict instead of None

def analyze_throughput_cdf(file_path, column_name_to_analyze, event_col_name, start_event_str, end_event_str, fallback_column_name=None, fallback_event_col_name=None, third_fallback_column_name=None):
    """
    Reads a data CSV file, identifies intervals, and calculates CDF for throughput points.
    Uses dynamic binning (20 bins) between min and max.
    Only reads necessary columns to reduce memory load.
    """
    try:
        # Read headers first to identify correct columns for usecols
        header_df = pd.read_csv(file_path, nrows=0)
        cleaned_headers = [_clean_header(col) for col in header_df.columns]
        
        actual_tp_col = None
        # Priority for throughput column
        for cand in [column_name_to_analyze, fallback_column_name, third_fallback_column_name]:
            if cand and cand in cleaned_headers:
                # Find the original column name (might have multiple, pick first for simplicity or handle duplicates?)
                # _get_series_from_dataframe is better but it needs the whole df. 
                # To minimize memory, we'll try to pick the first occurrence in original headers.
                actual_tp_col = header_df.columns[cleaned_headers.index(cand)]
                break
        
        actual_ev_col = None
        for cand in [event_col_name, fallback_event_col_name]:
            if cand and cand in cleaned_headers:
                actual_ev_col = header_df.columns[cleaned_headers.index(cand)]
                break
        
        if not actual_tp_col or not actual_ev_col:
            return {}

        # Efficiently read only needed columns
        data = pd.read_csv(file_path, usecols=[actual_tp_col, actual_ev_col])
        data.columns = [_clean_header(col) for col in data.columns]
        
        # Cleaned names for access
        tp_col_clean = _clean_header(actual_tp_col)
        ev_col_clean = _clean_header(actual_ev_col)

        started_indices = data[data[ev_col_clean].astype(str).str.contains(start_event_str, na=False)].index
        
        tp_points = []
        if started_indices.empty:
            tp_points = data[tp_col_clean].dropna().tail(100).tolist() # Limit fallback to last 100 points
        else:
            # Collect points from intervals
            for idx in range(len(started_indices)):
                start_idx = started_indices[idx]
                if idx + 1 < len(started_indices):
                    end_idx = started_indices[idx + 1] - 1
                else:
                    end_idx = len(data) - 1
                
                interval_tp = data.loc[start_idx : end_idx, tp_col_clean].dropna()
                tp_points.extend(interval_tp.tolist())

        if not tp_points:
            return {}
            
        tp_series = pd.Series(tp_points)
        min_val = float(tp_series.min())
        max_val = float(tp_series.max())
        total_count = len(tp_series)
        
        if max_val == min_val:
            return {
                "min": min_val,
                "max": max_val,
                "bin_count": 1,
                "cdf": [{"bin_end": max_val, "cumulative_percent": 100.0}]
            }

        num_bins = 20
        bin_width = (max_val - min_val) / num_bins
        
        cdf_list = []
        for i in range(1, num_bins + 1):
            bin_end = min_val + i * bin_width
            count = (tp_series <= bin_end).sum()
            cdf_list.append({
                "bin_end": round(bin_end, 2),
                "cumulative_percent": round((count / total_count) * 100, 2)
            })
            
        return {
            "min": round(min_val, 2),
            "max": round(max_val, 2),
            "bin_width": round(bin_width, 2),
            "total_points": total_count,
            "cdf": cdf_list
        }

    except Exception as e:
        if logger:
            logger.error(f"Error in analyze_throughput_cdf: {e}")
        return {}

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return {} # Return empty dict instead of None
    except Exception as e:
        print(f"An error occurred: {e}")
        return {} # Return empty dict instead of None

def analyze_jitter(file_path, column_name_to_analyze, event_col_name, start_event_str, end_event_str, fallback_event_col_name=None):
    """
    Reads a data CSV file and reports the mean of the entire jitter column.
    Returns a dictionary of statistics or None.
    """
    try:
        data = pd.read_csv(file_path)
        # Apply the cleaning function to all column names in the DataFrame
        data.columns = [_clean_header(col) for col in data.columns]
        # print(f"Successfully loaded {file_path}")

        # The column names to analyze are already cleaned by _determine_analysis_parameters
        # No need to strip or clean them again here.

        # Check if primary event column exists, otherwise try fallback
        current_event_col_to_use = event_col_name
        if current_event_col_to_use not in data.columns:
            if fallback_event_col_name:
                if fallback_event_col_name in data.columns:
                    print(f"Warning: Primary event column '{current_event_col_to_use}' not found. Using fallback event column '{fallback_event_col_name}'.")
                    current_event_col_to_use = fallback_event_col_name
                else:
                    print(f"\nError: Primary event column '{current_event_col_to_use}' not found, and fallback event column '{fallback_event_col_name}' is also not found.")
                    print(f"Available columns: {data.columns.tolist()}")
                    return {} # Return empty dict instead of None
            else:
                print(f"\nError: Event column '{current_event_col_to_use}' not found in the CSV file, and no fallback event column was provided.")
                print(f"Available columns: {data.columns.tolist()}")
                return {} # Return empty dict instead of None

        if column_name_to_analyze not in data.columns:
            print(f"\nError: Column '{column_name_to_analyze}' not found in the CSV file.")
            return {} # Return empty dict instead of None
        
        # Calculate mean of the entire column
        # Handle duplicates if present
        data_series = _get_series_from_dataframe(data, column_name_to_analyze)
        if data_series is None:
             print(f"\nError: Column '{column_name_to_analyze}' not found or empty.")
             return {}

        overall_jitter_data = data_series.dropna()

        if not overall_jitter_data.empty:
            mean_val = overall_jitter_data.mean()
            return {"Mean": mean_val}
        else:
            # print(f"\nNo valid data found to calculate mean for '{column_name_to_analyze_stripped}'.")
            return {} # Return empty dict instead of None

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return {} # Return empty dict instead of None
    except Exception as e:
        print(f"An error occurred: {e}")
        return {} # Return empty dict instead of None

def analyze_error_ratio(file_path, column_name_to_analyze, event_col_name, start_event_str, end_event_str, fallback_event_col_name=None):
    """
    Reads a data CSV file and reports the mean of the entire error ratio column.
    Returns a dictionary of statistics or None.
    """
    try:
        data = pd.read_csv(file_path)
        # Apply the cleaning function to all column names in the DataFrame
        data.columns = [_clean_header(col) for col in data.columns]
        # print(f"Successfully loaded {file_path}")

        # The column names to analyze are already cleaned by _determine_analysis_parameters
        # No need to strip or clean them again here.

        # Check if primary event column exists, otherwise try fallback
        current_event_col_to_use = event_col_name
        if current_event_col_to_use not in data.columns:
            if fallback_event_col_name:
                if fallback_event_col_name in data.columns:
                    print(f"Warning: Primary event column '{current_event_col_to_use}' not found. Using fallback event column '{fallback_event_col_name}'.")
                    current_event_col_to_use = fallback_event_col_name
                else:
                    print(f"\nError: Primary event column '{current_event_col_to_use}' not found, and fallback event column '{fallback_event_col_name}' is also not found.")
                    print(f"Available columns: {data.columns.tolist()}")
                    return {} # Return empty dict instead of None
            else:
                print(f"\nError: Event column '{current_event_col_to_use}' not found in the CSV file, and no fallback event column was provided.")
                print(f"Available columns: {data.columns.tolist()}")
                return {} # Return empty dict instead of None

        if column_name_to_analyze not in data.columns:
            print(f"\nError: Column '{column_name_to_analyze}' not found in the CSV file.")
            return {} # Return empty dict instead of None
        
        # Calculate mean of the entire column
        # Handle duplicates if present
        data_series = _get_series_from_dataframe(data, column_name_to_analyze)
        if data_series is None:
             print(f"\nError: Column '{column_name_to_analyze}' not found or empty.")
             return {}

        overall_error_ratio_data = data_series.dropna()

        if not overall_error_ratio_data.empty:
            mean_val = overall_error_ratio_data.mean()
            return {"Mean": mean_val}
        else:
            # print(f"\nNo valid data found to calculate statistics for '{column_name_to_analyze_stripped}'.")
            return {} # Return empty dict instead of None

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return {} # Return empty dict instead of None
    except Exception as e:
        print(f"An error occurred: {e}")
        return {} # Return empty dict instead of None

def analyze_web_page_load_time(file_path, event_col_name, start_event_str, end_event_str, duration_col_name, fallback_event_col_name=None):
    """
    Reads a data CSV file, identifies web page load time intervals based on start/end event markers,
    extracts total duration for each, and calculates statistics (count, average, max, min, std dev).
    Returns a dictionary of statistics or None.
    """
    try:
        data = pd.read_csv(file_path)
        # Apply the cleaning function to all column names in the DataFrame
        data.columns = [_clean_header(col) for col in data.columns]

        # The column names to analyze are already cleaned by _determine_analysis_parameters
        # No need to strip or clean them again here.
        
        # Check if primary event column exists, otherwise try fallback
        current_event_col_to_use = event_col_name
        if current_event_col_to_use not in data.columns:
            if fallback_event_col_name:
                if fallback_event_col_name in data.columns:
                    print(f"Warning: Primary event column '{current_event_col_to_use}' not found. Using fallback event column '{fallback_event_col_name}'.")
                    current_event_col_to_use = fallback_event_col_name
                else:
                    print(f"\nError: Primary event column '{current_event_col_to_use}' not found, and fallback event column '{fallback_event_col_name}' is also not found.")
                    print(f"Available columns: {data.columns.tolist()}")
                    return {} # Return empty dict instead of None
            else:
                print(f"\nError: Event column '{current_event_col_to_use}' not found in the CSV file, and no fallback event column was provided.")
                print(f"Available columns: {data.columns.tolist()}")
                return {} # Return empty dict instead of None

        if duration_col_name not in data.columns:
            print(f"\nError: Duration column '{duration_col_name}' not found in the CSV file.")
            print(f"Available columns: {data.columns.tolist()}")
            return {} # Return empty dict instead of None
        
        filtered_data = data.copy()

        started_indices = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(start_event_str, na=False)].index
        ended_indices = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(end_event_str, na=False)].index

        if started_indices.empty or ended_indices.empty:
            print(f"\nWarning: Could not find both '{start_event_str}' and '{end_event_str}' events in '{current_event_col_to_use}'. Cannot calculate web page load time intervals.")
            return {} # Return empty dict instead of None
        
        total_durations = []
        current_start_idx = -1
        
        # Find all start and end event indices
        start_events = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(start_event_str, na=False)].index
        end_events = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains(end_event_str, na=False)].index
        timeout_idle_events = filtered_data[filtered_data[current_event_col_to_use].astype(str).str.contains("TIMEOUT_Idle", na=False)].index

        # Match start, end, and then find the duration after TIMEOUT_Idle
        for start_idx in start_events:
            # Find the first end event after this start event
            relevant_end_events = end_events[end_events > start_idx]
            if not relevant_end_events.empty:
                end_idx = relevant_end_events[0]

                # Find the first TIMEOUT_Idle event after this end event
                relevant_timeout_idle = timeout_idle_events[timeout_idle_events > end_idx]
                if not relevant_timeout_idle.empty:
                    timeout_idx = relevant_timeout_idle[0]
                    
                    # The duration value is on the row immediately after TIMEOUT_Idle
                    # Check if timeout_idx + 1 is a valid index
                    if timeout_idx + 1 < len(filtered_data):
                        duration_row_idx = timeout_idx + 1
                        duration_val = filtered_data.loc[duration_row_idx, duration_col_name]
                        
                        if pd.notna(duration_val): # Check if the value is not NaN
                            total_durations.append(duration_val)
        
        if not total_durations:
            print(f"\nNo valid '{start_event_str}' to '{end_event_str}' intervals with '{duration_col_name}' data found after 'TIMEOUT_Idle' events.")
            return {} # Return empty dict instead of None

        durations_series = pd.Series(total_durations)
        
        stats = _calculate_statistics(durations_series, duration_col_name)
        if stats:
            stats["Number of Intervals"] = len(total_durations)
        return stats

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return {} # Return empty dict instead of None
    except Exception as e:
        print(f"An error occurred: {e}")
        return {} # Return empty dict instead of None

def evaluate_performance(dut_value, ref_value, metric_type):
    """
    Evaluates performance based on DUT and REF values for a given metric type.
    Returns one of "Excellent", "Pass", "Marginal Fail", "Fail".
    """
    if ref_value == 0:
        return "Cannot evaluate: Reference value is zero."

    if metric_type == "throughput":
        if dut_value > 1.1 * ref_value:
            return "Excellent"
        elif 0.9 * ref_value <= dut_value <= 1.1 * ref_value:
            return "Pass"
        elif 0.8 * ref_value <= dut_value < 0.9 * ref_value:
            return "Marginal Fail"
        elif dut_value < 0.8 * ref_value:
            return "Fail"
    elif metric_type == "jitter":
        # Jitter criteria (lower is better)
        if dut_value < 0.9 * ref_value:
            return "Excellent"
        elif (0.9 * ref_value <= dut_value <= 1.1 * ref_value) or (dut_value < 10):
            return "Pass"
        elif 1.1 * ref_value < dut_value <= 1.20 * ref_value: # Corrected condition based on clarification
            return "Marginal Fail"
        elif dut_value > 1.20 * ref_value:
            return "Fail"
    elif metric_type == "ping_rtt":
        # Ping RTT criteria (lower is better)
        if dut_value < 0.9 * ref_value:
            return "Excellent"
        elif 0.9 * ref_value <= dut_value <= 1.1 * ref_value:
            return "Pass"
        elif 1.1 * ref_value < dut_value <= 1.20 * ref_value:
            return "Marginal Fail"
        elif dut_value > 1.20 * ref_value:
            return "Fail"
    elif metric_type == "error_ratio":
        # Error Ratio criteria (lower is better)
        # Assuming dut_value is %Packet Loss AVG DUT and ref_value is % Packet Loss AVG REF
        if dut_value < ref_value:
            return "Excellent"
        elif dut_value <= 5.0 or (dut_value - ref_value) <= 10.0:
            return "Pass"
        elif 10.0 < (dut_value - ref_value) <= 20.0:
            return "Marginal Fail"
        elif (dut_value - ref_value) > 20.0:
            return "Fail"
    
    return "Unknown" # Should not happen with the above conditions

import ping_statics # Import ping_statics here to avoid circular dependencies if ping_statics also imports data_performance_statics

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze data performance statistics from a CSV file.")
    parser.add_argument("file_path", help="Path to the CSV file.")
    args = parser.parse_args()
    file_path = args.file_path

    # Determine analysis direction from filename
    # Extract only the filename from the full path
    file_name = os.path.basename(file_path).lower()
    event_col = None
    start_event = None
    end_event = None
    analysis_direction_detected = None

    params = _determine_analysis_parameters(file_path)

    if params is None:
        print(f"Error: Could not determine analysis parameters for {file_path}. Exiting.")
        sys.exit(1)

    print(f"\nDetected protocol type: {params['protocol_type_detected']}, and network type: {params['network_type_detected']}.")
    if params["analysis_direction_detected"]:
        print(f"Detected analysis direction: {params['analysis_direction_detected']}.")

    if params["protocol_type_detected"] == "HTTP":
        if params["analysis_direction_detected"] == "DL":
            print(f"\n--- Performing Throughput Analysis for {params['analysis_direction_detected']} HTTP ---")
            stats = analyze_throughput(file_path, params["column_to_analyze_throughput"], params["event_col"], params["start_event"], params["end_event"], fallback_column_name=params["column_to_analyze_throughput_fallback"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Throughput Stats: {stats}")
            if stats and "Number of Intervals" in stats:
                print(f"Number of Intervals: {stats['Number of Intervals']}")
        elif params["analysis_direction_detected"] == "UL":
            print(f"\n--- Performing Throughput Analysis for {params['analysis_direction_detected']} HTTP ---")
            stats = analyze_throughput(file_path, params["column_to_analyze_throughput"], params["event_col"], params["start_event"], params["end_event"], fallback_column_name=params["column_to_analyze_throughput_fallback"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Throughput Stats: {stats}")
            if stats and "Number of Intervals" in stats:
                print(f"Number of Intervals: {stats['Number of Intervals']}")
    elif params["protocol_type_detected"] == "UDP":
        if params["analysis_direction_detected"] == "DL":
            # Analyze Throughput
            print(f"\n--- Performing Throughput Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_throughput(file_path, params["column_to_analyze_throughput"], params["event_col"], params["start_event"], params["end_event"], fallback_column_name=params["column_to_analyze_throughput_fallback"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Throughput Stats: {stats}")
            if stats and "Number of Intervals" in stats:
                print(f"Number of Intervals: {stats['Number of Intervals']}")

            # Analyze Jitter
            print(f"\n--- Performing Jitter Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_jitter(file_path, params["column_to_analyze_jitter"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Jitter Stats: {stats}")

            # Analyze DL Error Ratio
            print(f"\n--- Performing DL Error Ratio Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_error_ratio(file_path, params["column_to_analyze_error_ratio"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Error Ratio Stats: {stats}")

        elif params["analysis_direction_detected"] == "UL":
            # Analyze Throughput
            print(f"\n--- Performing Throughput Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_throughput(file_path, params["column_to_analyze_throughput"], params["event_col"], params["start_event"], params["end_event"], fallback_column_name=params["column_to_analyze_throughput_fallback"], fallback_event_col_name=params["event_col_fallback"], third_fallback_column_name=params["column_to_analyze_throughput_third_fallback"])
            print(f"Throughput Stats: {stats}")
            if stats and "Number of Intervals" in stats:
                print(f"Number of Intervals: {stats['Number of Intervals']}")

            # Analyze UL Jitter
            print(f"\n--- Performing UL Jitter Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_jitter(file_path, params["column_to_analyze_ul_jitter"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Jitter Stats: {stats}")

            # Analyze UL Error Ratio
            print(f"\n--- Performing UL Error Ratio Analysis for {params['analysis_direction_detected']} UDP ---")
            stats = analyze_error_ratio(file_path, params["column_to_analyze_ul_error_ratio"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            print(f"Error Ratio Stats: {stats}")
    elif params["protocol_type_detected"] == "WEB_PAGE":
        print(f"\n--- Performing Web Page Load Time Analysis ---")
        stats = analyze_web_page_load_time(file_path, params["event_col"], params["start_event"], params["end_event"], params["column_to_analyze_total_duration"], fallback_event_col_name=params["event_col_fallback"])
        print(f"Web Page Load Time Stats: {stats}")
        if stats and "Number of Intervals" in stats:
            print(f"Number of Intervals: {stats['Number of Intervals']}")
    elif params["protocol_type_detected"] == "PING": # This block handles direct PING files
        print(f"\n--- Performing Ping RTT Analysis ---")
        ping_stats = ping_statics.calculate_ping_statistics(file_path, params["device_type_detected"])
        if ping_stats and "Ping RTT" in ping_stats:
            print(f"Ping RTT Mean: {ping_stats['Ping RTT']['avg']:.2f} ms")
            print(f"Ping RTT Min: {ping_stats['Ping RTT']['min']:.2f} ms")
            print(f"Ping RTT Max: {ping_stats['Ping RTT']['max']:.2f} ms")
            print(f"Ping RTT Std Dev: {ping_stats['Ping RTT']['std_dev']:.2f} ms")
        else:
            print("No Ping RTT statistics could be calculated.")

    # Additional Ping RTT analysis for "drive" paths, regardless of primary protocol
    if params["is_drive_path"] and params["protocol_type_detected"] != "PING":
        print(f"DEBUG: Attempting to find related ping file for drive path. is_drive_path: {params['is_drive_path']}, protocol_type_detected: {params['protocol_type_detected']}, device_type_detected: {params['device_type_detected']}")
        related_ping_file = _find_related_ping_file(file_path, params["device_type_detected"])
        if related_ping_file:
            print(f"Found related Ping file: {related_ping_file}")
            ping_stats = ping_statics.calculate_ping_statistics(related_ping_file, params["device_type_detected"])
            if ping_stats and "Ping RTT" in ping_stats:
                print(f"Ping RTT Mean: {ping_stats['Ping RTT']['avg']:.2f} ms")
                print(f"Ping RTT Min: {ping_stats['Ping RTT']['min']:.2f} ms")
                print(f"Ping RTT Max: {ping_stats['Ping RTT']['max']:.2f} ms")
                print(f"Ping RTT Std Dev: {ping_stats['Ping RTT']['std_dev']:.2f} ms")
            else:
                print(f"No Ping RTT statistics could be calculated from {related_ping_file}.")
        else:
            print(f"No related Ping file found for drive path: {file_path}")

    print(f"\nDevice Type: {params['device_type_detected']}")
