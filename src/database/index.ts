import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env

// IF test DB
const pool: Pool = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    port: parseInt(POSTGRES_PORT as string, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    max: 8
})

pool.on('error', (Error: Error) => {
    console.error(Error)
})

export default pool
