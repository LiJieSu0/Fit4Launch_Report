import os
import logging
from report_generator.base_analyzer import BaseAnalyzer
from VoiceQuality.VqAmrNb import process_directory as analyze_vq_amr_nb
from VoiceQuality.audio_delay_analyzer import process_directory as analyze_audio_delay_directory
from VoiceQuality.VqAmrWb import analyze_wb_voice_quality as analyze_vq_amr_wb
from VoiceQuality.VQEVSanalyzer import analyze_vqe_vs_quality

class VoiceQualityAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, directory_path: str):
        self.logger.info(f"Analyzing Voice Quality directory: {directory_path}")
        
        if not os.path.isdir(directory_path):
            self.logger.error(f"Directory not found: {directory_path}")
            return None

        results = {}
        
        for sub_dir_name in os.listdir(directory_path):
            sub_dir_full_path = os.path.join(directory_path, sub_dir_name)
            
            if os.path.isdir(sub_dir_full_path):
                self.logger.info(f"Processing Voice Quality subfolder: {sub_dir_name}")
                
                if "5G Auto VoNR Enabled AMR NB VQ" in sub_dir_name:
                    results[sub_dir_name] = {}
                    subfolders = ['Base', 'Mobile']
                    for subfolder in subfolders:
                        subfolder_path = os.path.join(sub_dir_full_path, subfolder)
                        if os.path.isdir(subfolder_path):
                            nb_vq_results = analyze_vq_amr_nb(subfolder_path)
                            if nb_vq_results:
                                organized_nb_vq_results = {}
                                for file_stats in nb_vq_results:
                                    device_type = file_stats["device_type"]
                                    new_data = {
                                        "ul_mos_stats": file_stats["ul_mos_stats"],
                                        "dl_mos_stats": file_stats["dl_mos_stats"],
                                        "UL MOS ATTN": file_stats.get("UL MOS ATTN", "N/A"),
                                        "DL MOS ATTN": file_stats.get("DL MOS ATTN", "N/A"),
                                        "INPUT LEVEL": file_stats.get("INPUT LEVEL", "N/A"),
                                        "OUTPUT LEVEL": file_stats.get("OUTPUT LEVEL", "N/A")
                                    }
                                    
                                    if device_type not in organized_nb_vq_results:
                                        organized_nb_vq_results[device_type] = new_data
                                    else:
                                        # Merge logic: combine existing and new data
                                        existing = organized_nb_vq_results[device_type]
                                        merged = {}
                                        
                                        for stat_type in ["ul_mos_stats", "dl_mos_stats"]:
                                            e_s = existing[stat_type]
                                            n_s = file_stats[stat_type]
                                            total_count = e_s["count"] + n_s["count"]
                                            
                                            if total_count > 0:
                                                merged_stat = {
                                                    "count": total_count,
                                                    "mean": round((e_s["mean"] * e_s["count"] + n_s["mean"] * n_s["count"]) / total_count, 4),
                                                    "std_dev": round((e_s["std_dev"] * e_s["count"] + n_s["std_dev"] * n_s["count"]) / total_count, 4), # Approximation
                                                    "max": max(e_s["max"], n_s["max"]),
                                                    "min": min(e_s["min"], n_s["min"]) if e_s["min"] > 0 and n_s["min"] > 0 else (e_s["min"] or n_s["min"]),
                                                    "% MOS < 2.0": round((e_s["% MOS < 2.0"] * e_s["count"] + n_s["% MOS < 2.0"] * n_s["count"]) / total_count, 4),
                                                    "% MOS < 3.0": round((e_s["% MOS < 3.0"] * e_s["count"] + n_s["% MOS < 3.0"] * n_s["count"]) / total_count, 4)
                                                }
                                            else:
                                                merged_stat = e_s
                                            merged[stat_type] = merged_stat
                                            
                                        # Merge extra metrics (Weighted average based on MOS count)
                                        for extra in ["UL MOS ATTN", "DL MOS ATTN", "INPUT LEVEL", "OUTPUT LEVEL"]:
                                            e_v = existing[extra]
                                            n_v = file_stats.get(extra, "N/A")
                                            
                                            # Use DL MOS count for DL metrics, UL MOS count for UL metrics/levels
                                            weight_stat = "dl_mos_stats" if "DL" in extra else "ul_mos_stats"
                                            e_c = existing[weight_stat]["count"]
                                            n_c = file_stats[weight_stat]["count"]
                                            
                                            if e_v != "N/A" and n_v != "N/A":
                                                total_c = e_c + n_c
                                                if total_c > 0:
                                                    merged[extra] = round((e_v * e_c + n_v * n_c) / total_c, 4)
                                                else:
                                                    merged[extra] = e_v
                                            elif e_v != "N/A":
                                                merged[extra] = e_v
                                            else:
                                                merged[extra] = n_v
                                                
                                        organized_nb_vq_results[device_type] = merged
                                results[sub_dir_name][subfolder] = organized_nb_vq_results
                        else:
                            # Handle case where files might be directly in the sub_dir_full_path
                            nb_vq_results = analyze_vq_amr_nb(sub_dir_full_path)
                            if nb_vq_results:
                                organized_nb_vq_results = {}
                                for file_stats in nb_vq_results:
                                    device_type = file_stats["device_type"]
                                    new_data = {
                                        "ul_mos_stats": file_stats["ul_mos_stats"],
                                        "dl_mos_stats": file_stats["dl_mos_stats"],
                                        "UL MOS ATTN": file_stats.get("UL MOS ATTN", "N/A"),
                                        "DL MOS ATTN": file_stats.get("DL MOS ATTN", "N/A"),
                                        "INPUT LEVEL": file_stats.get("INPUT LEVEL", "N/A"),
                                        "OUTPUT LEVEL": file_stats.get("OUTPUT LEVEL", "N/A")
                                    }
                                    if device_type not in organized_nb_vq_results:
                                        organized_nb_vq_results[device_type] = new_data
                                    else:
                                        # (Same merge logic as above - refactored to be dryer if possible, but keeping it simple for now)
                                        existing = organized_nb_vq_results[device_type]
                                        merged = {}
                                        for stat_type in ["ul_mos_stats", "dl_mos_stats"]:
                                            e_s = existing[stat_type]; n_s = file_stats[stat_type]
                                            total_count = e_s["count"] + n_s["count"]
                                            if total_count > 0:
                                                merged[stat_type] = {
                                                    "count": total_count,
                                                    "mean": round((e_s["mean"] * e_s["count"] + n_s["mean"] * n_s["count"]) / total_count, 4),
                                                    "std_dev": round((e_s["std_dev"] * e_s["count"] + n_s["std_dev"] * n_s["count"]) / total_count, 4),
                                                    "max": max(e_s["max"], n_s["max"]),
                                                    "min": min(e_s["min"], n_s["min"]) if e_s["min"] > 0 and n_s["min"] > 0 else (e_s["min"] or n_s["min"]),
                                                    "% MOS < 2.0": round((e_s["% MOS < 2.0"] * e_s["count"] + n_s["% MOS < 2.0"] * n_s["count"]) / total_count, 4),
                                                    "% MOS < 3.0": round((e_s["% MOS < 3.0"] * e_s["count"] + n_s["% MOS < 3.0"] * n_s["count"]) / total_count, 4)
                                                }
                                            else: merged[stat_type] = e_s
                                        for extra in ["UL MOS ATTN", "DL MOS ATTN", "INPUT LEVEL", "OUTPUT LEVEL"]:
                                            e_v = existing[extra]; n_v = file_stats.get(extra, "N/A")
                                            weight_stat = "dl_mos_stats" if "DL" in extra else "ul_mos_stats"
                                            e_c = existing[weight_stat]["count"]; n_c = file_stats[weight_stat]["count"]
                                            if e_v != "N/A" and n_v != "N/A":
                                                total_c = e_c + n_c
                                                merged[extra] = round((e_v * e_c + n_v * n_c) / total_c, 4) if total_c > 0 else e_v
                                            elif e_v != "N/A": merged[extra] = e_v
                                            else: merged[extra] = n_v
                                        organized_nb_vq_results[device_type] = merged
                                results[sub_dir_name].update(organized_nb_vq_results)

                            break # No need to check other subfolders if we processed files at this level

                elif "Audio Delay" in sub_dir_name:
                    ad_results = analyze_audio_delay_directory(sub_dir_full_path, subdir_filter="Audio Delay")
                    if ad_results:
                        organized_ad_results = {}
                        for file_stats in ad_results:
                            if file_stats["device_type"] not in organized_ad_results:
                                organized_ad_results[file_stats["device_type"]] = {}
                            organized_ad_results[file_stats["device_type"]][os.path.splitext(os.path.basename(file_stats["file_path"]))[0]] = {
                                "mean": file_stats["mean"],
                                "std_dev": file_stats["std_dev"],
                                "min": file_stats["min"],
                                "max": file_stats["max"],
                                "occurrences": file_stats["occurrences"]
                            }
                        results[sub_dir_name] = organized_ad_results

                elif "5G Auto VoNR Enabled AMR WB VQ" in sub_dir_name:
                    wb_vq_results = analyze_vq_amr_wb(sub_dir_full_path)
                    if wb_vq_results:
                        results[sub_dir_name] = wb_vq_results

                elif "EVS WB VQ" in sub_dir_name:
                    evs_vq_results = analyze_vqe_vs_quality([sub_dir_full_path])
                    if evs_vq_results:
                        results.update(evs_vq_results)
        
        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"Voice Quality results exported to {output_path}")
