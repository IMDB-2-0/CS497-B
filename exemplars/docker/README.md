# Exemplar: Docker & Docker-compose 

[Docker](https://www.docker.com/) is a technology that allows OS level virtualization and allows for building containers which are isolatied environments to run applications. 

## Docker Compose for Flask(with Gunicorn) & Nginx & Postgres

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

## Docker compose for NodeJS & MongoDB

```
version: '3'

services:
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_USERNAME=$MONGO_USERNAME
      - MONGO_PASSWORD=$MONGO_PASSWORD
      - MONGO_HOSTNAME=db
      - MONGO_PORT=$MONGO_PORT
      - MONGO_DB=$MONGO_DB
    ports:
      - "80:8080"
    volumes:
      - .:/home/node/app
      - node_modules:/home/node/app/node_modules
    networks:
      - app-network
    command: ./wait-for.sh db:27017 -- /home/node/app/node_modules/.bin/nodemon app.js

  db:
    image: mongo:4.1.8-xenial
    container_name: db
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
      - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
    volumes:
      - dbdata:/data/db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  dbdata:
  node_modules:
```

