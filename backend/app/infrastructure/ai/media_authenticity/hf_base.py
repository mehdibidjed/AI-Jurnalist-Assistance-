from transformers import pipeline

class HuggingFaceDetectorBase:

    def __init__(self, model_name: str, task: str):
        self.model_name = model_name
        self.pipeline = pipeline(
            task=task,
            model=model_name,
            device=0  # set -1 for CPU
        )