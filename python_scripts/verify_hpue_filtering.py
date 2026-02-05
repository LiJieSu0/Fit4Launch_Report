import pandas as pd
import numpy as np
import os
import sys

# Add the script directory to path
sys.path.append(r'd:\ReportGenerator\python_scripts')

from Coverage.n41_coverage_analyzer import analyze_n41_coverage
from Coverage.coverage_secondary_kpi_analyzer import analyze_secondary_kpis

def test_filtering_restriction():
    print("\n--- Testing HPUE Filtering Restriction ---")
    hpue_dir = 'mock_HPUE_data'
    non_hpue_dir = 'mock_normal_coverage'
    os.makedirs(hpue_dir, exist_ok=True)
    os.makedirs(non_hpue_dir, exist_ok=True)
    
    # PC3 file with high power (25)
    data = {
        '[Call Test] [Throughput] Application UL TP': [2, 2, 2, 2, 2],
        '[General] Serving Network': ['NR SA', 'NR SA', 'NR SA', 'NR SA', 'No service'],
        '[NR5G] [RF] RSRP': [-100, -100, -100, -100, -100],
        '[NR5G] [Power] Tx power (PUSCH Actual)': [23, 25, 24, 24, 24],
        '[NR5G] [Power] Tx power (Total)': [23, 25, 24, 24, 24],
        '[NR5G] [BLER & HARQ] PDSCH BLER': [5, 5, 5, 5, 5],
        '[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)': [15, 15, 15, 15, 15],
        '[NR5G] [Quality Report] [CQI] WB CQI (Avg)': [10, 10, 10, 10, 10],
        '[General] [GPS] Latitude': [47.1, 47.2, 47.3, 47.4, 47.5],
        '[General] [GPS] Longitude': [-122.1, -122.2, -122.3, -122.4, -122.5]
    }
    df = pd.DataFrame(data)
    
    hpue_file = os.path.join(hpue_dir, 'PC3_Run1.csv')
    normal_file = os.path.join(non_hpue_dir, 'PC3_Run1.csv')
    
    df.to_csv(hpue_file, index=False)
    df.to_csv(normal_file, index=False)
    
    # Test 1: n41_coverage_analyzer filtering
    res_hpue_n41 = analyze_n41_coverage(hpue_dir)
    res_normal_n41 = analyze_n41_coverage(non_hpue_dir)
    
    print(f"HPUE n41 result: {res_hpue_n41[0]['tx_power_value']}") # Expect 24 (last valid) or 23?
    # Actually analyze_n41_coverage takes the FIRST valid point from bottom up?
    # Logic: Search upwards from 'No service' index (4) -> indices 3, 2, 1, 0.
    # index 3: val=24. Valid.
    
    print(f"Normal n41 result: {res_normal_n41[0]['tx_power_value']}")
    
    # Test 2: secondary KPI filtering
    res_hpue_sec = analyze_secondary_kpis(hpue_file)
    res_normal_sec = analyze_secondary_kpis(normal_file)
    
    print(f"HPUE Secondary TxPower Avg: {res_hpue_sec['TxPower']}") # 25 filtered -> avg of [23, 24, 24, 24] = 23.75
    print(f"Normal Secondary TxPower Avg: {res_normal_sec['TxPower']}") # No filter -> avg of [23, 25, 24, 24, 24] = 120/5 = 24.0
    
    if res_hpue_sec['TxPower'] < res_normal_sec['TxPower']:
        print("PASSED: HPUE was filtered, Normal was NOT.")
    else:
        print(f"FAILED: HPUE={res_hpue_sec['TxPower']}, Normal={res_normal_sec['TxPower']}")

    # Cleanup
    import shutil
    shutil.rmtree(hpue_dir)
    shutil.rmtree(non_hpue_dir)

if __name__ == "__main__":
    test_filtering_restriction()
