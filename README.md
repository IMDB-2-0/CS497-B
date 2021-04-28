[![Dashboard CI](https://github.com/IMDB-2-0/CS497-B/actions/workflows/node.js.yml/badge.svg)](https://github.com/IMDB-2-0/CS497-B/actions/workflows/node.js.yml)

# COMPSCI 497S - Team B

Our project is to create a service to a recommender system for
movies based on your personal tastes. Our project
combines our interests in scalable web systems, data science, 
and information retrieval to help imitate modern systems. 

Here are some of our goals:
1. Develop a dashboard of user recommendations
    - We'll need a variety of APIs to grab information on movies
(such as their titles, posters, etc). It will display movies
and users can rate movies and leave reviews.
2. Movie Recommendation Engine in Flask
    - We will initially need to train a dataset with any proposed model.
We'll be using the [MovieLens dataset](https://grouplens.org/datasets/movielens/)
to train our movie data. We'll be utilizing a ML or Deep Learning model
that we haven't decided yet to recommend information based on user preferences.
3. Login/Authentication & User Management
    - Provide a basic authentication and user management system that a user can
update their information. It's important for users to have some of
these features for reasons related to customization and security.

## Installation

Change the working directory to the `services` folder and run:

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