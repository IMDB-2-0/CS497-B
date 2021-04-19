import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { errors } from 'celebrate';
const passport = require('passport');
import { useJwtStrategy }  from './passport/index'; 
const path = require('path');

// require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });
// console.log(process.env.SECRET);
// console.log(process.env.PORT);
// console.log("hi" + path.resolve(__dirname, '../.env'));
const app = express();
const port = 5000
const host = '0.0.0.0';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errors());

// Passport Middleware
useJwtStrategy();
app.use(passport.initialize());
app.use(passport.session());


// Allows routes to be used
app.use('/api/v1/database', router);

// Listens on specified port and host
app.listen(port, host, (): void => {
    console.log(`App running on http://${host}:${port}`);
});