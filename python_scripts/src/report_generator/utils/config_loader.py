import yaml
import os

class Config:
    def __init__(self, config_path="config/config.yaml"):
        # If relative path, resolve it against the project root (python_scripts/)
        if not os.path.isabs(config_path):
            # This file is in src/report_generator/utils/config_loader.py
            # Project root is 3 levels up
            project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
            config_path = os.path.join(project_root, config_path)
        
        self.config_path = config_path
        self.data = self._load_config()

    def _load_config(self):
        if not os.path.exists(self.config_path):
            raise FileNotFoundError(f"Configuration file not found at expected path: {self.config_path}\n"
                                    f"Current Working Directory: {os.getcwd()}")
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    def get(self, key, default=None):
        keys = key.split('.')
        value = self.data
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        return value
