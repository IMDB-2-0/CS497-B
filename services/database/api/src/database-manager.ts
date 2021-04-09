import { Request, Response } from 'express';
import { pool } from './database';

export const getMovies = async (req: Request, res: Response) => {
    const user = req.body['user'];
    // Default limit value is 10
    const limit = req.body['limit'] === undefined ? 10 : req.body['limit'];
    
    // Retrieves a number of movies based on limit
    pool.query('SELECT * FROM movies LIMIT ' + limit, (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    });
}