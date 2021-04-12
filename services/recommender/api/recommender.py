from random import randint

from typing import List
from fastapi import Header, APIRouter
import httpx

from api.models import RecommenderIn, RecommenderOut
from api.utils import get_host

recommender = APIRouter()

@recommender.get('/status', status_code = 200)
async def status():
    return { 'message': 'Recommender service is active.' }


# TODO: Use actual recommendation system / edit endpoint name to be more specific
@recommender.post('/movie', response_model=RecommenderOut, status_code = 200)
async def recommend_movie(payload: RecommenderIn = None):
    payload = payload.dict()
    host = get_host('database-api')

    print('- Movie recommendation requested by "' + payload['user'] + '"')

    async with httpx.AsyncClient() as client:
        # TODO: Modify port? (Currently only works with Docker Compose with nginx setup..)
        response = await client.get('http://' + host + ':5000/api/v1/database/movies')
        response = response.json()

    # TODO: Update with actual recommendation engine
    selected_movie = response
    rand_id = randint(1, 30)
    selected_movie = list(filter(lambda movie: movie['mid'] == rand_id, selected_movie))

    return { 'movie': selected_movie[0]['title'] }