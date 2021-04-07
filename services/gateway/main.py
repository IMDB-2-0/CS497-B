from fastapi import FastAPI
from api.gateway import gateway
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url='/api/v1/openapi.json', docs_url='/api/v1/docs')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(gateway, prefix = '/api/v1')