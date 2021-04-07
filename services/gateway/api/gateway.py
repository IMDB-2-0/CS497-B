from typing import List
from fastapi import Header, APIRouter
import httpx, os

from api.models import User, Movie

gateway = APIRouter()

# TODO: Temporary route 'communicating' with other services
# Remove / edit after
@gateway.get('/', status_code=200)
async def index():
    return { 'message': 'Message sent from gateway server!' }


@gateway.post('/recommender', response_model=Movie, status_code=200)
async def recommender(payload: User):
    payload = payload.dict()
    host = get_host('recommender')

    async with httpx.AsyncClient() as client:
        # Sends requests to recommender service
        response = await client.post('http://' + host + ':5000/api/v1/recommender/movie', json=payload)
        response.raise_for_status()
        return response.json()


def get_host(service: str):
    '''
    Retrieves the host. (Helps with debugging locally)

    - Arguments:
        - service: a Docker service

    - Returns:
        a string of either localhost or a Docker service 
    '''
    inside_docker = os.environ.get('IS_DOCKER_CONTAINER', False)
    return service if inside_docker else 'localhost'