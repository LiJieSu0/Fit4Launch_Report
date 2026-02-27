import json
try:
    with open(r'd:\ReportGenerator\report-generator-app\public\AnalyzeResults\#Dry Run\Seattle\wfc_performance_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        wfc = data.get('WFC', {})
        print("WFC Keys:", wfc.keys())
except Exception as e:
    print(e)
