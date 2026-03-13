import pandas as pd
import os

file_path = r"D:\ReportGenerator\Raw Data\#Huaqin\New York\Data Performance\5G AUTO DP\5G Auto Data Play-store app Download\5G Auto Data Play-store app DL Stationary Good\_20260228_180205_CH01_NJNYC TMO_5G AUTO_Playstore 30M DL_NJNY DUT L1_.csv"

def check_units(path):
    try:
        df = pd.read_csv(path)
        # Find headers related to UL throughput
        target_headers = [
            "[Call Test] [HTTP Transfer] [UL] HTTP UL TP (Avg)",
            "[Call Test] [Throughput] Application UL TP",
            "[NR5G] [Throughput] PUSCH TP"
        ]
        
        results = {}
        for h in target_headers:
            if h in df.columns:
                valid_data = df[h].dropna()
                valid_data = valid_data[valid_data > 0]
                if not valid_data.empty:
                    results[h] = valid_data.iloc[0]
                else:
                    results[h] = "No non-zero data"
            else:
                results[h] = "Header not found"
        
        print("Unit Check Results:")
        for h, v in results.items():
            print(f"{h}: {v}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_units(file_path)
