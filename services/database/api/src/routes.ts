import { Router, Request, Response } from 'express';


import { createUser, getMovies, getUser, getLiked, getDisliked, deleteLike, 
    getUserRatings, googlelogin, addLike, getUserRecommendations } from './database-manager';
import { moviesIn, likeInGET, dislikeInGET, likeInDELETE, userInGET, 
    tempUserInGET, userInPOST, loginUserPOST, likeInPOST } from './models';

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

//Get likes
router.get('/liked', likeInGET, getLiked);

//Get dislikes
router.get('/disliked', dislikeInGET, getDisliked);

//Delete likes
router.delete('/liked/delete', likeInDELETE, deleteLike);

//Add likes
router.post('/liked/add', likeInPOST, addLike);

router.post('/user/login', loginUserPOST, googlelogin);

// Recommendations
router.get('/recommendations', userInGET, getUserRecommendations);