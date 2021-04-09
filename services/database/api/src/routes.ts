import { Router, Request, Response } from 'express';
import { getMovies } from './database-manager';
import { moviesIn } from './models';

export const router = Router();

router.get('/status', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Database API is running.' });
});

router.post('/get-movies', moviesIn, getMovies);
