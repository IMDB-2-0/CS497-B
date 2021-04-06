# Authorization via Google

The authorization service allows us to keep track of users and their respective data. We use Google Identity to help with authentication. Users must have a google account to use our service. When a user signs in, Google verifies their sign-in credentials sends us information including a user ID token, name, and email address. We store these in our database and keep track of the current logged in user through cookies. When a user performs an action on the site, we check the cookies to make sure they are logged in and check our database to make sure we have their credentials. If not, we ask them to sign in before continuing.

In order to build, the postgresql user, password, and url have to be modified at lines 53-55 in services/auth/server.js. You should input your local username and password for postgresql. The database name and port in the url string need to be updated to match the local database port and the name of the database.

The service can be run by navigating to the working directory "services/auth" in the terminal and running npm start. Navigate to "services/dashboard" and run npm start. Then got to localhost:3000/login in a browser. When you login using the google button, your name, email, and id token will be stored in the database and your id token will be stored as a cookie.
