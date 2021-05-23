import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const PORT: number = (process.env.DATABASE_PORT as any) as number;

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: PORT
})

export default pool;