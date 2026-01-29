import os
import shutil
import re

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

def classify_files():
    source_dir = r"D:\ReportGenerator\Raw Data\DataStructureFolder\DataPerformance_sea"
    target_root = r"D:\ReportGenerator\Raw Data\DataStructureFolder"
    
    # Manual keyword to folder path mappings
    # Keys should be normalized (lowercase, no spaces/special chars EXCEPT for specific keywords I might rely on, 
    # but my normalized_filename has no spaces. So keys here should effectively be "5gautomshttp" etc.
    # WAIT: normalize_string returns "5gautomshttp...".
    # So my keys in manual_mappings MUST match that format.
    
    # helper to make readable keys
    def k(s): return normalize_string(s)

    manual_mappings = {
        k("5ga_app dl"): "Data Performance\\5G AUTO DP\\5G Auto Data Play-store app Download",
        k("5ga_web page"): "Data Performance\\5G AUTO DP\\5G Auto Data Web-Kepler",
        k("5gn_app dl"): "Data Performance\\5G NSA DP\\5G NSA Data Play-store app Download",
        k("5gn_web page"): "Data Performance\\5G NSA DP\\5G NSA Data Web-Kepler",
        k("mhs"): "Data Performance\\5G AUTO DP\\Mobile Hotspot Test",
        
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
    }

    if not os.path.exists(source_dir):
        print(f"[Error] Source directory {source_dir} does not exist.")
        return

    # 1. Gather all subdirectories in target_root
    all_folders = []
    for root, dirs, files in os.walk(target_root):
        if os.path.abspath(root) != os.path.abspath(source_dir):
            all_folders.append(root)

    print(f"Scanning {len(all_folders)} folders for potential matches...")

    # 2. Get all CSV files in source_dir
    files_to_move = [f for f in os.listdir(source_dir) if f.endswith('.csv')]
    
    if not files_to_move:
        print(f"No CSV files found in {source_dir}.")
        return

    moved_count = 0
    not_found_count = 0

    for filename in files_to_move:
        file_path = os.path.join(source_dir, filename)
        normalized_filename = normalize_string(filename)
        
        target_folder = None
        
        # 3. Check manual mappings first
        for key, relative_path in manual_mappings.items():
            if key in normalized_filename: # key is already normalized
                possible_target = os.path.join(target_root, relative_path)
                
                # Quality Subfolder Logic (L1/L2/L3)
                if "udp" in key:
                    quality_sub = None
                    if "l1" in normalized_filename: quality_sub = "Good"
                    elif "l2" in normalized_filename: quality_sub = "Moderate"
                    elif "l3" in normalized_filename: quality_sub = "Poor"
                    
                    if quality_sub:
                         possible_quality_target = os.path.join(possible_target, quality_sub)
                         if os.path.exists(possible_quality_target):
                             possible_target = possible_quality_target
                
                if os.path.exists(possible_target):
                    target_folder = possible_target
                    break
        
        # 4. If no manual mapping or folder doesn't exist, search through folder tree
        if not target_folder:
            potential_matches = []
            for folder_path in all_folders:
                folder_name = os.path.basename(folder_path)
                if not folder_name: continue
                
                normalized_folder = normalize_string(folder_name)
                
                # We want to match folders with meaningful names (longer than 3 chars)
                if len(normalized_folder) > 3 and normalized_folder in normalized_filename:
                    potential_matches.append(folder_path)
            
            if potential_matches:
                # Pick the deepest path (most segments) as it's likely the specific test task
                target_folder = max(potential_matches, key=lambda p: (len(p.split(os.sep)), len(os.path.basename(p))))

        # 5. Move file if target found
        if target_folder:
            dest_path = os.path.join(target_folder, filename)
            try:
                shutil.move(file_path, dest_path)
                print(f"[Success] Moved '{filename}' to '{os.path.relpath(target_folder, target_root)}'")
                moved_count += 1
            except Exception as e:
                print(f"[Error] Failed to move '{filename}': {str(e)}")
        else:
            # For debugging, maybe show the normalized filename
            # print(f"[Debug] Normalized: {normalized_filename}")
            print(f"[Warning] 找不到相對應的路徑: {filename}")
            not_found_count += 1

    print("\nSummary:")
    print(f"Total files processed: {len(files_to_move)}")
    print(f"Files moved: {moved_count}")
    print(f"Files not matched: {not_found_count}")

if __name__ == "__main__":
    classify_files()


