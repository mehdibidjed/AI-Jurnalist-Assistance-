from abc import ABC, abstractmethod
from typing import List, Optional

from backend.app.domain.entities.source import Source, SourceType


class SourceRepository(ABC):
    """Repository interface for Source persistence"""
    
    @abstractmethod
    def save(self, source: Source) -> Source:
        """Save a source"""
        pass
    
    @abstractmethod
    def update(self, source: Source) -> Source:
        """Update an existing source"""
        pass
    
    @abstractmethod
    def find_by_type(self, source_type: SourceType, active_only: bool = True) -> List[Source]:
        """Find sources by type"""
        pass
    
    @abstractmethod
    def find_by_id(self, source_id: str) -> Optional[Source]:
        """Find source by ID"""
        pass
