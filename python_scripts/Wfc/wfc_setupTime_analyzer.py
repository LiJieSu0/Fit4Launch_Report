import os
import pandas as pd
import re

def analyze_csv_for_mean_setup_time(file_path):
    """
    Analyzes a single CSV file to calculate MeanSetupTime.

    It first tries to find the header '[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)'.
    If not found, it falls back to calculating the time difference between
    '[Event] Voice Call Event' with '[UE] Voice - Setup Success' and '[UE] Voice - Orig Success'.
    """
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

    setup_times = []

    # Primary method: Look for 'SIP Setup Duration (Invite~200OK)' header
    sip_setup_header = '[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)'
    if sip_setup_header in df.columns:
        # Extract numeric values, handling potential non-numeric entries
        durations = pd.to_numeric(df[sip_setup_header], errors='coerce').dropna()
        if not durations.empty:
            setup_times.extend(durations.tolist())

    if not setup_times:
        # Secondary method: Calculate time difference from 'Voice Call Event'
        if 'Time' in df.columns and '[Event] Voice Call Event' in df.columns:
            # Convert 'Time' column to datetime objects for the entire DataFrame
            df['Time'] = pd.to_datetime(df['Time'], errors='coerce')
            df_filtered = df.dropna(subset=['Time'])

            # Filter for relevant events and sort by time
            relevant_events = df_filtered[df_filtered['[Event] Voice Call Event'].isin(['[UE]   Voice - Orig Success', '[UE]   Voice - Setup Success'])].sort_values(by='Time')

            if not relevant_events.empty:
                orig_time = None
                for _, row in relevant_events.iterrows():
                    event_type = row['[Event] Voice Call Event']
                    current_time = row['Time']

                    if event_type == '[UE]   Voice - Orig Success':
                        orig_time = current_time
                    elif event_type == '[UE]   Voice - Setup Success' and orig_time is not None:
                        time_diff_seconds = (current_time - orig_time).total_seconds()
                        setup_times.append(time_diff_seconds)
                        orig_time = None  # Reset for the next pair
        elif 'Time' not in df.columns:
             print(f"Warning: 'Time' column not found in {file_path} for secondary method.")

    if setup_times:
        return sum(setup_times) / len(setup_times)
    return None

def process_directory(directory_path):
    """
    Processes all CSV files in the specified directory and calculates the overall MeanSetupTime.
    """
    all_setup_times = []
    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.csv'):
                file_path = os.path.join(root, file)
                print(f"Analyzing file: {file_path}")
                mean_time = analyze_csv_for_mean_setup_time(file_path)
                if mean_time is not None:
                    print(f"MeanSetupTime for {file_path}: {mean_time:.2f}")
                    all_setup_times.append(mean_time)
                else:
                    print(f"Could not determine MeanSetupTime for {file_path}")

    if all_setup_times:
        overall_mean_setup_time = sum(all_setup_times) / len(all_setup_times)
        print(f"\nOverall MeanSetupTime for all processed files: {overall_mean_setup_time:.2f}")
        return overall_mean_setup_time
    else:
        print(f"No MeanSetupTime could be calculated for any files in {directory_path}")
        return None

if __name__ == "__main__":
    target_directory = r"D:\ReportGenerator\Raw Data\WFC MOS\WFC CP"
    process_directory(target_directory)