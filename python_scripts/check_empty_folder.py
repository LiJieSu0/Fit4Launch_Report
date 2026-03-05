import os
import argparse
from pathlib import Path

def check_empty_folders(root_path):
    """
    Checks for 'empty' folders based on the criteria:
    1. If a folder contains any subfolders, it is NOT empty.
    2. If a folder contains no subfolders AND no CSV files, it is considered EMPTY.
    
    Args:
        root_path (str): The path to the directory to check.
        
    Returns:
        list: A list of paths that are considered empty.
    """
    empty_folders = []
    
    # os.walk traverses top-down by default
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Criterion 1: If it has subfolders, it's not empty
        if dirnames:
            continue
            
        # Criterion 2: If it has no subfolders, check for CSV files
        # We check if any file ends with .csv (case-insensitive)
        has_csv = any(f.lower().endswith('.csv') for f in filenames)
        
        if not has_csv:
            empty_folders.append(dirpath)
            
    return empty_folders

def main():
    parser = argparse.ArgumentParser(description="Check for empty folders (no subfolders and no CSV files).")
    parser.add_argument("path", nargs="?", default=".", help="The root directory to check (default: current directory)")
    parser.add_argument("--delete", action="store_true", help="Delete the empty folders found")
    
    args = parser.parse_args()
    
    root_path = os.path.abspath(args.path)
    
    if not os.path.exists(root_path):
        print(f"Error: Path '{root_path}' does not exist.")
        return

    print(f"Checking folders in: {root_path}")
    print("-" * 50)
    
    empty_folders = check_empty_folders(root_path)
    
    if not empty_folders:
        print("No empty folders found.")
    else:
        print(f"Found {len(empty_folders)} empty folders:")
        for folder in empty_folders:
            print(f"- {folder}")
            
        if args.delete:
            confirm = input("\nAre you sure you want to delete these folders? (y/n): ")
            if confirm.lower() == 'y':
                for folder in empty_folders:
                    try:
                        os.rmdir(folder)
                        print(f"Deleted: {folder}")
                    except Exception as e:
                        print(f"Error deleting {folder}: {e}")
            else:
                print("Deletion cancelled.")

if __name__ == "__main__":
    main()
