import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@
                        ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
});