from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from db import connect_to_db, create_db, db_credentials_found

app = Flask(__name__)
CORS(app, support_credentials=True)

# Connect to database 
# TODO: Only works locally...
# TODO: Edit API endpoint name?
# TODO: Async? (flask on its own does not support async..)
@app.route('/database/connect', methods=['GET'])
def connect():
    connection = connect_to_db()

    # Connection is okay
    if connection is not None:
        response = { 'message':  'Database is online.' }
        status = 200
    # Not okay
    else:
        response = { 'message':  'An error has occurred connecting to the database.' }
        status = 400
    
    # Send response
    return make_response(jsonify(response), status)


@app.route('/database/status', methods=['GET'])
def status():
    return make_response(jsonify({ 'message':  'Database is online.' }), 200)


if __name__ == '__main__':
    # TODO Remove debug mode after deployment
    app.debug = True
    # app.run(port = 5001)