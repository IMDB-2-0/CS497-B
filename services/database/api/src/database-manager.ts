import { Request, Response } from 'express';
import { pool } from './database';
import axios from 'axios';
import { emailValid } from './utils';
import { moviesIn, userInGET } from './models';
import { generateKeyPairSync } from 'node:crypto';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

export const getMovies = async (req: Request, res: Response) => {
    // First 30 limits if unspecified
    const limit = req.query['limit'] === undefined ? 30 : req.query['limit'];
    
    // TODO: Update / add new parameters?
    // Retrieves first number of movies based on limit
    pool.query('SELECT * FROM movies LIMIT $1::int', [limit], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        return res.status(200).json(results.rows);
    });
}

// TODO: Update with retrieving by ID?
export const getUser = async (req: Request, res: Response) => {
    const email = req.query['email'];

    // Checks if user exists in database
    pool.query('SELECT email, userID, name FROM users WHERE email = $1::text', [email], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        // User does not exist
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'User does not exist.' });
        // Everything okay
        } else {
            // TODO: Remove password when sending response
            // console.log(results.rows);
            return res.status(200).json(results.rows);
        }
    });
}


//Gets titles of liked movies
export const getLiked = async (req: Request, res: Response) => {
    const id = req.query['id'];
    const query = 'SELECT m.movieID, m.title, l.tmdbid ' +
                'FROM movies m, ratings r, links l ' +
                'WHERE m.movieID = r.movieID ' +
                'AND m.movieID = l.movieID ' +
                'AND r.userID = $1::int ' +
                'AND r.rating = 1'; 

    pool.query(query, [id], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        else {
            return res.status(200).json(results.rows);
        }
    });
    
}

//Gets titles of disliked movies
export const getDisliked = async (req: Request, res: Response) => {
    const id = req.query['id'];
    pool.query('SELECT movies.movieID, movies.title FROM movies JOIN ratings ON ratings.movieID = movies.movieID WHERE ratings.userID = $1::int AND ratings.rating = 0', [id], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        else {
            return res.status(200).json(results.rows);
        }
    });
}

export const deleteLike = (req: Request, res: Response) => {
    const id = req.query['id'];
    const tmdbID = req.query['movieID'];

    // Checks if user exists in database
    pool.query('DELETE FROM ratings WHERE userID = $1::int AND movieID = $2::int', [id, tmdbID], (error) => {
        if (error) return res.status(400).json({ message: error.message });
        // Everything okay
        return res.status(200).json({ message: 'Movie rating deleted.' });
    });
}

export const addLike = (req: Request, res: Response) => {
    const { userID, movieID, movieTitle, movieGenre, rating } = req.body;

    pool.query('SELECT tmdbid FROM links WHERE tmdbid = $1::int', [movieID], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        // Movie does not exist
        if (results.rows.length === 0) {
            // Add movie to database
            const insertNewMovie = 'INSERT INTO movies VALUES (DEFAULT, $1::text, $2::text[])';
            const insertNewTMDB = 'INSERT INTO links VALUES (DEFAULT, -1, $1::int)';
            
            // Updates movie table
            pool.query(insertNewMovie, [movieTitle, movieGenre], (error) => {
                if (error) return res.status(400).json({ message: error.message });

                // Updates links table
                pool.query(insertNewTMDB, [movieID], (error) => {
                    if (error) return res.status(400).json({ message: error.message });
                });
            });

            // Retrieves current movie ID
            pool.query('SELECT MAX(movieid) FROM movies', (error, results) => {
                if (error) return res.status(400).json({ message: error.message });
                const currMovieID = results.rows[0].max;
                insertOrUpdateRating(res, userID, currMovieID, movieTitle, rating);
            });
        // Movie exists
        } else {
            pool.query('SELECT movieid FROM links WHERE tmdbid = $1::int', [movieID], (error, results) => {
                if (error) return res.status(400).json({ message: error.message });
                const currMovieID = results.rows[0].movieid;
                insertOrUpdateRating(res, userID, currMovieID, movieTitle, rating);
            });
        }        
    });
}

// TODO: Update with other profile info (Name, etc.)
export const createUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    // TODO: Create function to retrieve user exists query as opposed to calling endpoint
    // Attempt sending request to find user in database
    try {
        // Check if user exists
        const newResponse = await axios.get('http://nginx:5050/api/v1/database/user?email=' + email, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        
        // User already exists
        if (newResponse.status === 200) return res.status(409).json({ message: email + ' already exists.' });
        // User does not exist
        else if (newResponse.status === 404) {
            // TODO: Valid pass syntax
            if (emailValid(email)) {
                // Setting verify email to true for now. 
                // I'm too lazy to actually set up a reset password at the moment
                const query = 'INSERT INTO users VALUES(DEFAULT, $1::text, $2::text, $3::text, TRUE)';

                pool.query(query, [email, password, name], (error, results) => {
                    if (error) return res.status(400).json({ message: error.message });
                    else return res.status(200).json({ message: email + ' saved.' });
                });
            } else {
                return res.status(400).json({ message: email + ' is an invalid email address.' });
            }
        }

    // Error found
    } catch (error) {
        return res.status(400).json({ message: error.response });
    }
}

export const googlelogin = async (req: Request, res: Response) => {
    const {email_verified, name, email} = req.body;
    let register = false;

    // Check if the email exists
    let newResponse = await axios.get('http://nginx:5050/api/v1/database/user?email=' + email, {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 404;
        }
    });
    
    // User doesn't exist
    if (newResponse.status === 404) {
        register = true;
        let generator = require('generate-password');
        let password:String = generator.generate({
            length: 20,
            numbers: true
        });

        await bcrypt.genSalt(10, (error: any, salt:any) => {
            bcrypt.hash(password, salt, async (err: any, hash: any) => {
                if (err) throw err;
                password = hash;
                const new_payload = {email: email, password: password, name: name}
                axios.post('http://nginx:5050/api/v1/database/user/create', new_payload)
                    .then(res => console.log('New user created: ' + email))
                    .catch(error => console.log(error));
            });
        });

        return res.status(201).json({ type: 'register', message: '"' + email + '" sucessfully registered. You may login now.'})
    } else if (newResponse.status === 200) { 
        // Sign token
        const payload = {
            email: newResponse.data[0].email,
            name: newResponse.data[0].name,
            id: newResponse.data[0].userid
        }
        const token = jwt.sign(payload, 'secret', {
            expiresIn: 31556926, // 1 year in seconds
        });
        jwt.verify(token, 'secret');
        return res.status(200).json({
            type: 'login',
            message: 'Login Successful',
            id: payload.id,
            token: `bearer ${token}`
        });
    } else {
        res.status(newResponse.status).json({type: 'error', message: newResponse.data.message});  
    }
}

// TODO: Edit to work with our application's users
export const getUserRatings = async (req: Request, res: Response) => {
    const { id } = req.query;

    pool.query('SELECT * FROM ratings WHERE userID = $1::int', [id], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        else return res.status(200).json(results.rows);
    });
};

export const getUserRecommendations = async (req: Request, res: Response) => {
    const { id } = req.query;

    pool.query('SELECT tmdbID FROM recommendations WHERE userID = $1::int', [id], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        else return res.status(200).json(results.rows);
    });
};


function insertOrUpdateRating(res: Response, userID: number, currMovieID: number, movieTitle: string, rating: number) {
    // Checks if user has rated this movie already
    pool.query('SELECT * FROM ratings WHERE userID = $1::int AND movieID = $2::int', [userID, currMovieID], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        // User has not rated this movie
        if (results.rows.length === 0) {
            // Insert rating
            pool.query('INSERT INTO ratings values ($1::int, $2::int, $3::int)', [userID, currMovieID, rating], (error) => {
                if (error) return res.status(400).json({ message: error.message });
                else return res.status(200).json({ success: true, message: movieTitle + ' rated successfully.'});
            });
        // User has rated this movie already
        } else {
            // Update rating 
            const updateQuery = 'UPDATE ratings SET rating = $1::int WHERE userid = $2::int AND movieid = $3::int';
            pool.query(updateQuery, [rating, userID, currMovieID], (error) => {
                if (error) return res.status(400).json({ message: error.message });
                else return res.status(200).json({ success: true, message: movieTitle + ' rated successfully.'});
            });
        }
    });
}

