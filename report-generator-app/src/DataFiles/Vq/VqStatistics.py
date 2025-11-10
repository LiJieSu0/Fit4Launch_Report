import pandas as pd
import json
import os

def calculate_vq_statistics(csv_file_path, column_name="[Call Test] [Voice Quality] [Per Rx Clip] MOS Value", output_json_path="vq_statistics.json"):
    """
    Reads MOS values from a specified CSV file, performs interval statistics,
    calculates percentages, and outputs the results to a JSON file.

    Args:
        csv_file_path (str): The path to the input CSV file.
        column_name (str): The name of the column containing MOS values.
        output_json_path (str): The path for the output JSON file.
    """
    if not os.path.exists(csv_file_path):
        print(f"Error: CSV file not found at {csv_file_path}")
        return

    try:
        df = pd.read_csv(csv_file_path)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return

    if column_name not in df.columns:
        print(f"Error: Column '{column_name}' not found in the CSV file.")
        print(f"Available columns: {df.columns.tolist()}")
        return

    # Extract MOS values and convert to numeric, coercing errors to NaN
    mos_values = pd.to_numeric(df[column_name], errors='coerce').dropna()

    if mos_values.empty:
        print(f"No valid numeric data found in column '{column_name}'.")
        return

    total_count = len(mos_values)
    if total_count == 0:
        print("No data to process.")
        return

    # Initialize interval counts
    interval_counts = {
        "< 2.0": 0
    }
    for i in range(20, 45): # From 2.0 to 4.4
        lower_bound = i / 10.0
        upper_bound = (i + 1) / 10.0
        interval_counts[f"[{lower_bound:.1f}, {upper_bound:.1f})"] = 0
    interval_counts[">= 4.5"] = 0

    # Populate interval counts
    for value in mos_values:
        if value < 2.0:
            interval_counts["< 2.0"] += 1
        elif value >= 4.5:
            interval_counts[">= 4.5"] += 1
        else:
            # Find the correct 0.1 interval
            found = False
            for i in range(20, 45):
                lower_bound = i / 10.0
                upper_bound = (i + 1) / 10.0
                if lower_bound <= value < upper_bound:
                    interval_counts[f"[{lower_bound:.1f}, {upper_bound:.1f})"] += 1
                    found = True
                    break
            # This case should ideally not be reached if logic is correct, but for robustness
            if not found:
                print(f"Warning: Value {value} did not fit into any defined interval between 2.0 and 4.5.")


    # Calculate percentages
    statistics_results = {}
    for interval, count in interval_counts.items():
        percentage = (count / total_count) * 100 if total_count > 0 else 0
        statistics_results[interval] = {
            "count": count,
            "percentage": round(percentage, 2)
        }

    # Output to JSON file
    try:
        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(statistics_results, f, ensure_ascii=False, indent=4)
        print(f"Statistics successfully written to {output_json_path}")
    except Exception as e:
        print(f"Error writing JSON file: {e}")

if __name__ == "__main__":
    # Example usage based on the provided path
    csv_file = r"D:\ReportGenerator\report-generator-app\src\DataFiles\Vq\5G Auto VoNR Disabled EVS WB VQ\Base\vonr disable evs wb DUT1 base.csv"
    output_file = r"D:\ReportGenerator\report-generator-app\src\DataFiles\Vq\vq_mos_statistics.json"
    calculate_vq_statistics(csv_file, output_json_path=output_file)