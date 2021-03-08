# Examplar: Node and the Express Framework

[Express](https://expressjs.com) is a Node.js web framework. Our group will be able to use it as it for the backends of our project. 

## Express Setup

After it is installed though `npm`, it can easily be setup through the following lines of code:

```
import express from 'express';
const app = express();

// ...
// Endpoints go here
// ...

// Server listenting to 3000 port
app.listen(3000);
```

The server can then be run by running `node NAME_OF_APP.js`.

## HTTP Requests and Route Methods

Express includes features to handle incoming HTTP requests. For example, let's say we declared the express application `app`. Requests will be accesible via methods: GET requests will use `app.get` while POST requests will use `app.post` and so on. 

Here are examples of routes:

```
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

## Parsing HTTP Requests 

Express allows easy parsing for the requests. Here are some examples:

- By query:

```
// Example: '/recieve?movie=pinocchio'

// GET request
app.get('/recieve', (req, res) => {
    
    // Parsing movie query
    const movie = req.query.movie;

    // Do something and respond to client
});
```

**Before we try to handle other forms of parsing HTTP requests, we'll need to include the following lines of code to allow Express to easily parse urlenconded (body in requests) and JSON payloads.**

```
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

- By URL path parameter:

```
// Example: '/delete/user/john'

// DELETE request
app.delete('/delete/user/:user', (req, res) => {

    // Parsing by path parameter
    const user = req.params.user;

    // Do something and respond to client
});
```

- By body:
```
// Example: '{ user: 'john' }'

// POST request
app.post('/create', (req, res) => {

    // Parsing by body
    const user = req.body.user;

    // Do something and respond to client
});
```

## Middleware

Express also has the ability to use middleware functions. They can used for a variety of tasks, but our group should be able to utilize them for scalability. Here is one example:

```
// Member page
app.get('/member', checkUserAuth, (req, res) => {

    // Checks for user authentication first
    // Does something else

})

// Settings
app.get('/settings', checkUserAuth, (req, res) => {

    // Checks for user authentication
    // Does something else

});

// Checks for user authentication
function checkUserAuth(req, res, next) {
    // If logged in, run to next route
    // ...

    // If not, redirect to homepage
    // ...
}
```

## Route Handlers

If needed, our group will be able to create chainable route handlers by using `app.route`. Here is an example:

```
app.route('/movie')
  .get(function (req, res) {
    res.send('Get a random movie')
  })
  .post(function (req, res) {
    res.send('Add a movie')
  })
  .put(function (req, res) {
    res.send('Update the movie')
  })
```

We can also make modular, mountable route handlers by using the `Router` class. Note that the following snippets are not in ES6 format.

Here is a router file named 'movie.js':

```
const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.send('Homepage');
});

// Some movie title page
route.get('/title, (req, res) => {
    res.send('Movie title page');
});

// Export router
module.exports = router;
```

Now, here is an alternative application where we can load in the router module:

```
const movie = require('path/to/movie.js');

// Do something here

app.use('/movie', movie);
```

The application will be able to handle requests to '/movie' and '/movie/title'.