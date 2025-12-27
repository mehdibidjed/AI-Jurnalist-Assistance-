from abc import ABC, abstractmethod
from backend.app.domain.value_object.media_authenticity_result import MediaAuthenticityResult

class IMediaAuthenticityService(ABC):

    @abstractmethod
    def verify(self, file_path: str) -> MediaAuthenticityResult:
        pass