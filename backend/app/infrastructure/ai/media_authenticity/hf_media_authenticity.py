from transformers import pipeline
from PIL import Image
from backend.app.domain.interfaces.Imedia_authenticity_service import IMediaAuthenticityService
from backend.app.domain.entities.media_authenticity import MediaAuthenticity
from backend.app.domain.value_object.media_authenticity_result import MediaAuthenticityResult
from backend.app.infrastructure.ai.media_authenticity.hf_vision_spec_loader import HFVisionSpecLoader
from backend.app.infrastructure.ai.media_authenticity.image_preprocessor import ImagePreprocessor
import torch

class HFMediaAuthenticityService(IMediaAuthenticityService):

    def __init__(self, model_name: str):
        self.model_name = model_name
        self.pipeline = pipeline(
            task="image-classification",
            model=model_name
        )

        spec = HFVisionSpecLoader().load(model_name)
        self.preprocessor = ImagePreprocessor(spec)

    def verify(self, file_path: str) -> MediaAuthenticityResult:
        image = Image.open(file_path).convert("RGB")

        outputs = self.pipeline(image)

        top = max(outputs, key=lambda x: x["score"])
        label = top["label"].lower()
        score = top["score"]

        is_generated = "fake" in label or "generated" in label

        authenticity_score = (
            (1 - score) * 100 if is_generated else score * 100
        )

        return MediaAuthenticityResult(
            authenticity_score=round(authenticity_score, 2),
            is_generated=is_generated,
            confidence=round(score * 100, 2),
            model_name=self.model_name
        )