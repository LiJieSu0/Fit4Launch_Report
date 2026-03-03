import os
import argparse

def check_mixed_structure(root_path):
    """
    Checks if any directory contains both CSV files and subdirectories at the same level.
    """
    mixed_folders = []
    
    # Normalize path
    root_path = os.path.abspath(root_path)
    
    if not os.path.exists(root_path):
        print(f"Error: Path '{root_path}' does not exist.")
        return []

    print(f"Scanning: {root_path} ...\n")

    for root, dirs, files in os.walk(root_path):
        # Filter out common ignored folders (like .git or __pycache__)
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != '__pycache__']
        
        has_csv = any(f.lower().endswith('.csv') for f in files)
        has_subdir = len(dirs) > 0
        
        if has_csv and has_subdir:
            # Found a mixed directory
            # List CSVs and Subdirs for more context
            csv_count = sum(1 for f in files if f.lower().endswith('.csv'))
            subdir_names = dirs[:5] # Show up to 5 subdirs
            
            mixed_folders.append({
                "path": root,
                "csv_count": csv_count,
                "subdirs": dirs
            })
            
    return mixed_folders

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Check for mixed data structure (CSVs and Dirs in the same folder).")
    parser.add_argument("path", nargs="?", default=r"D:\ReportGenerator\Raw Data", help="Path to check (default: D:\\ReportGenerator\\Raw Data)")
    args = parser.parse_args()

    results = check_mixed_structure(args.path)
    
    if results:
        print("="*60)
        print("Found mixed structures (CSV files and subdirectories in the same folder):")
        print("="*60)
        for entry in results:
            print(f"\n[Mixed Folder]: {entry['path']}")
            print(f"  - CSV Files: {entry['csv_count']} file(s)")
            print(f"  - Subdirectories: {len(entry['subdirs'])} folder(s)")
            if len(entry['subdirs']) > 0:
                display_dirs = entry['subdirs'] if len(entry['subdirs']) <= 10 else entry['subdirs'][:10] + ["..."]
                print(f"    Sub-folders list: {', '.join(display_dirs)}")
        print("\n" + "="*60)
        print(f"Total mixed folders found: {len(results)}")
        print("Note: The pipeline usually expects data to be either in leaf CSV files or organized into dedicated subfolders, but rarely both at the same level (unless intentional).")
    else:
        print("No mixed structures found. Data organization looks clean at all levels.")
