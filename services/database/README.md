Data from https://grouplens.org/datasets/movielens/ the 'small' database, for dev purposes. The full 18M+ entry dataset is also available at that link

Run postgresql locally:
1) install postgres.
2) pg_ctl -D /usr/local/var/postgres start
3) psql -l 
4) psql {db, for example: hw5}

Import the data
psql -h 127.0.0.1 -d test -f init.sql

-d is database name
-f is the init file. The movies.csv file must be the one I formatted for this purpose
-h is the port