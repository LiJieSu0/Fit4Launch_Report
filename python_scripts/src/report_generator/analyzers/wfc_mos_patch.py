import os
import logging
import re
import pandas as pd


def parse_mos_value_cell(cell_value, accept_single=False):
    """
    Parse a MOS value cell and extract the DL (downlink) value.
    
    Rules:
    - If cell contains two values (e.g., "4.15  4.31"), take the first one (DL)
    - If cell contains only one value:
        - If accept_single is True (for TC175), take that value as DL
        - Otherwise, skip it (return None)
    - If cell is empty or invalid, skip it (return None)
    
    Args:
        cell_value: String or numeric value from CSV cell
        accept_single: Whether to accept single-value cells
        
    Returns:
        float: DL MOS value, or None if should be skipped
    """
    if pd.isna(cell_value):
        return None
    
    if isinstance(cell_value, (int, float)):
        if accept_single:
            val = float(cell_value)
            if 0.0 <= val <= 5.0:
                return val
        return None

    if not isinstance(cell_value, str):
        return None
    
    # Strip whitespace and split by spaces
    parts = cell_value.strip().split()
    
    # Filter out empty strings
    parts = [p for p in parts if p]
    
    # Exactly 2 values (DL and UL)
    if len(parts) == 2:
        try:
            dl_value = float(parts[0])
            # Validate MOS range (typically 1.0 to 5.0)
            if 0.0 <= dl_value <= 5.0:
                return dl_value
        except ValueError:
            pass
    # Single value
    elif len(parts) == 1 and accept_single:
        try:
            dl_value = float(parts[0])
            if 0.0 <= dl_value <= 5.0:
                return dl_value
        except ValueError:
            pass
    
    return None


def parse_mos_patch_file(csv_path, tc_name=None):
    """
    Parse a MOS patch CSV file and extract DL MOS values for DUT and REF.
    
    Expected CSV format:
        Device,CH1,CH2
        DIR,   DL    UL   ,   DL    UL   
        ,  4.15  4.31,  4.24  4.31
        ...
    
    Special case for TC175:
        - Single values per cell (DL only)
        - Skip header/summary rows (Max, Avg, Min)
    
    Args:
        csv_path: Path to the CSV file
        tc_name: Name of the test case (e.g. TC175)
        
    Returns:
        dict: {"DUT": [mos_values], "REF": [mos_values]}
    """
    try:
        # Read CSV file
        df = pd.read_csv(csv_path)
        
        # Expected columns: Device, CH1, CH2
        if 'CH1' not in df.columns or 'CH2' not in df.columns:
            logging.warning(f"MOS patch file missing CH1/CH2 columns: {csv_path}")
            return {"DUT": [], "REF": []}
        
        accept_single = (tc_name == "TC175")
        
        dut_values = []
        ref_values = []
        
        # Process each row
        for idx, row in df.iterrows():
            # Special logic for TC175: skip summary rows
            if tc_name == "TC175":
                device_val = str(row.get('Device', '')).strip()
                if device_val in ['Max', 'Avg', 'Min', 'DIR']:
                    continue
            
            # CH1 = DUT
            dut_val = parse_mos_value_cell(row['CH1'], accept_single=accept_single)
            if dut_val is not None:
                dut_values.append(dut_val)
            
            # CH2 = REF
            ref_val = parse_mos_value_cell(row['CH2'], accept_single=accept_single)
            if ref_val is not None:
                ref_values.append(ref_val)
        
        return {"DUT": dut_values, "REF": ref_values}
        
    except Exception as e:
        logging.error(f"Error parsing MOS patch file {csv_path}: {e}")
        return {"DUT": [], "REF": []}


def calculate_patch_mos_average(mos_values):
    """
    Calculate average from a list of MOS values.
    
    Args:
        mos_values: List of float MOS values
        
    Returns:
        float: Average MOS value (rounded to 4 decimals), or None if no valid values
    """
    if not mos_values:
        return None
    
    # Filter out None values
    valid_values = [v for v in mos_values if v is not None]
    
    if not valid_values:
        return None
    
    return round(sum(valid_values) / len(valid_values), 4)


def generate_mos_histogram_stats(mos_values):
    """
    Generate histogram statistics for MOS values.
    
    Format:
    {
        "< 2.0": {"count": X, "percentage": Y},
        "[2.0, 2.1)": {"count": X, "percentage": Y},
        ...
        ">= 4.5": {"count": X, "percentage": Y}
    }
    
    Args:
        mos_values: List of float MOS values
        
    Returns:
        dict: Histogram statistics
    """
    if not mos_values:
        return {}
    
    total_count = len(mos_values)
    
    # Initialize bins
    bins = {}
    bins["< 2.0"] = {"count": 0, "percentage": 0.0}
    
    # [2.0, 2.1) to [4.4, 4.5)
    for i in range(20, 45):
        lower = i / 10.0
        upper = (i + 1) / 10.0
        bins[f"[{lower:.1f}, {upper:.1f})"] = {"count": 0, "percentage": 0.0}
    
    bins[">= 4.5"] = {"count": 0, "percentage": 0.0}
    
    # Count values
    for val in mos_values:
        if val < 2.0:
            bins["< 2.0"]["count"] += 1
        elif val >= 4.5:
            bins[">= 4.5"]["count"] += 1
        else:
            # For 2.0 <= val < 4.5
            idx = int(val * 10)
            lower = idx / 10.0
            upper = (idx + 1) / 10.0
            key = f"[{lower:.1f}, {upper:.1f})"
            if key in bins:
                bins[key]["count"] += 1
    
    # Calculate percentages
    for key in bins:
        count = bins[key]["count"]
        bins[key]["percentage"] = round((count / total_count) * 100, 2)
        
    return bins


def extract_tc_number(filename):
    """
    Extract TC number from filename (e.g., "TC-164-MOS_Values.csv" -> "TC164")
    
    Args:
        filename: Name of the file
        
    Returns:
        str: TC name (e.g., "TC164"), or None if not found
    """
    match = re.search(r'TC-?(\d+)', filename, re.IGNORECASE)
    if match:
        return f"TC{match.group(1)}"
    return None


def apply_mos_patch(results, patch_directory, output_dir=None, logger=None):
    """
    Apply MOS patch to WFC results by reading MOS data from patch files.
    
    This function:
    1. Scans the patch directory for TC-XXX-MOS_Values.csv files
    2. Parses each file to extract DL MOS values
    3. Calculates MOS averages for DUT and REF
    4. Overrides the mos_average in results
    5. Adds mos_linechart_data for visualization
    6. Exports line chart data to separate JSON files (if output_dir provided)
    
    Args:
        results: WFC analysis results dictionary (TC -> Category -> Metrics)
        patch_directory: Path to directory containing MOS patch CSV files
        output_dir: Optional path to export line chart JSON files
        logger: Optional logger instance
        
    Returns:
        dict: Modified results with patched MOS data
    """
    if not os.path.isdir(patch_directory):
        if logger:
            logger.warning(f"MOS patch directory not found: {patch_directory}")
        else:
            logging.warning(f"MOS patch directory not found: {patch_directory}")
        return results
    
    log_func = logger.info if logger else logging.info
    log_warn = logger.warning if logger else logging.warning
    
    log_func(f"Applying MOS patch from: {patch_directory}")
    
    # Scan for CSV files
    csv_files = [f for f in os.listdir(patch_directory) if f.lower().endswith('.csv')]
    
    for csv_file in csv_files:
        # Extract TC number from filename
        tc_name = extract_tc_number(csv_file)
        if not tc_name:
            log_warn(f"Could not extract TC number from: {csv_file}")
            continue
        
        # Check if this TC exists in results
        if tc_name not in results:
            log_warn(f"TC {tc_name} not found in results, skipping MOS patch")
            continue
        
        # Parse the MOS patch file
        csv_path = os.path.join(patch_directory, csv_file)
        mos_data = parse_mos_patch_file(csv_path, tc_name=tc_name)
        
        dut_values = mos_data["DUT"]
        ref_values = mos_data["REF"]
        
        # Calculate averages
        dut_avg = calculate_patch_mos_average(dut_values)
        ref_avg = calculate_patch_mos_average(ref_values)
        
        # Apply patch to results
        tc_results = results[tc_name]
        
        # Update DUT/REF categories (DUT, DUT MO, DUT MT, etc.)
        for category in tc_results:
            if "DUT" in category and dut_avg is not None:
                tc_results[category]["mos_average"] = dut_avg
                log_func(f"Patched {tc_name} {category} MOS: {dut_avg}")
            
            if "REF" in category and ref_avg is not None:
                tc_results[category]["mos_average"] = ref_avg
                log_func(f"Patched {tc_name} {category} MOS: {ref_avg}")
        
        # Prepare statistics for export
        export_data = {}
        
        # Check existing categories in results to use correct labels
        has_mo_mt = any("MO" in cat or "MT" in cat for cat in tc_results)
        
        if has_mo_mt:
            # If results have MO/MT breakdown, we apply same stats to all relevant categories
            # since the patch doesn't distinguish them
            for category in tc_results:
                if "DUT" in category:
                    export_data[category] = generate_mos_histogram_stats(dut_values)
                elif "REF" in category:
                    export_data[category] = generate_mos_histogram_stats(ref_values)
        else:
            # Standard DUT/REF
            if dut_values:
                export_data["DUT"] = generate_mos_histogram_stats(dut_values)
            if ref_values:
                export_data["REF"] = generate_mos_histogram_stats(ref_values)
        
        # Export line chart data to separate file if output_dir is provided
        if output_dir and export_data:
            os.makedirs(output_dir, exist_ok=True)
            output_filename = f"wfc_mos_statistics_{tc_name.lower()}.json"
            output_path = os.path.join(output_dir, output_filename)
            
            try:
                import json
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(export_data, f, indent=4, ensure_ascii=False)
                log_func(f"Exported MOS histogram statistics to: {output_path}")
            except Exception as e:
                log_warn(f"Failed to export statistics for {tc_name}: {e}")
    
    return results
