import os
import shutil
import re
import argparse

def normalize_string(s):
    """Normalize string by lowercasing and removing non-alphanumeric characters."""
    s = s.lower()
    # Handle common abbreviations and typos
    s = s.replace("5gauto", "5g auto")
    s = s.replace("5gmhs", "5g mhs")
    s = s.replace("5gnsa", "5g nsa")
    s = s.replace("sigle", "single")
    normalized = re.sub(r'[^a-zA-Z0-9]', '', s)
    return normalized

def classify_files(source_dir, target_dir):
    if not os.path.exists(source_dir):
        print(f"[Error] Source directory {source_dir} does not exist.")
        return

    # Manual keyword to folder path mappings
    def k(s): return normalize_string(s)

    manual_mappings = {
        # Original SEA Mappings (keeping for compatibility)
        k("5ga_app dl"): "Data Performance\\5G AUTO DP\\5G Auto Data Play-store app Download",
        k("5ga_web page"): "Data Performance\\5G AUTO DP\\5G Auto Data Web-Kepler",
        k("5gn_app dl"): "Data Performance\\5G NSA DP\\5G NSA Data Play-store app Download",
        k("5gn_web page"): "Data Performance\\5G NSA DP\\5G NSA Data Web-Kepler",
        k("mhs"): "Data Performance\\5G AUTO DP\\Mobile Hotspot Test",
        k("mhs drive"): "Data Performance\\5G AUTO DP\\5G Auto Data Test MHS Drive",
        k("mhs driving"): "Data Performance\\5G AUTO DP\\5G Auto Data Test MHS Drive",
        
        # HTTP Tests
        k("5gauto ms http"): "Data Performance\\5G AUTO DP\\HTTP Multi Stream",
        k("5gauto ss http"): "Data Performance\\5G AUTO DP\\HTTP Single Stream",
        k("5gnsa ms http"): "Data Performance\\5G NSA DP\\HTTP Multi Stream",
        k("5gnsa ss http"): "Data Performance\\5G NSA DP\\HTTP Single Stream",

        # UDP Tests - 5G AUTO
        k("5gauto udp dl 400m"): "Data Performance\\5G AUTO DP\\Udp Test\\DL\\UDP Download Task at 400 Mbps for 10 seconds",
        k("5gauto udp dl 200m"): "Data Performance\\5G AUTO DP\\Udp Test\\DL\\UDP Download Task at 200 Mbps for 10 seconds",
        k("5gauto udp ul 10m"): "Data Performance\\5G AUTO DP\\Udp Test\\UL\\UDP Upload Task at 10 Mbps for 10 seconds",
        k("5gauto udp ul 20m"): "Data Performance\\5G AUTO DP\\Udp Test\\UL\\UDP Upload Task at 20 Mbps for 10 seconds",
        
        # UDP Tests - 5G NSA (Assuming similar structure, checking if different filenames? Step 163 shows "5G NSA_UDP..." folders)
        # But filename is likely "5GNSA_UDP...".
        # Folder: "Data Performance\5G NSA DP\Udp Test\DL\UDP Download Task at 400 Mbps for 10 seconds"
        # Wait, Step 163 for NSA Uplink shows: "5G NSA_UDP Upload Task at 10 Mbps..." (prefix 5G NSA_)
        # But Downlink just says "UDP Download Task..."? Step 163: "5G NSA DP\Udp Test\DL\UDP Download Task at 400 Mbps..."
        # So DL folders don't have prefix, UL folders MIGHT have.
        # Let's map to the folder name derived from Step 163/277.
        k("5gnsa udp dl 400m"): "Data Performance\\5G NSA DP\\Udp Test\\DL\\UDP Download Task at 400 Mbps for 10 seconds",
        k("5gnsa udp dl 200m"): "Data Performance\\5G NSA DP\\Udp Test\\DL\\UDP Download Task at 200 Mbps for 10 seconds", 
        
        # For NSA UL, checking Step 163 again carefully.
        # "D:\ReportGenerator\...\5G NSA DP\Udp Test\UL\5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"
        k("5gnsa udp ul 10m"): "Data Performance\\5G NSA DP\\Udp Test\\UL\\5G NSA_UDP Upload Task at 10 Mbps for 10 seconds",
        k("5gnsa udp ul 20m"): "Data Performance\\5G NSA DP\\Udp Test\\UL\\5G NSA_UDP Upload Task at 20 Mbps for 10 seconds",

        # Catch variations like "UDP UL 10 FOR 10" -> "UDP Upload Task at 10 Mbps for 10 seconds"
        k("5gauto udp ul 10 for 10"): "Data Performance\\5G AUTO DP\\Udp Test\\UL\\UDP Upload Task at 10 Mbps for 10 seconds",
        k("5gauto udp ul 20 for 10"): "Data Performance\\5G AUTO DP\\Udp Test\\UL\\UDP Upload Task at 20 Mbps for 10 seconds",
        
        # Test Type Mappings
        k("http ms"): "Data Performance\\{net_type} DP\\HTTP Multi Stream",
        k("http ss"): "Data Performance\\{net_type} DP\\HTTP Single Stream",
        k("ping"): "Data Performance\\{net_type} DP\\Ping",
        k("web"): "Data Performance\\{net_type} DP\\5G Auto Data Web-Kepler",
        k("playstore"): "Data Performance\\{net_type} DP\\5G Auto Data Play-store app Download",
        k("play store"): "Data Performance\\{net_type} DP\\5G Auto Data Play-store app Download",
        k("udp"): "Data Performance\\{net_type} DP\\Udp Test",
        k("mobility"): "Data Performance\\{net_type} DP\\Mobility Test",
    }
    
    # Define test types that don't require DL/UL classification
    no_dl_ul_required = [
        k("ping"),
        k("web"),
        k("kepler"),
        k("mhs drive"),
        k("mhs driving")
    ]
    
    # 1. Get all CSV files recursively from source_dir
    files_to_process = []
    for root, dirs, files in os.walk(source_dir):
        for f in files:
            if f.lower().endswith('.csv'):
                files_to_process.append(os.path.join(root, f))
    
    if not files_to_process:
        print(f"No CSV files found in {source_dir}.")
        return

    print(f"Processing {len(files_to_process)} files from {source_dir}...")
    print(f"Target directory: {target_dir}")

    moved_count = 0
    not_found_count = 0

    for file_path in files_to_process:
        filename = os.path.basename(file_path)
        normalized_filename = normalize_string(filename)
        
        # Determine Network Type (AUTO vs NSA)
        net_type = "5G AUTO"
        if "nsa" in normalized_filename:
            net_type = "5G NSA"
        
        target_folder = None
        
        # 2. Check mappings - find the longest matching key
        matched_keys = [(key, template) for key, template in manual_mappings.items() if key in normalized_filename]
        
        if not matched_keys:
            print(f"[Warning] 找不到相對應的路徑: {filename}")
            not_found_count += 1
            continue
        
        # Sort by key length (descending) to get the most specific match
        matched_keys.sort(key=lambda x: len(x[0]), reverse=True)
        best_key, relative_template = matched_keys[0]
        
        relative_path = relative_template.format(net_type=net_type)
        current_target_folder = os.path.join(target_dir, relative_path)
        
        # Check if this test type requires DL/UL classification
        requires_dl_ul = best_key not in no_dl_ul_required
        
        # DL/UL Subfolder Logic (only if required)
        is_dl_ul = False
        if requires_dl_ul:
            if "dl" in normalized_filename or "downlink" in normalized_filename or "download" in normalized_filename:
                current_target_folder = os.path.join(current_target_folder, "DL")
                is_dl_ul = True
            elif "ul" in normalized_filename or "uplink" in normalized_filename or "upload" in normalized_filename:
                current_target_folder = os.path.join(current_target_folder, "UL")
                is_dl_ul = True
            
            if not is_dl_ul:
                print(f"[Warning] 無法分辨 DL 或 UL: {filename}")
                not_found_count += 1
                continue

        target_folder = current_target_folder
        
        # Rename CH01 to DUT and CH02 to REF in filename FIRST
        new_filename = filename
        if "CH01" in filename or "ch01" in filename:
            # Replace CH01 (case insensitive) with DUT
            new_filename = re.sub(r'CH01', 'DUT', new_filename, flags=re.IGNORECASE)
        elif "CH02" in filename or "ch02" in filename:
            # Replace CH02 (case insensitive) with REF
            new_filename = re.sub(r'CH02', 'REF', new_filename, flags=re.IGNORECASE)
        
        # DUT/REF Check - ensure file can be identified as DUT or REF (check renamed filename)
        normalized_new_filename = normalize_string(new_filename)
        is_dut_ref = False
        if "dut" in normalized_new_filename or "ref" in normalized_new_filename:
            is_dut_ref = True
        
        if not is_dut_ref:
            print(f"[Warning] 無法分辨 DUT 或 REF: {filename}")
            not_found_count += 1
            continue

        # Quality Subfolder Logic (L1/L2/L3)
        quality_sub = None
        if "l1" in normalized_filename: quality_sub = "Good"
        elif "l2" in normalized_filename: quality_sub = "Moderate"
        elif "l3" in normalized_filename: quality_sub = "Poor"
        
        if quality_sub:
            target_folder = os.path.join(target_folder, quality_sub)

        # 3. Move file if target found
        if target_folder:
            # Create target folder if it doesn't exist
            if not os.path.exists(target_folder):
                os.makedirs(target_folder, exist_ok=True)
                print(f"[Info] Created directory: {target_folder}")
            
            dest_path = os.path.join(target_folder, new_filename)
            try:
                # If target file exists, check before overwrite
                if os.path.exists(dest_path):
                    print(f"[Skip] '{filename}' already exists in target.")
                else:
                    shutil.move(file_path, dest_path)
                    print(f"[Success] Moved '{filename}' -> '{target_folder}'")
                    moved_count += 1
            except Exception as e:
                print(f"[Error] Failed to move '{filename}': {str(e)}")
        else:
            print(f"[Warning] 找不到相對應的路徑: {filename}")
            not_found_count += 1

    print("\nSummary:")
    print(f"Total files processed: {len(files_to_process)}")
    print(f"Files moved: {moved_count}")
    print(f"Files not matched: {not_found_count}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Classify and move CSV files to structured directories.")
    parser.add_argument("--input", "-i", required=True, help="Input directory containing CSV files (recursively scanned).")
    parser.add_argument("--output", "-o", required=True, help="Output root directory where files will be organized.")
    
    args = parser.parse_args()
    
    classify_files(args.input, args.output)
