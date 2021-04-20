# Dashboard

Authors: Timothey Nguyen, Robin Lovell
Owner: Robin Lovell

The api routes that correspond to the front end are:

- #### '/liked' (GET)
- #### '/disliked' (GET)

Required query parameters:\n
'userID' 

Action:\n
Retrieve the the user's liked or disliked movies from the database

Return values:\n
JSON object containing the user's liked or disliked movies

- #### '/liked/delete' (DELETE)

Required query parameters:\n
'userID' and 'movieID'

Action:\n
Deletes the specified like or dislike from the database.

- #### '/liked/add' (POST)   

Required body parameters:\n
'userID', 'movieID', and 'rating'. (Dislike corresponds to a rating of 1 and like corresponds to a rating of 5.)

Action:\n
The like or dislike is added to the database.
