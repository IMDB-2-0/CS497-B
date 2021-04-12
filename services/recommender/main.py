from fastapi import FastAPI
from api.recommender import recommender
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url='/api/v1/recommender/openapi.json', docs_url='/api/v1/recommender/docs')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(recommender, prefix = '/api/v1/recommender')