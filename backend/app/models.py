from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class FileMeta(BaseModel):
    file_name: str
    upload_date: datetime = Field(default_factory=datetime.utcnow)


class FieldData(BaseModel):
    answer: str
    sources: str
    reasoning: str


class DetailedSummary(BaseModel):
    answer: str
    sources: str
    reasoning: str


class Summary(BaseModel):
    detailed_summary: DetailedSummary
    key_points: str
    abstract: FieldData
    keywords: FieldData


class MLResponse(BaseModel):
    title: FieldData
    author: FieldData
    summary: Summary
    file_id: Optional[str] = None
    processed_at: Optional[datetime] = None


class FileMeta(BaseModel):
    file_name: str
    upload_date: datetime


class PaperSimilarity(BaseModel):
    source_paper_id: str
    target_paper_id: str
    keyword_similarity: float
    title_similarity: float
    summary_similarity: float
    computed_at: datetime = Field(default_factory=datetime.utcnow)
