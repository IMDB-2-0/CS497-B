# Exemplar: Heroku + Postgres DB Infrastructure and Hosting

We'll need some way to store data long-term such as info about movies and user data.

Heroku has a great DB plugin that will host our database for free until it grows significantly. 

I will definitely need to work closely with the backend team on figuring out what datafields need to be stored but luckily SQL can be modified pretty easily. 

Here's some tables we will need:

```
--Movies will be uniquely identified by the unique movie ID we assign to them. Will need to coordinate to the data aggregator on this. More datafields can be added as necessary. Rating can tie into the ML rating system.

create table movies(mid primary key, title varchar, year integer, directors varchar[], cast varchar[], about text, rating float, genre varchar); --b-tree on(title, year)?

--users are generally uniquely identified by their emails. Then, passwords are stored in password digests generated from the frontend so that the password doesn't travel over any airwaves to the backend. Again, more fields as necessary.

create table users(email varchar primary key, password varchar, name varchar, liked mid[] references movies, recommended mid[] references movies);

insert into movies values (movieticker.nextint, title, year, directors, cast, about, rating, genre);
--Backend can use /movies/:mid and a query to the db to get the data about that movie. Fun! 

insert into users values(email, password, name, liked, recommended);

--here's some example queries for the backend peeps
select email, password, name, liked, recommended from users where email=${email};

select * from movies where title=${title} and year=${year};
select * from movies where mid=${mid};
```

I believe the ML people will train a model on their own local machine so they won't need any db space for that.

Cheers