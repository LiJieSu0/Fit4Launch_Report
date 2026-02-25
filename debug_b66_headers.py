import pandas as pd
import os
import sys

# Add the script directory to path
sys.path.append(r'd:\ReportGenerator\python_scripts\Coverage')

from coverage_secondary_kpi_analyzer import analyze_secondary_kpis

file_path = r'd:\ReportGenerator\Raw Data\#Dry Run\Seattle\Coverage Performance\Lte Coverage Test\b66\_20260208_100852_CH01_TMO_VONR ON_LTE Coverage test_SEA DUT B66_R1.csv'

# Define necessary columns as in the script
col_bler = '[NR5G] [BLER & HARQ] PDSCH BLER'
col_dl_mcs = '[NR5G] [PCC] [PDSCH] [Modulation (TB0+TB1)] MCS (Avg)'
col_ul_mcs = '[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)'
col_cqi = '[NR5G] [Quality Report] [CQI] WB CQI (Avg)'
col_bler_lte = '[LTE] [L1] [BLER] PDSCH BLER'
col_dl_mcs_lte = '[LTE] [L1] [Modulation] DL MCS (TB0 & TB1 - Avg)'
col_ul_mcs_lte = '[LTE] [L1] [Modulation] UL MCS (TB0 - Average)'
col_network = '[General] Serving Network'
col_tx_power_lte = '[LTE] [Power] [Tx Power] Tx power (PUSCH Total)'

df = pd.read_csv(file_path)
available_cols = df.columns.tolist()

norm_path = file_path.lower()
is_lte = "coverage" in norm_path and "lte" in norm_path
print(f"Is LTE Mode detected: {is_lte}")

if is_lte:
    target_bler = col_bler_lte
    target_dl_mcs = col_dl_mcs_lte
    target_ul_mcs = col_ul_mcs_lte
    target_cqi = col_cqi
else:
    target_bler = col_bler
    target_dl_mcs = col_dl_mcs
    target_ul_mcs = col_ul_mcs
    target_cqi = col_cqi

print(f"Target BLER Header: {target_bler} (Present: {target_bler in available_cols})")
print(f"Target DL MCS Header: {target_dl_mcs} (Present: {target_dl_mcs in available_cols})")
print(f"Target UL MCS Header: {target_ul_mcs} (Present: {target_ul_mcs in available_cols})")
print(f"Target CQI Header: {target_cqi} (Present: {target_cqi in available_cols})")

# Tx Power Logic
priority_patterns = [
    "tx power (pusch actual)",
    "tx power (total)",
    "tx power (total actual)"
]
available_cols_lower = [c.lower() for c in available_cols]
tx_power_col = None

# Priority 1: LTE Specific
if is_lte:
    if col_tx_power_lte in available_cols:
        tx_power_col = col_tx_power_lte
        print(f"Tx Power (Strict LTE): {tx_power_col}")

if tx_power_col is None:
    for pattern in priority_patterns:
        match = next((i for i, col in enumerate(available_cols_lower) if pattern in col), None)
        if match is not None:
            tx_power_col = available_cols[match]
            print(f"Tx Power (Fuzzy Match '{pattern}'): {tx_power_col}")
            break

if tx_power_col is None:
    print("Tx Power Header: NOT FOUND")
