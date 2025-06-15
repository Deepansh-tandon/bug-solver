from pydantic import BaseModel
from typing import List

class Match(BaseModel):
    title: str
    url: str
    content: str
    score: float

class SolutionResponse(BaseModel):
    source: str  # "vector-db" or "live-fetch"
    summary: str
    matches: List[Match]