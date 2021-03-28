# Backend

## Routing

Flask in Python is used for routing our services together. Pipenv is also used to help manage our Python backend dependencies.

For now, our group mocked up one service in [app.py](/app.py). Eventually we might decide to split up all our routes into various microservices for various other services we implement in the future.

### **API**

We currently created a prototype routing service with generic endpoints:

/create/user

- Create a new user
- Type of request: PUT
- Parameters:
    - username (required): username to create

/recommend

- Recommend a movie for a user
- Type of request: POST
- Parameters:
    - username (required): username to generate movie recomendation

### Installation, Build, and Running the Service

We use pipenv to manage or virtual environments and packages. If you don't have it installed you may do so first:

> pip install pipenv

Once that's done, you may spawn a shell inside this directory:

> pipenv shell

Afterwards install the required dependencies:

> pipenv install

And finally you may run the service:

> python app.py

You may access the service with `localhost:5000` and use the API above as a guide. At the moment, you may use curl or other tool to try out our implemented endpoints.

## Docker, etc..