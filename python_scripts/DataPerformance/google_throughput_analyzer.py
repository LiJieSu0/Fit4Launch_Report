# This script will analyze a CSV file to calculate average throughput in specific intervals.
# The intervals are defined by a start condition (>2M throughput) and an end condition (three consecutive <2M throughput values).

import pandas as pd
import argparse

def analyze_throughput(file_path):
    """
    Analyzes a CSV file for PDSCH Throughput, identifies intervals,
    calculates average throughput for each interval, and then the overall average.

    Args:
        file_path (str): The path to the CSV file.

    Returns:
        float: The overall average of all interval averages, or None if no data/intervals found.
    """
    # Define the possible column names for Throughput
    possible_columns = [
        '[Call Test] [Throughput] Application DL TP',
        '[NR5G] [(NR + LTE)] [Throughput] PDSCH TP',
        '[NR5G] [Throughput] PDSCH TP',
        '[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)'
    ]

    # Try to find the header row by searching for known column names
    header_row = 0
    header_found = False
    
    # Read first 20 rows to find the header
    try:
        temp_df = pd.read_csv(file_path, nrows=20, header=None)
        for i, row in temp_df.iterrows():
            row_items = [str(x).strip() for x in row.tolist()]
            
            # Check if any known column is in this row
            for col in possible_columns:
                if col in row_items:
                    header_row = i
                    header_found = True
                    break
            
            if not header_found:
                 # Fuzzy check
                 for item in row_items:
                    item_lower = item.lower()
                    if ("throughput" in item_lower or "dl tp" in item_lower or "ul tp" in item_lower):
                         header_row = i
                         header_found = True
                         break
            
            if header_found:
                break
    except Exception as e:
        print(f"Error during header detection: {e}")

    try:
        if header_found:
            df = pd.read_csv(file_path, skiprows=header_row)
        else:
            # Fallback
            df = pd.read_csv(file_path)

        # Iterate through possible columns to find one with VALID DATA
        throughput_column = None
        
        # 1. Check known columns
        for col in possible_columns:
            if col in df.columns:
                # Check if column has non-null, non-empty data
                valid_data = pd.to_numeric(df[col], errors='coerce').dropna()
                if len(valid_data) > 0:
                    throughput_column = col
                    print(f"DEBUG: Found valid throughput column: {col} with {len(valid_data)} data points")
                    break
                else:
                    # verbose debug removed
                    pass

        # 2. Fuzzy match if no known column with data found
        if not throughput_column:
             # Trying fuzzy match on all columns
             for col in df.columns:
                 col_lower = str(col).lower()
                 if ("throughput" in col_lower or "dl tp" in col_lower or "ul tp" in col_lower):
                      # Check validity
                      valid_data = pd.to_numeric(df[col], errors='coerce').dropna()
                      if len(valid_data) > 0:
                          throughput_column = col
                          print(f"DEBUG: Found likely throughput column via fuzzy match: {col} with {len(valid_data)} data points")
                          break
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return None

    if not throughput_column:
        print(f"Error: None of the expected throughput columns found in the CSV file (or all were empty). Checked: {possible_columns}")
        return None

    print(f"Analyzing file: {file_path}")
    
    throughput_data = df[throughput_column].dropna().tolist()
    
    # Convert throughput data to numeric, handling potential non-numeric values
    numeric_throughput_data = []
    for x in throughput_data:
        try:
            numeric_throughput_data.append(float(x))
        except ValueError:
            # Skip non-numeric values
            continue

    if not numeric_throughput_data:
        print("No valid numeric throughput data found.")
        return None

    interval_averages = []
    interval_counts = [] # New list to store counts of data points in each interval
    in_interval = False
    current_interval_data = []
    consecutive_low_count = 0
    threshold = 2.0 # Assuming 2 Mbps as the threshold based on user feedback and image

    for i, value in enumerate(numeric_throughput_data):
        if not in_interval:
            if value > threshold:
                in_interval = True
                current_interval_data.append(value)
                consecutive_low_count = 0 # Reset count when a new interval starts
        else: # Currently in an interval
            current_interval_data.append(value)
            if value < threshold:
                consecutive_low_count += 1
            else:
                consecutive_low_count = 0 # Reset if value is >= threshold

            # Check for end of interval condition (3 consecutive values < threshold)
            if consecutive_low_count >= 3:
                # The interval ends at the value *before* the three consecutive low values.
                # So, remove the last three values from current_interval_data
                if len(current_interval_data) > 3:
                    interval_to_average = current_interval_data[:-3]
                    if interval_to_average:
                        interval_averages.append(sum(interval_to_average) / len(interval_to_average))
                        interval_counts.append(len(interval_to_average)) # Store the count
                elif len(current_interval_data) > 0: # Handle cases where interval is very short
                    interval_to_average = current_interval_data[:-consecutive_low_count]
                    if interval_to_average:
                        interval_averages.append(sum(interval_to_average) / len(interval_to_average))
                        interval_counts.append(len(interval_to_average)) # Store the count
                
                in_interval = False
                current_interval_data = []
                consecutive_low_count = 0

    # Handle any remaining data if an interval was open at the end of the file
    if in_interval and current_interval_data:
        # If the last part of the data was an open interval, average what's there
        # We don't have 3 consecutive low values to end it, so we average all of it.
        interval_averages.append(sum(current_interval_data) / len(current_interval_data))
        interval_counts.append(len(current_interval_data)) # Store the count for the last interval

    if interval_averages:
        overall_average = sum(interval_averages) / len(interval_averages)
        print(f"Individual interval averages: {interval_averages}")
        print(f"Overall average of all interval averages: {overall_average}")
        return {
            "overall_average": overall_average,
            "interval_averages": interval_averages, # Keep for now, will remove in run_all_data_analysis.py
            "interval_counts": interval_counts # Add interval counts
        }
    else:
        # Fallback: If no valid intervals are found, calculate the average of all non-zero throughput values
        non_zero_throughput = [val for val in numeric_throughput_data if val > 0]
        if non_zero_throughput:
            overall_average = sum(non_zero_throughput) / len(non_zero_throughput)
            print("No valid intervals found using the defined criteria. Calculating overall average of all non-zero throughput values as a fallback.")
            print(f"Fallback overall average throughput: {overall_average}")
            return {
                "overall_average": overall_average,
                "interval_averages": [], # Return empty list for individual averages
                "interval_counts": [] # Return empty list for interval counts in fallback
            }
        else:
            print("No valid intervals found and no non-zero throughput data to calculate a fallback average.")
            return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze PDSCH Throughput from a CSV file.")
    parser.add_argument("file_path", type=str, help="The path to the CSV file to analyze.")
    args = parser.parse_args()

    print(f"Analyzing throughput for file: {args.file_path}")
    analyze_throughput(args.file_path)
