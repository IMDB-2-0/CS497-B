Eric Trimble
In this leg of the assignment I made the goal of booting up the Postgres database with fully accessible example data for the backend and frontend people to work with. I was able to do so after a bit more work than I anticipated, and even overshot my bounds a little setting up the AWS database instance before Abhinav reminded me that he's going to be helping with that later down the road. Still interesting to see how it all works out.

The first step was editing the setup tables from last assignment to reflect the movies dataset from https://grouplens.org/datasets/movielens/. From there, I fired up the tables in a local postgres instance and made some more changes. Now, the dataset was not fully in the mode we wanted, with movie title and year in the same CSV column. Also, the csv format was not readable by SQL so I had to do more parsing to enclose the genres in curly braces and titles in quotes. 

After all that, I finally loaded over 9000 movies into the database with the following miraculous lines of code: 

```
COPY movies(mid, title, year, genres)
FROM '/Users/erictrimble/Desktop/env/cs497s/TeamBProject/CS497-B/services/database/data/movies.csv'
DELIMITER ','
CSV HEADER;
```

Of course, Abhinav will have to edit the absolute path to the dataset. Also, I will work with him to get the dataset online and accessible to the team soon, maybe even in this leg of the project now that all this is done.

So not a ton of code because of the nature of DB work but I spent a lot of time in excel cleaning up the data! In the future, when we import more and more movie titles (the entire dataset is ~100MB), I will have to switch to a Python script which shouldn't be too bad. Maybe even easier than excel.

The final table fields:
```
create table movies(mid integer primary key, title varchar, year integer, genres varchar[]);

create table users(email varchar primary key, password varchar, name varchar, liked integer[], recommended integer[]);
```

An example movie data row: 
`movieId,title,year,genres`
`68835,"Were the World Mine",2008,{Adventure|Fantasy|Musical|Romance}`