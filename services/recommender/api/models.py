from typing import List, Optional
from pydantic import BaseModel

class RatingsIn(BaseModel):
    userid: int
    movieid: int
    rating: str # TODO (Incorrect types)
    timestamp: str # TODO (Incorrect types)

class RatingsOut(BaseModel):
    movieid: int
    title: str
    imdbid: int
    tmdbid: int

class RecommenderOut(BaseModel):
    message: str
    data: List[RatingsOut]