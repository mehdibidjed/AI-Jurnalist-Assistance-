from PIL import Image
import torchvision.transforms as T
from backend.app.domain.value_object.VisionInputSpec import VisionInputSpec

class ImagePreprocessor:

    def __init__(self, spec: VisionInputSpec):
        self.transform = T.Compose([
            T.Resize((spec.height, spec.width)),
            T.ToTensor(),
            T.Normalize(mean=spec.mean, std=spec.std)
        ])

    def preprocess(
            self, image: Image.Image):
        return self.transform(image).unsqueeze(0)