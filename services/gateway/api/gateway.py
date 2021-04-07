from typing import List
from fastapi import Header, APIRouter

from api.models import Movie

gateway = APIRouter()

@gateway.get('/', status_code=200)
async def index():
    return { 'message': 'Message sent from server!' }