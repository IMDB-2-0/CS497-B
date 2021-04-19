from typing import List
from fastapi import Header, APIRouter
import httpx

from api.models import RatingsIn, RatingsOut, RecommenderOut
from api.utils import get_host

from api.recommender import recommender

routes = APIRouter()

@routes.get('/status', status_code = 200)
async def status():
    return { 'message': 'Recommender service is active.' }


@routes.get('/movie', response_model = RecommenderOut, status_code = 200)
async def recommend_movie(userID: int):
    host = get_host('database-api')

    async with httpx.AsyncClient() as client:
        response = await client.get('http://' + host + ':5000/api/v1/database/user/ratings?id=' + str(userID))
        response = response.json()

    # User has no data
    if len(response) == 0:   
        return { 
                    'message': 'No information on user.',
                    'data': [{
                        'movieid': -1, 'title': '',
                        'imdbid': -1, 'tmdbid': -1
                    }]          
                }
    # Everything okay
    else:
        recommended_movies = await recommender(response)
        return {
            'message': 'Sucess',
            'data': recommended_movies 
        }