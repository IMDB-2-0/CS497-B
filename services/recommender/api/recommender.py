from random import randint

from typing import List
from fastapi import Header, APIRouter

from api.models import RecommenderIn, RecommenderOut
import api.db as db

recommender = APIRouter()

# TODO: Use actual recommendation system
@recommender.post('/movie', response_model=RecommenderOut, status_code = 200)
async def recommend_movie(payload: RecommenderIn = None):
    payload = payload.dict()

    print('- Movie recommendation requested by "' + payload['user'] + '"')

    # Retrieves a 'recommended movie' for a user
    selected_movie = db.movie_data[randint(0, len(db.movie_data)) - 1]
    
    return { 'movie': selected_movie }