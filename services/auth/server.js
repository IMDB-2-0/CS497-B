const express = require('express');
const router = require('./routes');
const cors = require('cors');
// const errors = require('celebrate');

const app = express();
const port = process.env.PORT || 5004;
const host = '0.0.0.0';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(errors());

// Allows routes to be used
app.use('/auth', router);

// Listens on specified port and host
app.listen(port, host, () => {
    console.log(`App running on http://${host}:${port}`);
});


/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
//const multer = require('multer');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });
const jwt = require('jsonwebtoken');
const session = require("express-session");
const expressJWT = require('express-jwt');
const _pgp = require("pg-promise");
const auth = require('./google-auth/routes/auth');
require('custom-env').env(true);
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("496676445798-shpgurrglhd6do2b34s7v2l2slo5enkb.apps.googleusercontent.com");


const app = express();
const port = 8000;
//const login = require('../front-end/src/pages/Login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', auth);
app.use(session({
  secret: 'secret cat',
  resave: false,
  saveUninitialized: false
}));

// Set static folder
app.use(express.static('../../front-end/build'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`BUILD UMass server running on http://localhost:${port}`);
});

// Serve static assets (build folder) if in production
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const pgp = _pgp({
  connect(client) {
    console.log('Connected to database:', client.connectionParameters.database);
  },

  disconnect(client) {
    console.log('Disconnected from database:', client.connectionParameters.database);
  }
});
const username = "postgres";
const password = "12345";
const url = `postgres://${username}:${password}@localhost:5432/db`;
const db = pgp(url);
async function connectAndRun(task) {
  let connection = null;
  try {
    connection = await db.connect();
    return await task(connection);
  } catch (e) {
    throw e;
  } finally {
    try {
      connection.done();
    } catch (ignored) {
      // eslint-disable-next-line no-unsafe-finally  
    }
  }
}
app.post('/auth/login', async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "496676445798-shpgurrglhd6do2b34s7v2l2slo5enkb.apps.googleusercontent.com"
  });
  console.log(ticket);
  const { name, email, aud, iss } = ticket.getPayload();

  if (aud === process.env.REACT_APP_GOOGLE_CLIENT_ID && (iss === "accounts.google.com" || iss === "https://accounts.google.com:")){
    console.log(token);
    const user = await connectAndRun(db => db.any("SELECT * FROM users where email = $1;", [email]));
    console.log(user.length);
    if (user.length !== 0){
      console.log(user);
      req.session.userId = token;
      res.status(201);
      res.json(user);
    }
    else{
      try{
        const user = await connectAndRun(db => db.none("INSERT INTO users VALUES (1,2, 3,4, $5);", [email, token, name, null]));
        console.log(user);
        req.session.userId = token;
        res.status(201);
        res.json(user);
      }
      catch(err){
        throw err;
      }
    }  
    
  }
});

*/