from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import random

app = Flask(__name__)
CORS(app, support_credentials=True)
# TODO Remove/replace with data from db/IMBD api
fake_storage = []
fake_movie_rec = ["Shrek", "Shrek 2", "Shrek 3"]

### Routes ###

# Homepage
@app.route('/', methods = ["GET"])
@cross_origin(supports_credentials=True)
def index():
    # TODO Return homepage 
    response = {"message": 'Message sent from server.'}
    return make_response(jsonify(response), 200)
    
# Creating a user
@app.route('/create/user', methods = ['PUT'])
def create_user():
    # Username from request or none
    username = request.form.get('username', None)

    # Wrong inputs
    if request.method != 'PUT' or username is None or len(username) <= 0:
        response = { 'message': 'Invalid queries or username.' }
        status = 400
    # Username already exists
    elif userExists(username):
        response = { 'message': username + ' already exists.' }
        status = 409
    # Everything went okay
    else:
        fake_storage.append(username.lower())
        response = { 'message':  username + ' created.' }
        status = 200
        
    # Send response
    return make_response(jsonify(response), status)
    
# Recommend a movie for a user
@app.route('/recommend', methods = ['POST'])
def recommend_movie():
    # Username from request or none
    username = request.form.get('username', None)

    # Wrong inputs
    if request.method != 'POST' or username is None:
        response = { 'message': 'Invalid queries.' }
        status = 400
    # Username does not already exists
    elif not userExists(username):
        response = { 'message': username + ' does not exist.' }
        status = 404
    # Everything went okay
    else:
        rec = fake_movie_rec[random.randint(0, 2)]
        response = { 'message':  'Movie recommendation generated for ' + username, 'recommendation' : rec}
        status = 200
        
    # Send response
    return make_response(jsonify(response), status)

### Helpers ###

def userExists(user):
    '''
    Checks if user exists in 'storage'

    Arguments:
        user: a string that represents a username

    Returns:
        a boolean on whether or not a user exists in storage
    '''
    return True if user.lower() in fake_storage else False


if __name__ == '__main__':
    # TODO Remove debug mode after development
    app.debug = True
    app.run(debug=True, host='0.0.0.0')