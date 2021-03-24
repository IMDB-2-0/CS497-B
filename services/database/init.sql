create table movies(mid integer primary key, title varchar, year integer, genres varchar[]);

create table users(email varchar primary key, password varchar, name varchar, liked integer[], recommended integer[]);

---you will need to edit this absolute path
COPY movies(mid, title, year, genres)
FROM '/Users/erictrimble/Desktop/env/cs497s/TeamBProject/CS497-B/services/database/data/movies.csv'
DELIMITER ','
CSV HEADER;