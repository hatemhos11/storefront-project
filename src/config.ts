import * as dotenv from 'dotenv'
dotenv.config()

const {
    ENV,
    PORT,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,

    TOKEN_PASSWORD,

    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

export default {
    port: PORT,
    host: POSTGRES_HOST,
    db: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    dbPort: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,

    tokenPassword: TOKEN_PASSWORD,
    bcryptPassword: BCRYPT_PASSWORD,
    saltRounds: SALT_ROUNDS
}
