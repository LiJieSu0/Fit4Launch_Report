from abc import ABC, abstractmethod
import logging

class BaseAnalyzer(ABC):
    def __init__(self, config, logger=None):
        self.config = config
        self.logger = logger or logging.getLogger(self.__class__.__name__)

    @abstractmethod
    def analyze(self, *args, **kwargs):
        """Perform the analysis."""
        pass

    @abstractmethod
    def validate(self, *args, **kwargs):
        """Validate the input data or results."""
        pass

    @abstractmethod
    def export(self, results, output_path):
        """Export the results to a file."""
        pass
