import os
import re
import argparse

def clean_filename(filename):
    """
    Removes 'DUT' and 'REF' fields from the end of the filename.
    
    Example:
    '_20260124_183610_CH02_DUT_TMO-AUTO_HTTP SS DL_NJ DUT REF_L3.csv'
    -> '_20260124_183610_CH02_DUT_TMO-AUTO_HTTP SS DL_NJ_L3.csv'
    """
    # Regex breakdown:
    # (.*?) - Group 1: The prefix we want to keep.
    # [ _]+(?:DUT|REF)(?:[ _]+(?:DUT|REF))* - Matches " DUT", " REF", " DUT REF", " REF DUT" with spaces or underscores.
    # (_[A-Z0-9]+)? - Group 2 (Optional): A suffix like _L3 or _L2.
    # (\.[^.]+)?$ - Group 3 (Optional): File extension.
    
    # We want to match DUT/REF that are preceded by a space or underscore and followed by either 
    # the suffix (_L3) or the end of the filename (extension).
    
    pattern = r"(.*?)[ _]+(?:DUT|REF)(?:[ _]+(?:DUT|REF))*(?=(_[A-Z0-9]+)?(?:\.[^.]+)?$)"
    
    match = re.search(pattern, filename)
    if match:
        prefix = match.group(1)
        # Find the rest of the string after the match to keep suffix and extension
        remainder = filename[match.end():]
        return prefix + remainder
    
    return filename

def process_directory(root_path, dry_run=False):
    """
    Recursively walks through the root_path and renames files.
    """
    if not os.path.exists(root_path):
        print(f"Error: Path '{root_path}' does not exist.")
        return

    for root, dirs, files in os.walk(root_path):
        for filename in files:
            # Skip hidden files or the script itself
            if filename.startswith('.') or filename == "remove_dut_ref.py":
                continue

            new_filename = clean_filename(filename)
            
            if new_filename != filename:
                old_filepath = os.path.join(root, filename)
                new_filepath = os.path.join(root, new_filename)
                
                if dry_run:
                    print(f"[DRY-RUN] Would rename: '{filename}' -> '{new_filename}'")
                else:
                    try:
                        # Check if target file already exists
                        if os.path.exists(new_filepath):
                            print(f"[SKIP] Target already exists: {new_filepath}")
                        else:
                            os.rename(old_filepath, new_filepath)
                            print(f"[RENAMED] {filename} -> {new_filename}")
                    except Exception as e:
                        print(f"[ERROR] Renaming {filename}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Recursively remove 'DUT' and 'REF' from the end of filenames.")
    parser.add_argument("path", help="The root directory to process.")
    parser.add_argument("--dry-run", action="store_true", help="Perform a dry run without actually renaming files.")
    
    args = parser.parse_args()
    
    process_directory(args.path, dry_run=args.dry_run)
