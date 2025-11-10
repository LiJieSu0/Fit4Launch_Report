import pandas as pd
import json
import os

def calculate_vq_statistics(directory_path, column_name="[Call Test] [Voice Quality] [Per Rx Clip] MOS Value", output_json_path="vq_statistics.json"):
    """
    Reads MOS values from all CSV files in a specified directory, performs interval statistics,
    calculates percentages, and outputs the aggregated results to a single JSON file.

    Args:
        directory_path (str): The path to the directory containing input CSV files.
        column_name (str): The name of the column containing MOS values.
        output_json_path (str): The path for the output JSON file.
    """
    if not os.path.isdir(directory_path):
        print(f"Error: Directory not found at {directory_path}")
        return

    all_statistics_results = {}
    
    # Add re import
    import re

    for filename in os.listdir(directory_path):
        if filename.endswith(".csv"):
            csv_file_path = os.path.join(directory_path, filename)
            print(f"Processing file: {csv_file_path}")

            # Extract DUT/REF identifier from filename
            match = re.search(r'(DUT[12]|REF[12])', filename, re.IGNORECASE)
            if not match:
                print(f"Warning: Could not find DUT1, DUT2, REF1, or REF2 in filename: {filename}. Skipping.")
                continue
            
            # Use the extracted identifier as the key
            json_key = match.group(1).upper()

            try:
                df = pd.read_csv(csv_file_path)
            except Exception as e:
                print(f"Error reading CSV file {filename}: {e}")
                continue

            if column_name not in df.columns:
                print(f"Error: Column '{column_name}' not found in {filename}.")
                print(f"Available columns: {df.columns.tolist()}")
                continue

            mos_values = pd.to_numeric(df[column_name], errors='coerce').dropna()

            if mos_values.empty:
                print(f"No valid numeric data found in column '{column_name}' in {filename}.")
                continue

            total_count = len(mos_values)
            if total_count == 0:
                print(f"No data to process in {filename}.")
                continue

            interval_counts = {
                "< 2.0": 0
            }
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
                    if not found:
                        print(f"Warning: Value {value} from {filename} did not fit into any defined interval between 2.0 and 4.5.")

            file_statistics = {}
            for interval, count in interval_counts.items():
                percentage = (count / total_count) * 100 if total_count > 0 else 0
                file_statistics[interval] = {
                    "count": count,
                    "percentage": round(percentage, 2)
                }
            all_statistics_results[json_key] = file_statistics

    try:
        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(all_statistics_results, f, ensure_ascii=False, indent=4)
        print(f"Aggregated statistics successfully written to {output_json_path}")
    except Exception as e:
        print(f"Error writing JSON file: {e}")

if __name__ == "__main__":
    base_path = r"D:\ReportGenerator\report-generator-app\src\DataFiles\Vq"
    
    # Define the four input directories and their corresponding output JSON file names
    paths_to_process = {
        "5G Auto VoNR Disabled EVS WB VQ Base": os.path.join(base_path, r"5G Auto VoNR Disabled EVS WB VQ\Base"),
        "5G Auto VoNR Disabled EVS WB VQ Mobile": os.path.join(base_path, r"5G Auto VoNR Disabled EVS WB VQ\Mobile"),
        "5G Auto VoNR Enabled EVS WB VQ Base": os.path.join(base_path, r"5G Auto VoNR Enabled EVS WB VQ\Base"),
        "5G Auto VoNR Enabled EVS WB VQ Mobile": os.path.join(base_path, r"5G Auto VoNR Enabled EVS WB VQ\Mobile"),
    }

    for name, directory in paths_to_process.items():
        output_json_filename = f"vq_mos_statistics_{name.replace(' ', '_').lower()}.json"
        output_file_path = os.path.join(base_path, output_json_filename)
        print(f"\nProcessing {name} from directory: {directory}")
        calculate_vq_statistics(directory, output_json_path=output_file_path)