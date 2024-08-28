import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;

// connection string format for local psql databases:
// postgresql://<role_name>:<role_password>@localhost:5432/<database_name>