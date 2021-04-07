from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    user: str

class Movie(BaseModel):
    movie: str