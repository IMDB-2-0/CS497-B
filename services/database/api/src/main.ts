import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();
const port = 5000;
const host = '0.0.0.0';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errors());

// Allows routes to be used
app.use('/api/v1/database', router);

// Listens on specified port and host
app.listen(port, host, (): void => {
    console.log(`App running on http://${host}:${port}`);
});