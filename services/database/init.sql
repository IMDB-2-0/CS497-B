CREATE TABLE movies(
    movieID INTEGER PRIMARY KEY, 
    title VARCHAR, 
    genresTemp VARCHAR
);

CREATE TABLE users(
    userID SERIAL PRIMARY KEY,
    email VARCHAR, 
    password VARCHAR, 
    name VARCHAR, 
    emailVerified BOOLEAN
);

CREATE TABLE links(
    movieID INTEGER PRIMARY KEY,
    imdbID INTEGER,
    tmdbID INTEGER,
    FOREIGN KEY (movieID)
        REFERENCES movies
);

CREATE TABLE ratings(
    userID INTEGER,
    movieID INTEGER,
    rating NUMERIC,
    PRIMARY KEY (userID, movieID),
    FOREIGN KEY (userID)
        REFERENCES users,
    FOREIGN KEY (movieID)
        REFERENCES movies
);

-- Movies
\COPY movies(movieID, title, genresTemp) FROM '/var/lib/postgresql/data/ml-25m/movies.csv' CSV HEADER;
-- Converts genres to array
ALTER TABLE movies ADD genres TEXT[];
UPDATE movies
SET genres = string_to_array(genresTemp, '|');
ALTER TABLE movies DROP COLUMN genresTemp;

-- Have user ID's start at 170000 (above training/test data)
ALTER SEQUENCE users_userid_seq RESTART WITH 170000;

-- Links
\COPY links(movieID, imdbID, tmdbID) FROM '/var/lib/postgresql/data/ml-25m/links.csv' CSV HEADER;