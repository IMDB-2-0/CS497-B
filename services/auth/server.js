const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Allows routes to be used
app.use('/api/v1/auth', router);

// Listens on specified port and host
app.listen(port, host, () => {
    console.log(`App running on http://${host}:${port}`);
});