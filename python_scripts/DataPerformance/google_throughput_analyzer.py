# This script will analyze a CSV file to calculate average throughput in specific intervals.
# The intervals are defined by a start condition (>2M throughput) and an end condition (three consecutive <2M throughput values).

import pandas as pd
import argparse
import re

def _clean_header(header):
    """
    Removes content within square brackets (tags) and strips leading/trailing whitespace from a header string.
    """
    # Remove content within square brackets, including the brackets themselves
    cleaned_header = re.sub(r'\[.*?\]', '', header)
    # Strip leading/trailing whitespace
    return cleaned_header.strip()

def analyze_throughput(file_path):
    """
    Analyzes one or more CSV files for PDSCH Throughput, identifies intervals,
    calculates average throughput for each interval, and then the overall average.

    Args:
        file_path: Either a single file path (str) or a list of file paths (list)

    Returns:
        dict: A dictionary containing the calculated statistics, or None if no data/intervals found.
    """
    # Handle both single file and file list
    if isinstance(file_path, list):
        file_paths = file_path
    else:
        file_paths = [file_path]
    
    all_interval_averages = []
    all_interval_counts = []
    all_numeric_throughput_data = []

    # Define the possible column names for Throughput
    possible_columns = [
        '[Call Test] [Throughput] Application DL TP',
        '[NR5G] [(NR + LTE)] [Throughput] PDSCH TP',
        '[NR5G] [Throughput] PDSCH TP',
        '[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)'
    ]

    for current_file_path in file_paths:
        # Try to find the header row by searching for known column names
        header_row = 0
        header_found = False
        
        # Read first 20 rows to find the header
        try:
            temp_df = pd.read_csv(current_file_path, nrows=20, header=None)
            for i, row in temp_df.iterrows():
                row_items = [str(x).strip() for x in row.tolist()]
                
                # Check if any known column is in this row
                for col in possible_columns:
                    if col in row_items:
                        header_row = i
                        header_found = True
                        break
                
                if header_found:
                    break
            
            if not header_found:
                # Fuzzy check
                for i, row in temp_df.iterrows():
                    row_items = [str(x).strip() for x in row.tolist()]
                    for item in row_items:
                        item_lower = item.lower()
                        if ("throughput" in item_lower or "dl tp" in item_lower or "ul tp" in item_lower):
                            header_row = i
                            header_found = True
                            break
                    if header_found: break
        except Exception as e:
            print(f"Error during header detection for {current_file_path}: {e}")
            continue

        try:
            if header_found:
                df = pd.read_csv(current_file_path, skiprows=header_row)
            else:
                df = pd.read_csv(current_file_path)

            df.columns = [_clean_header(col) for col in df.columns]
            
            # Find throughput column
            throughput_column = None
            for col in possible_columns:
                clean_col = _clean_header(col)
                if clean_col in df.columns:
                    valid_data = pd.to_numeric(df[clean_col], errors='coerce').dropna()
                    if len(valid_data) > 0:
                        throughput_column = clean_col
                        break
            
            if not throughput_column:
                for col in df.columns:
                    col_lower = str(col).lower()
                    if ("throughput" in col_lower or "dl tp" in col_lower or "ul tp" in col_lower):
                        valid_data = pd.to_numeric(df[col], errors='coerce').dropna()
                        if len(valid_data) > 0:
                            throughput_column = col
                            break
                            
            if not throughput_column:
                continue

            throughput_data = df[throughput_column].dropna().tolist()
            file_numeric_data = []
            for x in throughput_data:
                try:
                    file_numeric_data.append(float(x))
                except ValueError:
                    continue
            
            if not file_numeric_data:
                continue
                
            all_numeric_throughput_data.extend(file_numeric_data)
            
            # Analyze intervals for this file
            in_interval = False
            current_interval_data = []
            consecutive_low_count = 0
            threshold = 2.0

            for value in file_numeric_data:
                if not in_interval:
                    if value > threshold:
                        in_interval = True
                        current_interval_data.append(value)
                        consecutive_low_count = 0
                else:
                    current_interval_data.append(value)
                    if value < threshold:
                        consecutive_low_count += 1
                    else:
                        consecutive_low_count = 0

                    if consecutive_low_count >= 3:
                        if len(current_interval_data) > 3:
                            interval_to_average = current_interval_data[:-3]
                            if interval_to_average:
                                all_interval_averages.append(sum(interval_to_average) / len(interval_to_average))
                                all_interval_counts.append(len(interval_to_average))
                        
                        in_interval = False
                        current_interval_data = []
                        consecutive_low_count = 0

            if in_interval and current_interval_data:
                all_interval_averages.append(sum(current_interval_data) / len(current_interval_data))
                all_interval_counts.append(len(current_interval_data))

        except Exception as e:
            print(f"Error reading and analyzing {current_file_path}: {e}")
            continue

    if all_interval_averages:
        overall_average = sum(all_interval_averages) / len(all_interval_averages)
        return {
            "overall_average": overall_average,
            "interval_averages": all_interval_averages,
            "interval_counts": all_interval_counts
        }
    else:
        # Fallback
        non_zero_throughput = [val for val in all_numeric_throughput_data if val > 0]
        if non_zero_throughput:
            overall_average = sum(non_zero_throughput) / len(non_zero_throughput)
            return {
                "overall_average": overall_average,
                "interval_averages": [],
                "interval_counts": []
            }
        else:
            return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze PDSCH Throughput from a CSV file.")
    parser.add_argument("file_path", type=str, help="The path to the CSV file to analyze.")
    args = parser.parse_args()

    print(f"Analyzing throughput for file: {args.file_path}")
    analyze_throughput(args.file_path)
