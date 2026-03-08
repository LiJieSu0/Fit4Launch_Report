import os
import argparse

def check_mixed_structure(root_path):
    """
    Checks for:
    1. Directories containing both CSV files and subdirectories.
    2. Leaf directories (no subdirectories) containing an odd number of CSV files.
    """
    mixed_folders = []
    odd_leaf_folders = []
    
    # Normalize path
    root_path = os.path.abspath(root_path)
    
    if not os.path.exists(root_path):
        print(f"Error: Path '{root_path}' does not exist.")
        return [], []

    print(f"Scanning: {root_path} ...\n")

    for root, dirs, files in os.walk(root_path):
        # Filter out common ignored folders
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != '__pycache__']
        
        csv_files = [f for f in files if f.lower().endswith('.csv')]
        csv_count = len(csv_files)
        has_csv = csv_count > 0
        has_subdir = len(dirs) > 0
        
        if has_subdir:
            if has_csv:
                # Found a mixed directory
                mixed_folders.append({
                    "path": root,
                    "csv_count": csv_count,
                    "subdirs": dirs
                })
        else:
            # Leaf folder (no subdirectories)
            if csv_count % 2 != 0:
                # Odd number of CSV files in a leaf folder
                odd_leaf_folders.append({
                    "path": root,
                    "csv_count": csv_count,
                    "files": csv_files
                })
            
    return mixed_folders, odd_leaf_folders

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Check for mixed data structure and odd file counts.")
    parser.add_argument("path", nargs="?", default=r"D:\ReportGenerator\Raw Data", help="Path to check (default: D:\\ReportGenerator\\Raw Data)")
    args = parser.parse_args()

    mixed, odd = check_mixed_structure(args.path)
    
    if mixed:
        print("="*60)
        print("Found mixed structures (CSV files and subdirectories in the same folder):")
        print("="*60)
        for entry in mixed:
            print(f"\n[Mixed Folder]: {entry['path']}")
            print(f"  - CSV Files: {entry['csv_count']} file(s)")
            print(f"  - Subdirectories: {len(entry['subdirs'])} folder(s)")
            if len(entry['subdirs']) > 0:
                display_dirs = entry['subdirs'] if len(entry['subdirs']) <= 10 else entry['subdirs'][:10] + ["..."]
                print(f"    Sub-folders list: {', '.join(display_dirs)}")
        print("\n" + "="*60)

    if odd:
        print("="*60)
        print("Found leaf folders with ODD number of CSV files:")
        print("="*60)
        for entry in odd:
            print(f"\n[Odd Count Folder]: {entry['path']}")
            print(f"  - CSV Files: {entry['csv_count']} file(s)")
            display_files = entry['files'] if len(entry['files']) <= 10 else entry['files'][:10] + ["..."]
            print(f"    Files: {', '.join(display_files)}")
        print("\n" + "="*60)

    if not mixed and not odd:
        print("No issues found. Data organization looks clean and file counts are balanced.")
    else:
        print(f"Total mixed folders: {len(mixed)}")
        print(f"Total odd-count leaf folders: {len(odd)}")
        print("\nNote: Mixed folders might cause pipeline confusion. Odd file counts in leaf folders might indicate missing paired data (e.g., DUT/REF).")
