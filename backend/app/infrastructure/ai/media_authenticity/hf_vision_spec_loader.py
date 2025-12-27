from transformers import AutoImageProcessor
from backend.app.domain.value_object.VisionInputSpec import VisionInputSpec

class HFVisionSpecLoader:

    def load(self, model_name: str) -> VisionInputSpec:
        processor = AutoImageProcessor.from_pretrained(model_name)

        return VisionInputSpec(
            width=processor.size["width"],
            height=processor.size["height"],
            mean=processor.image_mean,
            std=processor.image_std
        )