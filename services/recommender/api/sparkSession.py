from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .config('spark.driver.extraClassPath', 'postgresql-42.2.19.jar') \
    .appName('Recommender') \
    .getOrCreate()

# TODO
url = 'jdbc:postgresql://postgresdb:5432/postgres?user=postgres&password=postgres'

links = spark.read.jdbc(url=url, table='links')
movies = spark.read.jdbc(url=url, table='movies')