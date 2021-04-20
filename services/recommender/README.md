# Recommender Service

## Current Owner: Hans Quiogue

Our team create a recommender system with [PySpark's machine learning API](https://spark.apache.org/docs/2.3.1/api/python/pyspark.ml.html) and FastAPI 
to send and recieve requests for a client. We used a collaborative filtering (CF) and an Alternating Least Squares (ALS) model approach for two reasons:
CF is based on past user behavior—which is perfect for our user movie ratings we'll be using for training and testing, and ALS is perfect for
working with large sparse matricies (essentially user movie ratings) and creating and fitting accurate recommendations. 

We used PySpark—for its machine learning API 
and compatibility with SQL—and FastAPI—for its support in asynchronous calls, convenient API documentation, and compatibility with PySpark being a Python-based framework. 
At some point if possible, we may want to tune our ALS parameters, and fit and compare more models to obtain the most accurate recommendations. 
We may also want to use Spark Streaming for real time data processing and allow faster recommendations to our users.

## Installation and Build

Like our other services, you can access the recommender service by calling `docker-compose up`.

You'll be able to access the API via `localhost:5050/api/v1/recommender/`. You may view the docs feature FastAPI has through: `localhost:5050/api/v1/recommender/docs`

## API

**GET Requests**

- **Simple server status**: `/api/v1/recommender/status`

*Retrieves the status of the service and sends a message to the client of the server status.*

- Returns:

  - A JSON file of the server status.

- **Movie recommendations**: `/api/v1/recommender/movie`

*Makes a movie recommendation for a user.*

- Queries:

  - userID (required): a user's ID in our application

- Returns:

  - A JSON file containing the status of the request and a list of recommended movies for a specified user.
