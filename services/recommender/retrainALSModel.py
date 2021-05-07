import logging
from pyspark.ml.recommendation import ALS, ALSModel
from api.sparkSession import spark, links, movies, fitted_model

def startLogging():
    logging.basicConfig(filename='retraining.log', filemode='w', level=logging.DEBUG)
    logging.info('Retraining model script started')


# Expected percentile rank error metric function
def ROEM(predictions, userCol = "userid", itemCol = "movieid", ratingCol = "rating"):
    # Creates table that can be queried
    predictions.createOrReplaceTempView("predictions")

    # Sum of total number of plays of all songs
    denominator = predictions.groupBy().sum(ratingCol).collect()[0][0]

    # Calculating rankings of songs predictions by user
    spark.sql("SELECT " + userCol + " , " + ratingCol + " , PERCENT_RANK() OVER (PARTITION BY " + userCol + \
              " ORDER BY prediction DESC) AS rank FROM predictions").createOrReplaceTempView("rankings")

    # Multiplies the rank of each song by the number of plays and adds the products together
    numerator = spark.sql('SELECT SUM(' + ratingCol + ' * rank) FROM rankings').collect()[0][0]

    performance = numerator / denominator

    return performance


# Get current model ROEM
def getModelROEM(validation, model):
    logging.info('Retrieving model ROEM...')
    predictions = model.transform(validation)
    score = ROEM(predictions)
    return score


# Fit new ALS model
def retrainModel(training):
    model = ALS.load('als-unfitted-model')
    
    logging.info('Training new model')
    fitted_model = model.fit(training)

    return fitted_model


def main():
    startLogging()

    # Combine new ratings from database
    ratings = spark.read.options(header='True', inferSchema='True').csv('data/binary_ratings.csv')
    new_ratings = spark.read.jdbc(url='jdbc:postgresql://postgresdb:5432/postgres?user=postgres&password=postgres', table='ratings')
    combined_ratings = ratings.union(new_ratings)

    # Training and validation sets
    (training, validation) = combined_ratings.randomSplit([0.8, 0.2])

    # Retraining model
    new_model = retrainModel(training)
    currModelScore = getModelROEM(validation, new_model)
    logging.info('New model ROEM score: ' + str(currModelScore))

    # Saving model
    logging.info('Saving new model')
    new_model.save('new-als-fitted-model')
    logging.info('Script successful.')

if __name__ == "__main__":
    main()