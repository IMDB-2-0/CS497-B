from pyspark.sql import Row
from pyspark.sql.functions import explode, col
from pyspark.ml.recommendation import ALSModel

from api.sparkSession import spark, fitted_model, links, movies
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
    # Converts HTTP response of user ratings to Spark DataFrame
    data = spark.createDataFrame(Row(**x) for x in user_ratings)

    # Creates prediction for a user
    predictions = fitted_model.recommendForUserSubset(data, 10)
    
    # Predictions are not empty
    if predictions.count() > 0:

        predictions = predictions.withColumn('rec_exp', explode('recommendations')) \
                            .select('userid', col('rec_exp.movieid'))

        # Joined results based on prediction
        results = join_tables(predictions, links, movies)

        # Write to database
        url = 'jdbc:postgresql://postgresdb:5432/postgres'
        properties = {
            "user": "postgres",
            "password": "postgres"
        }
        newDBData = results.select('r.userid', 'm.movieid', 'tmdbid')
        newDBData.write.jdbc(url = url, table = 'recommendations', mode = 'overwrite', properties = properties)

        # Returns DataFrame results as a list of objects
        return results.rdd.map(lambda row: row.asDict()).collect()
    
    else:
        return [{
                    'movieid': -1, 'title': '',
                    'imdbid': -1, 'tmdbid': -1
                }]    