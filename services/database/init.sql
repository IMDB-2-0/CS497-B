CREATE TABLE movies(
    mid integer primary key, 
    title varchar, 
    year integer, 
    genres varchar[]
);

CREATE TABLE users(
    email varchar primary key, 
    password varchar, 
    name varchar, 
    liked integer[], 
    recommended integer[]
);

\COPY movies(mid, title, year, genres) FROM '/var/lib/postgresql/data/movies.csv' CSV HEADER;