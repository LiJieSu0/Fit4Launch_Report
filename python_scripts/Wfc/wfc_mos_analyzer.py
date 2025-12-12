import pandas as pd
import os
import glob

def analyze_wfc_mos(directory_path):
    """
    Analyzes all CSV files in the specified directory and calculates the average
    of the '[Call Test] [Voice Quality] [Per Rx Clip] MOS Value' column.
    """
    # Normalize the path
    directory_path = os.path.normpath(directory_path)
    
    # Verify directory exists
    if not os.path.exists(directory_path):
        print(f"Error: Directory not found: {directory_path}")
        return

    # Find all CSV files
    csv_files = glob.glob(os.path.join(directory_path, "*.csv"))
    
    if not csv_files:
        print(f"No CSV files found in {directory_path}")
        return

    print(f"Found {len(csv_files)} CSV files in {directory_path}\n")
    print("-" * 80)
    print(f"{'File Name':<60} | {'Average MOS':<15}")
    print("-" * 80)

    target_column = "[Call Test] [Voice Quality] [Per Rx Clip] MOS Value"

    for file_path in csv_files:
        file_name = os.path.basename(file_path)
        try:
            # Read CSV file
            # Using low_memory=False to avoid mixed type warnings if file is large
            df = pd.read_csv(file_path, low_memory=False)
            
            if target_column in df.columns:
                # Calculate mean, automatically ignores NaNs
                mean_val = df[target_column].mean()
                
                if pd.notna(mean_val):
                    print(f"{file_name:<60} | {mean_val:.4f}")
                else:
                    print(f"{file_name:<60} | {'No Data (NaN)':<15}")
            else:
                print(f"{file_name:<60} | {'Column Not Found':<15}")
                
        except Exception as e:
            print(f"{file_name:<60} | Error: {str(e)}")

if __name__ == "__main__":
    target_dir = r"D:\ReportGenerator\Raw Data\WFC MOS\WFC MOS"
    analyze_wfc_mos(target_dir)
