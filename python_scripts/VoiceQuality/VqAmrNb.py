import os
import pandas as pd
import argparse

def extract_device_type(file_path):
    """
    Extracts device type from the filename.
    Handles specific cases like DUT1, DUT2, REF1, REF2.
    """
    import re
    base_name = os.path.basename(file_path)
    
    # Use re to find DUT1, DUT2, REF1, REF2
    match = re.search(r'(DUT[12]|REF[12]?)', base_name, re.IGNORECASE)
    if match:
        return match.group(1).upper()
        
    return "Unknown Device"

def analyze_csv(file_path):
    """
    Analyzes a single CSV file for voice quality metrics.
    Extracts UL MOS, DL MOS, and calculates statistics.
    """
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None, None

    ul_mos_header = '[Call Test] [Voice Quality] [UL MOS] MOS'
    dl_mos_header = '[Call Test] [Voice Quality] [Per Rx Clip] MOS Value'
    fallback_mos_header = '[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)'

    ul_mos_scores = []
    dl_mos_scores = []

    if ul_mos_header in df.columns:
        ul_mos_scores = df[ul_mos_header].dropna().tolist()
    elif fallback_mos_header in df.columns:
        ul_mos_scores = df[fallback_mos_header].dropna().tolist()
    else:
        print(f"Warning: Neither '{ul_mos_header}' nor '{fallback_mos_header}' found in {file_path}")

    if dl_mos_header in df.columns:
        dl_mos_scores = df[dl_mos_header].dropna().tolist()
    elif fallback_mos_header in df.columns:
        dl_mos_scores = df[fallback_mos_header].dropna().tolist()
    else:
        print(f"Warning: Neither '{dl_mos_header}' nor '{fallback_mos_header}' found in {file_path}")

    ul_stats = calculate_statistics(ul_mos_scores)
    dl_stats = calculate_statistics(dl_mos_scores)

    # New Statistics: Attenuation and Level
    new_stats_headers = {
        'UL MOS ATTN': "[Call Test] [Voice Quality] [UL MOS] Attenuation",
        'DL MOS ATTN': "[Call Test] [Voice Quality] [Per Rx Clip] Attenuation",
        'INPUT LEVEL': "[Call Test] [Voice Quality] [Loudness] [Volume] [Reference signal's Level] Reference signal's Level #1",
        'OUTPUT LEVEL': "[Call Test] [Voice Quality] [Loudness] [Volume] [Received signal's Level] Received signal's Level #1"
    }
    
    extra_metrics = {}
    for key, header in new_stats_headers.items():
        if header in df.columns:
            vals = pd.to_numeric(df[header], errors='coerce').dropna()
            if not vals.empty:
                extra_metrics[key] = round(float(vals.mean()), 4)
            else:
                extra_metrics[key] = "N/A"
        else:
            extra_metrics[key] = "N/A"

    # Call Drop and Initiation Failure counts
    call_result_header = '[Call Test] Call Result'
    call_drop_count = 0
    if call_result_header in df.columns:
        call_results = df[call_result_header].dropna().astype(str)
        call_drop_count = int((call_results == 'Drop').sum())

    device_type = extract_device_type(file_path)

    return {
        "file_path": file_path,
        "device_type": device_type,
        "ul_mos_stats": ul_stats,
        "dl_mos_stats": dl_stats,
        "call_drop_count": call_drop_count,
        **extra_metrics
    }

def process_directory(directory_path, subdir_filter=None):
    """
    Traverses a directory, finds CSV files, and collects voice quality metrics per file.
    If subdir_filter is provided, only processes subdirectories whose names contain the filter string.
    """
    all_file_stats = []
    
    for root, dirs, files in os.walk(directory_path):
        # If a filter is applied and we are not in the root directory, check the current subdirectory name
        if subdir_filter and root != directory_path:
            current_subdir_name = os.path.basename(root)
            if subdir_filter.lower() not in current_subdir_name.lower():
                # If the current subdirectory doesn't match the filter, skip its contents and subdirectories
                dirs[:] = [] # Clear dirs to prevent os.walk from descending further
                continue

        for file in files:
            if file.endswith('.csv'):
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                file_stats = analyze_csv(file_path)
                if file_stats is not None:
                    all_file_stats.append(file_stats)
    
    return all_file_stats

def calculate_statistics(mos_scores):
    """
    Calculates average MOS and percentage of scores less than 2.
    """
    if not mos_scores:
        return {
            "count": 0,
            "mean": 0.0,
            "std_dev": 0.0,
            "max": 0.0,
            "min": 0.0,
            "% MOS < 2.0": 0.0,
            "% MOS < 3.0": 0.0
        }

    series = pd.Series(mos_scores)
    
    mean_mos = series.mean()
    std_dev_mos = series.std()
    max_mos = series.max()
    min_mos = series.min()
    
    count_less_than_2 = (series < 2).sum()
    percent_less_than_2 = (count_less_than_2 / len(mos_scores)) * 100

    count_less_than_3 = (series < 3).sum()
    percent_less_than_3 = (count_less_than_3 / len(mos_scores)) * 100
    
    return {
        "count": len(mos_scores),
        "mean": mean_mos,
            "std_dev": std_dev_mos,
            "max": max_mos,
            "min": min_mos,
            "% MOS < 2.0": percent_less_than_2,
            "% MOS < 3.0": percent_less_than_3
        }

def main():
    parser = argparse.ArgumentParser(description="Analyze voice quality from CSV files in a given directory.")
    parser.add_argument("path", help="The path to the directory containing CSV files.")
    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print(f"Error: Directory not found at '{args.path}'")
        return

    print(f"Starting analysis for directory: {args.path}")
    all_file_stats = process_directory(args.path)

    print("\n--- Analysis Results ---")

    if not all_file_stats:
        print("No CSV files found or processed with relevant data.")
        return

    for stats in all_file_stats:
        file_name = os.path.basename(stats["file_path"])
        device_type = stats["device_type"]
        print(f"\n--- File: {file_name} ---")
        print(f"  Device Type: {device_type}")

        # Uplink MOS statistics
        ul_stats = stats["ul_mos_stats"]
        print(f"  Uplink MOS :")
        print(f"    Count: {ul_stats['count']}")
        print(f"    Mean: {ul_stats['mean']:.2f}")
        print(f"    Standard Deviation: {ul_stats['std_dev']:.2f}")
        print(f"    Max: {ul_stats['max']:.2f}")
        print(f"    Percentage of scores < 2: {ul_stats['% MOS < 2.0']:.2f}%")
        print(f"    Percentage of scores < 3: {ul_stats['% MOS < 3.0']:.2f}%")

        # Downlink MOS statistics
        dl_stats = stats["dl_mos_stats"]
        print(f"  Downlink MOS :")
        print(f"    Count: {dl_stats['count']}")
        print(f"    Mean: {dl_stats['mean']:.2f}")
        print(f"    Standard Deviation: {dl_stats['std_dev']:.2f}")
        print(f"    Max: {dl_stats['max']:.2f}")
        print(f"    Percentage of scores < 2: {dl_stats['% MOS < 2.0']:.2f}%")
        print(f"    Percentage of scores < 3: {dl_stats['% MOS < 3.0']:.2f}%")

if __name__ == "__main__":
    main()