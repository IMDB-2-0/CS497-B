import psycopg2, os
from dotenv import load_dotenv

# Retrieving DB credientials via env variables
load_dotenv()
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = os.getenv('POSTGRES_PASSWORD')

def db_credentials_found():
    '''
    Checks if env variables are valid

    Returns:
        a boolean if db credentials are found or not
    '''
    return POSTGRES_HOST is not None or POSTGRES_DB is not None \
        or POSTGRES_USER is not None or POSTGRES_PASS is not None


async def connect_to_db(db = 'postgres'):
    '''
    Connects to database

    Arguments:
        db: an optional string for a database name. Defaults to default
            postgres database name

    Returns:
        A connection object from psycog2 (successful connection) or None (unsuccessful)
    '''
    connection = None

    # Checks for credentials (correct environment variables)
    credentials_found = db_credentials_found()

    if not credentials_found:
        print('Incorrect environment variables.')
        return connection

    try:
        connection = psycopg2.connect(
            host = POSTGRES_HOST,
            database = db,
            user = POSTGRES_USER,
            password = POSTGRES_PASS
        )
        print('Connected to database.')
    except:
        print('An error has occured connecting to the database or "' + POSTGRES_DB + '" does not exist.')
    return connection


# TODO: Eventually split databases
async def create_db():
    '''
    Creates the user and media database if it does not exist.
    Database name is based on environment variable POSTGRES_DB
    '''
    # Connects to database based on environment variable 
    connection = await connect_to_db(POSTGRES_DB)

    # Database does not exist
    if connection is None:
        # Connect based on default settings
        connection = await connect_to_db()
        connection.autocommit = True

        # Connection based on default settings went okay
        if connection is not None:
            # Creates a cursor object
            cursor = connection.cursor()
            # Creates database
            cursor.execute('CREATE database ' + POSTGRES_DB)
            print(POSTGRES_DB + ' has been successfully created.')

        else:
            print('An error has occured creating the database: ' + POSTGRES_DB)
    
    else:
        print('Database: "' + POSTGRES_DB + '" already exists.')

    # Close connection
    connection.close()