from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALSModel

spark = SparkSession.builder \
    .config('spark.driver.extraClassPath', 'postgresql-42.2.19.jar') \
    .config('spark.driver.memory', '6g') \
    .config('spark.executor.memory', '6g') \
    .config('spark.ui.enabled', 'false') \
    .appName('Recommender') \
    .getOrCreate()
    

# TODO
url = 'jdbc:postgresql://postgresdb:5432/postgres?user=postgres&password=postgres'

links = spark.read.jdbc(url=url, table='links')
movies = spark.read.jdbc(url=url, table='movies')

# TODO: Update with 'als-fitted-model'. 
# For now uses fitted model that includes Hans' ratings from database
fitted_model = ALSModel.load('als-fitted-model-presentation-only') 