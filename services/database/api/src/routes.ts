import { Router, Request, Response } from 'express';
import { createUser, getMovies, getUser, getUserRatings } from './database-manager';
import { moviesIn, userInGET, tempUserInGET, userInPOST } from './models';

export const router = Router();

router.get('/status', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Database API is running.' });
});

// Retrieve movie(s) information
router.get('/movies', moviesIn, getMovies);

// Retrieve a user's information
router.get('/user', tempUserInGET, getUser);

// Create new user
router.post('/user/create', userInPOST, createUser);

// Get user ratings
router.get('/user/ratings', userInGET, getUserRatings);