import os
import sys
import pandas as pd
import re

# Add the directory containing data_performance_statics to sys.path
script_dir = os.path.dirname(os.path.abspath(__file__))
if script_dir not in sys.path:
    sys.path.insert(0, script_dir)

import data_performance_statics

def _clean_header(header):
    """
    Removes content within square brackets (tags) and strips leading/trailing whitespace from a header string.
    """
    # Remove content within square brackets, including the brackets themselves
    cleaned_header = re.sub(r'\[.*?\]', '', header)
    # Strip leading/trailing whitespace
    return cleaned_header.strip()

def calculate_ping_statistics(file_path, device_type=None):
    """
    Calculates Ping RTT statistics from one or more CSV files.

    Args:
        file_path: Either a single file path (str) or a list of file paths (list)
        device_type (str, optional): The type of device (e.g., "DUT", "REF"). Defaults to None.

    Returns:
        dict: A dictionary containing the calculated statistics (min, max, avg, std dev) and device type.
    """
    # Handle both single file and file list
    if isinstance(file_path, list):
        file_paths = file_path
    else:
        file_paths = [file_path]
    
    all_rtt_values = []
    
    # Process each file
    for current_file_path in file_paths:
        try:
            # Attempt to read with default comma delimiter
            df = pd.read_csv(current_file_path)
        except pd.errors.ParserError:
            # If parsing fails, try with whitespace as a delimiter and no header
            print(f"Warning: ParserError with default CSV read for {current_file_path}. Attempting with whitespace delimiter and no header.")
            try:
                df = pd.read_csv(current_file_path, sep='\\s+', header=None)
                pass # We'll handle column access below
            except Exception as e:
                print(f"Error: Failed to parse {current_file_path} even with whitespace delimiter: {e}")
                continue
        except Exception as e:
            print(f"Error: An unexpected error occurred while reading {current_file_path}: {e}")
            continue

        # Apply the cleaning function to all column names in the DataFrame
        df.columns = [_clean_header(col) for col in df.columns]

        rtt_values = []
        in_ping_traffic_block = False

        # Dynamically determine column names or indices
        event_col_name = _clean_header('[Event] [Data call test detail events] Ping Call Event')
        rtt_col_name = _clean_header('[Call Test] [PING] [RTT] RTT')

        # Check if original column names exist
        if event_col_name not in df.columns or rtt_col_name not in df.columns:
            print(f"Warning: Cleaned column names not found in {current_file_path}. Attempting to infer or use default indices.")
            # This is a heuristic. Without knowing the file structure, this is a guess.
            # Assuming event is first column (index 0) and RTT is second (index 1) if no header.
            if df.shape[1] >= 2: # Ensure there are at least two columns
                event_col_name = df.columns[0]
                rtt_col_name = df.columns[1]
                print(f"Using inferred columns: Event='{event_col_name}', RTT='{rtt_col_name}'")
            else:
                print(f"Error: Could not infer event and RTT columns for {current_file_path}. Skipping.")
                continue

        for index, row in df.iterrows():
            event = row.get(event_col_name)
            rtt = row.get(rtt_col_name)

            if event == 'PING Traffic Start':
                in_ping_traffic_block = True
            elif event == 'PING Traffic End':
                in_ping_traffic_block = False
            elif in_ping_traffic_block and pd.notna(rtt):
                try:
                    all_rtt_values.append(float(rtt))
                except ValueError:
                    # Handle cases where RTT might not be a valid number
                    pass

    if not all_rtt_values:
        return {"min": None, "max": None, "avg": None, "std_dev": None}

    rtt_series = pd.Series(all_rtt_values)
    rtt_stats = data_performance_statics._calculate_statistics(rtt_series, "Ping RTT")

    # Maintain backward compatibility with existing keys if necessary, 
    # but the report-generator generally expects the structure from _calculate_statistics
    result = {
        "Ping RTT": rtt_stats
    }
    if device_type:
        result["Device Type"] = device_type
    return result
