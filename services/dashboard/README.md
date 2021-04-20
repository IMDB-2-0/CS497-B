## Dashboard

Authors: Timothey Nguyen, Robin Lovell
Owner: Robin Lovell

The api routes that correspond to the front end are:

- ### '/liked' (GET)
- ### '/disliked' (GET)

Required query parameters:
The '/liked' and '/disliked' endpoints require a 'userID' query parameter. 

Action:
They retrieve the the user's liked or disliked movies from the database.

Return values:
They respond with a JSON object containing these data.

- ### '/liked/delete' (DELETE)

Required query parameters:
The '/liked/delete' endpoint requires 'userID' and 'movieID' query parameters. 

Action:
Deletes the specified like or dislike from the database.


- ### '/liked/add' (POST)   

Required body parameters:
The '/liked/add' endpoint requires 'userID', 'movieID', and 'rating' parameters in the request body. (Dislike corresponds to a rating of 1 and like corresponds to a rating of 5.)

Action:
The like or dislike is added to the database.
