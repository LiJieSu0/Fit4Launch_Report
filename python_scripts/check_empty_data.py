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

def main(output_dir):
    json_files_to_check = [
        "data_performance_results.json",
        "call_performance_results.json",
        "voice_quality_results.json",
        "coverage_performance_results.json"
    ]
    output_file_path = os.path.join(output_dir, "Empty_Json.txt")

    with open(output_file_path, 'w', encoding='utf-8') as out_f:
        all_empty_collections = []
        for json_filename in json_files_to_check:
            json_file_path = os.path.join(output_dir, json_filename)
            try:
                with open(json_file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                print(f"Checking '{json_file_path}' for empty collections...")
                empty_collections = check_empty_collections(data, path_parts=[json_filename])
                if empty_collections:
                    all_empty_collections.extend(empty_collections)
                
            except FileNotFoundError:
                print(f"Error: The file '{json_file_path}' was not found.")
                out_f.write(f"Error: The file '{json_file_path}' was not found.\n")
            except json.JSONDecodeError:
                print(f"Error: Could not decode JSON from '{json_file_path}'. Check file format.")
                out_f.write(f"Error: Could not decode JSON from '{json_file_path}'. Check file format.\n")
            except Exception as e:
                print(f"An unexpected error occurred with {json_file_path}: {e}")
                out_f.write(f"An unexpected error occurred with {json_file_path}: {e}\n")
        
        if all_empty_collections:
            out_f.write("\nSummary of Empty collections found in JSON files:\n")
            for item_path in all_empty_collections:
                for i, part in enumerate(item_path):
                    out_f.write("    " * i + f"- {part}\n")
            print(f"Empty collections found. Details written to '{output_file_path}'.")
        else:
            out_f.write("No empty collections found in any JSON file.\n")
            print("No empty collections found in any JSON file.")
        
        print("Check complete.")

if __name__ == "__main__":
    # For independent testing, define a dummy output_dir
    script_dir = os.path.dirname(os.path.abspath(__file__))
    test_output_dir = os.path.join(os.path.dirname(script_dir), "TestOutput")
    os.makedirs(test_output_dir, exist_ok=True)
    main(test_output_dir)
