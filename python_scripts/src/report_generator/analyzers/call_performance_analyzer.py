import os
import logging
import pandas as pd
from collections import defaultdict
from report_generator.base_analyzer import BaseAnalyzer
from CallPerformance.call_analyze import analyze_directory, _calculate_fisher_exact_criteria, _calculate_critical_failure_count

class CallPerformanceAnalyzer(BaseAnalyzer):
    def __init__(self, config, logger):
        self.config = config
        self.logger = logger

    def analyze(self, root_directory: str):
        """
        Analyzes a root call performance directory containing multiple scenario subdirectories.
        """
        self.logger.info(f"Analyzing Call Performance root directory: {root_directory}")
        
        if not os.path.isdir(root_directory):
            self.logger.error(f"Directory not found: {root_directory}")
            return None

        results = {}
        
        # Iterate through subdirectories (scenarios)
        for sub_dir_name in os.listdir(root_directory):
            sub_dir_path = os.path.join(root_directory, sub_dir_name)
            if not os.path.isdir(sub_dir_path): continue

            dut_call_path = os.path.join(sub_dir_path, 'DUT')
            ref_call_path = os.path.join(sub_dir_path, 'REF')

            if os.path.isdir(dut_call_path) or os.path.isdir(ref_call_path):
                self.logger.info(f"Analyzing Call performance for scenario: {sub_dir_name}")
                scenario_results = {}

                if os.path.isdir(dut_call_path):
                    dut_res = analyze_directory(dut_call_path)
                    if dut_res: scenario_results['DUT'] = dut_res
                
                if os.path.isdir(ref_call_path):
                    ref_res = analyze_directory(ref_call_path)
                    if ref_res: scenario_results['REF'] = ref_res

                if 'DUT' in scenario_results and 'REF' in scenario_results:
                    dr = scenario_results['DUT']
                    rr = scenario_results['REF']
                    _, p_init = _calculate_fisher_exact_criteria(
                        dr['total_initiation_failures'], dr['total_attempts'] - dr['total_initiation_failures'],
                        rr['total_initiation_failures'], rr['total_attempts'] - rr['total_initiation_failures'],
                        criteria_type="MO/MT"
                    )
                    if p_init is not None: scenario_results['initiation_p_value'] = p_init
                    
                    _, p_ret = _calculate_fisher_exact_criteria(
                        dr['total_retention_failures'], dr['total_initiation_successes'],
                        rr['total_retention_failures'], rr['total_initiation_successes'],
                        criteria_type="MO"
                    )
                    if p_ret is not None: scenario_results['retention_p_value'] = p_ret

                    initiation_critical = _calculate_critical_failure_count(
                        rr['total_initiation_failures'],
                        rr['total_attempts'] - rr['total_initiation_failures'],
                        dr['total_attempts']
                    )
                    if initiation_critical is not None:
                        scenario_results['initiation_critical_failures'] = initiation_critical

                    retention_critical = _calculate_critical_failure_count(
                        rr['total_retention_failures'],
                        rr['total_initiation_successes'],
                        dr['total_initiation_successes']
                    )
                    if retention_critical is not None:
                        scenario_results['retention_critical_failures'] = retention_critical

                if scenario_results:
                    results[sub_dir_name] = scenario_results

        return results

    def validate(self, results) -> bool:
        return bool(results)

    def export(self, results, output_path: str):
        with open(output_path, 'w') as f:
            import json
            json.dump(results, f, indent=4)
        self.logger.info(f"Call Performance results exported to {output_path}")
