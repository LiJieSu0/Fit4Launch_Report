import os
import logging
from report_generator.base_analyzer import BaseAnalyzer
from DataPerformance import data_performance_statics, ping_statics

class DataPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, csv_file_path):
        """
        Analyzes data performance from one or more CSV files.
        
        Args:
            csv_file_path: Either a single file path (str) or a list of file paths (list)
        
        Returns:
            Dictionary of statistics or None
        """
        # Handle both single file and file list
        if isinstance(csv_file_path, list):
            file_paths = csv_file_path
        else:
            file_paths = [csv_file_path]
        
        # Get params from first file
        params = data_performance_statics._determine_analysis_parameters(file_paths[0])
        if params is None:
            self.logger.warning(f"Could not determine parameters for: {file_paths[0]}")
            return None

        stats = {
            "Device Type": params["device_type_detected"],
            "Network Type": params["network_type_detected"],
            "Analysis Type": params["analysis_type_detected"]
        }
        
        if params["analysis_direction_detected"]:
            stats["Analysis Direction"] = params["analysis_direction_detected"]
        if params["protocol_type_detected"]:
            stats["Protocol Type"] = params["protocol_type_detected"]

        # Throughput Analysis
        if params["protocol_type_detected"] in ["HTTP", "UDP"]:
            tp_stats = data_performance_statics.analyze_throughput(
                file_paths,  # Pass file list
                params["column_to_analyze_throughput"], 
                params["event_col"], 
                params["start_event"], 
                params["end_event"], 
                fallback_column_name=params["column_to_analyze_throughput_fallback"], 
                fallback_event_col_name=params["event_col_fallback"], 
                third_fallback_column_name=params["column_to_analyze_throughput_third_fallback"]
            )
            if tp_stats:
                stats["Throughput"] = tp_stats
            
            # CDF Analysis (New feature)
            cdf_stats = data_performance_statics.analyze_throughput_cdf(
                file_paths,  # Pass file list
                params["column_to_analyze_throughput"], 
                params["event_col"], 
                params["start_event"], 
                params["end_event"], 
                fallback_column_name=params["column_to_analyze_throughput_fallback"], 
                fallback_event_col_name=params["event_col_fallback"], 
                third_fallback_column_name=params["column_to_analyze_throughput_third_fallback"]
            )
            if cdf_stats:
                stats["Throughput_CDF"] = cdf_stats

        # UDP Jitter and Error Ratio
        if params["protocol_type_detected"] == "UDP":
            if params["analysis_direction_detected"] == "DL":
                jitter = data_performance_statics.analyze_jitter(file_paths, params["column_to_analyze_jitter"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
                error = data_performance_statics.analyze_error_ratio(file_paths, params["column_to_analyze_error_ratio"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            else:
                jitter = data_performance_statics.analyze_jitter(file_paths, params["column_to_analyze_ul_jitter"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
                error = data_performance_statics.analyze_error_ratio(file_paths, params["column_to_analyze_ul_error_ratio"], params["event_col"], params["start_event"], params["end_event"], fallback_event_col_name=params["event_col_fallback"])
            
            if jitter: stats["Jitter"] = jitter
            if error: stats["Error Ratio"] = error

        # Web Page Load Time
        if params["protocol_type_detected"] == "WEB_PAGE":
            web_stats = data_performance_statics.analyze_web_page_load_time(file_paths, params["event_col"], params["start_event"], params["end_event"], params["column_to_analyze_total_duration"], fallback_event_col_name=params["event_col_fallback"])
            if web_stats:
                stats["Web Page Load Time"] = web_stats

        # Ping RTT
        if params["protocol_type_detected"] == "PING":
            ping_res = ping_statics.calculate_ping_statistics(file_paths, device_type=params["device_type_detected"])
            if ping_res and "Ping RTT" in ping_res:
                stats["Ping RTT"] = ping_res["Ping RTT"]

        return stats

    def validate(self, stats) -> bool:
        if not stats:
            return False
        statistical_keys = ["Throughput", "Jitter", "Error Ratio", "Web Page Load Time", "Ping RTT"]
        return any(key in stats for key in statistical_keys)

    def export(self, results, output_path: str):
        import json
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=4)
        self.logger.info(f"Data Performance results exported to {output_path}")
