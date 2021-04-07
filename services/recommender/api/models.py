from typing import List, Optional
from pydantic import BaseModel

# TODO: Temporary models 

class Movie(BaseModel):
    name: str

class RecommenderIn(BaseModel):
    user: str
    movies_liked: Optional[List[Movie]] = None

class RecommenderOut(BaseModel):
    # Should technically be a list of movies --> movies: List[Movie]
    # For now, it's temporarily a string
    movie: str