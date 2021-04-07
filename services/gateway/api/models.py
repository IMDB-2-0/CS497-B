from typing import List
from pydantic import BaseModel

class Movie(BaseModel):
    name: str
    casts: List[str]