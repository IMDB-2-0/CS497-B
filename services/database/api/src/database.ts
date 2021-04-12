import { Pool } from 'pg';

export const pool = new Pool({
    // TODO: Utilize env variables to hide connection and details
    connectionString: 'postgresql://postgres:postgres@postgresdb:5432/postgres'
});