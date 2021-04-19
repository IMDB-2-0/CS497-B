from pyspark.ml.recommendation import ALSModel
from pyspark.sql import Row

from api.sparkSession import spark, links, movies
from api.models import RatingsIn
import pandas as pd
from typing import List


def get_alias(predictions, links, movies):
    r = predictions.alias('r')
    l = links.alias('l')
    m = movies.alias('m')
    return (r, l, m)

def join_tables(predictions, links, movies):
    r, l, m = get_alias(predictions, links, movies)
    return r.join(l, r.movieid == l.movieid) \
            .join(m, m.movieid == l.movieid)

async def recommender(user_ratings: RatingsIn):
    # Loads fitted model
    model = ALSModel.load('temp-fitted-model')
    # Converts HTTP response of user ratings to Spark DataFrame
    data = spark.createDataFrame(Row(**x) for x in user_ratings)
    # Creates prediction for a user
    predictions = model.transform(data.select(['userid', 'movieid']))

    # Joined results based on prediction
    results = join_tables(predictions, links, movies)
    # Selects rows we need for response
    results = results.orderBy('prediction', ascending = False) \
                     .select(['r.movieid', 'm.title', 'l.imdbid', 'l.tmdbid'])
    
    # Returns DataFrame results as a list of objects
    return results.rdd.map(lambda row: row.asDict()).collect()