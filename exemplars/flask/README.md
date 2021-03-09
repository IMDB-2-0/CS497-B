# Examplar: Flask

[Flask](https://flask.palletsprojects.com/en/1.1.x/) is a web 
framework in Python that has a small and easy-to-extend-core

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