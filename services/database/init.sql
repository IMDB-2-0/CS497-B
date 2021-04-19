-- TODO: Add cascades, indexes, normalize, etc

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

CREATE TABLE fakeUsers(
    userID INTEGER PRIMARY KEY
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
    timestampTemp INTEGER,
    PRIMARY KEY (userID, movieID),
    FOREIGN KEY (userID)
        REFERENCES fakeUsers,
    FOREIGN KEY (movieID)
        REFERENCES movies
);

CREATE TABLE tag(
    userID INTEGER,
    movieID INTEGER,
    tag VARCHAR,
    timestampTemp INTEGER,
    PRIMARY KEY (userID, movieID, tag),
    FOREIGN KEY (userID)
        REFERENCES fakeUsers,
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

-- Fake Users (creates IDs)
INSERT INTO fakeUsers(userID)
SELECT * 
FROM generate_series(1, 165000) gs(val);

-- Links
\COPY links(movieID, imdbID, tmdbID) FROM '/var/lib/postgresql/data/ml-25m/links.csv' CSV HEADER;

-- Ratings
\COPY ratings(userID, movieID, rating, timestampTemp) FROM '/var/lib/postgresql/data/ml-25m/ratings.csv' CSV HEADER;
-- Converts to proper timestamp
ALTER TABLE ratings ADD timestamp TIMESTAMP;
UPDATE ratings
SET timestamp = to_timestamp(timestampTemp);
ALTER TABLE ratings DROP COLUMN timestampTemp;
CREATE INDEX rating ON ratings (rating);
CREATE INDEX ratingsTimestamp ON ratings (timestamp);

-- Copies tag
\COPY tag(userID, movieID, tag, timestampTemp) FROM '/var/lib/postgresql/data/ml-25m/tags.csv' CSV HEADER;
-- Converts to proper timestamp
ALTER TABLE tag ADD timestamp TIMESTAMP;
UPDATE tag
SET timestamp = to_timestamp(timestampTemp);
ALTER TABLE tag DROP COLUMN timestampTemp;
CREATE INDEX tagTimestamp ON tag (timestamp);