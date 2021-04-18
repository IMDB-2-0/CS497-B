import { Request, Response } from 'express';
import { pool } from './database';
import axios from 'axios';
import { emailValid } from './utils';

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
    pool.query('SELECT email FROM users WHERE email = $1::text', [email], (error, results) => {
        if (error) return res.status(400).json({ message: error.message });
        // User does not exist
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'User does not exist.' });
        // Everything okay
        } else {
            // TODO: Remove password when sending response
            return res.status(200).json(results.rows);
        }
    });
}

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
                const query = 'INSERT INTO users VALUES(DEFAULT, $1::text, $2::text, $3::text, FALSE)';

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