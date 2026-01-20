import json
import os

def check_empty_collections(data, path_parts=None, empty_collections_found=None):
    """
    Recursively checks for empty dictionaries or lists within the given data.
    Stores the hierarchical path to any empty collection found.
    """
    if path_parts is None:
        path_parts = []
    if empty_collections_found is None:
        empty_collections_found = []

    if isinstance(data, dict):
        if not data:
            empty_collections_found.append(path_parts + ["Empty Dictionary"])
        for key, value in data.items():
            check_empty_collections(value, path_parts + [key], empty_collections_found)
    elif isinstance(data, list):
        if not data:
            empty_collections_found.append(path_parts + ["Empty List"])
        for index, item in enumerate(data):
            check_empty_collections(item, path_parts + [f"[{index}]"], empty_collections_found)
    return empty_collections_found

def validate_json_results(output_dir):
    """
    Checks JSON results for empty collections and returns a list of finding strings.
    """
    json_files_to_check = [
        "data_performance_results.json",
        "call_performance_results.json",
        "voice_quality_results.json",
        "coverage_performance_results.json"
    ]
    
    findings = []
    all_empty_collections = []
    
    for json_filename in json_files_to_check:
        json_file_path = os.path.join(output_dir, json_filename)
        if not os.path.exists(json_file_path):
            continue
            
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            empty_collections = check_empty_collections(data, path_parts=[json_filename])
            if empty_collections:
                all_empty_collections.extend(empty_collections)
            
        except json.JSONDecodeError:
            findings.append(f"Error: Could not decode JSON from '{json_filename}'. Check file format.")
        except Exception as e:
            findings.append(f"An unexpected error occurred with {json_filename}: {e}")
    
    if all_empty_collections:
        findings.append("Summary of Empty collections found in JSON files:")
        for item_path in all_empty_collections:
            path_str = " -> ".join(item_path)
            findings.append(f"  - {path_str}")
    
    return findings

def main(output_dir):
    """
    Main entry point for command-line usage. Now uses the new validation logic.
    """
    findings = validate_json_results(output_dir)
    if findings:
        for line in findings:
            print(line)
    else:
        print("No empty collections found in any JSON file.")
    print("Check complete.")

if __name__ == "__main__":
    # For independent testing, define a dummy output_dir
    script_dir = os.path.dirname(os.path.abspath(__file__))
    test_output_dir = os.path.join(os.path.dirname(script_dir), "Analyze Summary")
    if os.path.isdir(test_output_dir):
        main(test_output_dir)
    else:
        print(f"Directory not found: {test_output_dir}")
