const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const multer = require('multer');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const auth = require('./routes/auth');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', login);

// Set static folder
app.use(express.static('../../front-end/build'));

// Serve static assets (build folder) if in production
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`BUILD UMass server running on http://localhost:${port}`);
  });
  