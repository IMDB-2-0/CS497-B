# Examplar: Flask

[Flask](https://flask.palletsprojects.com/en/1.1.x/) is a web 
framework in Python that has a small and easy-to-extend-core

# Intent:
- Here we'll be learning how to install flask and setup a simple application. 
Flask is a Python web service that's simple to use and will be simple for any
data science applications (IR/Recommender systems) that will be utilized in the future.
Additionally, it's important to store our user ratings in a database such as MongoDB.
MongoDB is a non-relational and scalable database that can work with Node.js and Flask
pretty well. 

## Installation details below:
https://flask.palletsprojects.com/en/1.1.x/installation/

Steps (Windows):
> `mkdir backend`
> `cd backend`
> `py -3 -m venv venv`
> `venv\Scripts\activate`

To install flask
> `pip install Flask`

Create a new file called app.py in `./backend` directory

Code in app.py:
```
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World\n"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

- Set the environment variables
> `export FLASK_APP=app.py`
> `export FLASK_ENV=development`

- Run the app
> `flask run`

# Connecting Flask with Mongodb
- Install Flask-PyMongo:
> `pip install Flask-PyMongo`

- To add PyMongo to your code and connect to the database:

```
from flask_pymongo import PyMongo

client = MongoClient("mongodb+srv://<client>.mongodb.net/test?retryWrites=true")
db = client.recommender
```