# Docker - Abhinav

For this milestone, we had to figure out dockerizing all the services and also understanding persistence docker-compose. Some code exemplars:

## Postgres Init SQL File Command 

```
FROM postgres:9.4
COPY *.sql /docker-entrypoint-initdb.d/
```

## Persistence with Postgres - Docker Compose

```
postgres:
  container_name: postgres
  restart: always
  image: postgres:latest
  volumes:
    - ./database:/var/lib/postgresql
  ports:
    - 5432:5432
```

# Sample Docker Compose File

```
version: '2' # specify docker-compose version

services:
  angular: # name of the first service
    build: angular-client # specify the directory of the Dockerfile
    ports:
      - "4200:4200" # specify port forewarding

  express: #name of the second service
    build: express-server # specify the directory of the Dockerfile
    ports:
      - "3000:3000" #specify ports forewarding

  database: # name of the third service
    image: mongo # specify image to build container from
    ports:
      - "27017:27017" 
```
