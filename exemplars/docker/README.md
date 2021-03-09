```
version: '3'

services:
  web:
    restart: always
    build: ./web
    expose:
      - "8000"
    links:
      - postgres:postgres
    volumes:
      - web-data:/usr/src/app/static
    env_file: 
      - .env
    command: gunicorn -w 2 -b :8000 app:app

  nginx:
    restart: always
    build: ./nginx
    ports:
      - "80:80"
    volumes:
      - .:/www/static
      - web-data:/usr/src/app/static
    links:
      - web:web

  postgres:
    restart: always
    image: postgres:latest
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
```