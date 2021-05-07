[![Dashboard CI](https://github.com/IMDB-2-0/CS497-B/actions/workflows/node.js.yml/badge.svg)](https://github.com/IMDB-2-0/CS497-B/actions/workflows/node.js.yml)

# COMPSCI 497S - Team B

Our project is to create a service to a recommender system for
movies based on your personal tastes. Our project
combines our interests in scalable web systems, data science, 
and information retrieval to help imitate modern systems. 

Here are some of our goals:
1. Develop a dashboard of user recommendations
    - Display movies where users can rate and search through movies to obtain accurate recommendations. We'll need [the Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) to grab information on movies, such as their titles, posters, and more. 
2. Movie Recommendation Engine in Spark
    - Utilize collaborative filtering and an Alternative Least Squares model approach via PySpark to recommend movies based on previous user preferences and ratings. We'll be using the [MovieLens 25M dataset](https://grouplens.org/datasets/movielens/25m/) to train our movie data. 
3. Login/Authentication & User Management
    - Provide a basic authentication and user management system that a user can
update their information. It's important for users to have some of
these features for reasons related to customization and security.

## Installation

First, the required datasets will be downloaded. This includes:
- The MovieLens dataset
- [Transformed ratings](https://drive.google.com/file/d/1ZuEv1fJrsnuk64iauUSPqtChaViwhS8l/view?usp=sharing) (to account for our like and dislike system)

You can run the following commands to download the scripts and place them into their correct destinations:

``` bash
make
```

If you would like to download the files manually, make sure they are stored in the proper directories:

- MovieLens: `./services/database/data/ml-25m`
- Ratings: `./services/recommender/data`

Afterwards, change the working directory to the `services` folder and run:

``` bash
docker-compose up --build -d
```

This ensures you have the latest build and you can interact with your terminal while our application is running in the background. 

## Exemplar files:

- P1:

    - [Docker (by Abhinav Tripathy)](/exemplars/P1/docker)

    - [Flask (by Timothy Nguyen)](/exemplars/P1/flask)

    - [Express.js (by Hans Quiogue)](/exemplars/P1/node-express)

    - [React (by Timothy Nguyen)](/exemplars/P1/react)

    - [Postgres Schema (by Eric Trimble)](/exemplars/P1/postgres)

- P2: 

    - [Pipenv (by Hans Quiogue)](/exemplars/P2/pipenv)

    - [Postgres Initialization (by Eric Trimble)](/exemplars/P2/postgres)

    - [Redux (by Timothy Nguyen)](/exemplars/P2/redux)

    - [TMDB API (by Timothy Nguyen)](/exemplars/P2/tmdb-api)
    
    - [Docker (by Abhinav Tripathy)](/exemplars/P2/docker)

    - [Auth (by Robin Lovell)](/exemplars/P2/auth)