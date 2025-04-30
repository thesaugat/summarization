from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class FileMeta(BaseModel):
    file_name: str
    upload_date: datetime = Field(default_factory=datetime.utcnow)


class MLResult(BaseModel):
    file_id: str
    title: Optional[str]
    author: Optional[str]
    summary: Optional[str]
    summary_parts: Optional[List[str]]
    references: Optional[List[str]]
    citations: Optional[List[str]]
    keywords: Optional[List[str]]
    related_paper_ids: Optional[List[str]]
