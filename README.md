### Storefront Backend Project

## Set Up
- In psql run the following to create database_user
  - `CREATE USER postgres WITH PASSWORD '1234';`
- In psql run the following to create database 
  -  `CREATE DATABASE storefront`
  -  `CREATE DATABASE storefront_test` for testing
- Create `.env` file then add secret variables
- `npm i` To install all packages then add private variables
- `npm run migrate` To set up the database with "db-migrate up" command
- `npm run dev` To start development

## Scripts
- Install => ```npm i```    <!-- install packages -->
- Dev => ```npm run dev``` <!-- start development -->
- Build => ```npm run build``` <!-- build project -->
- Start => ```npm run start``` <!-- start application -->
- Clean => ```npm run clean``` <!-- remove build folder -->
- Lint:fix => ```npm run lint:fix``` <!-- excute lint check and fix -->
- Format => ```npm run format``` <!-- format code with .prettier -->
- Test => ```npm run test``` <!-- test all unit tests with jasmine -->

# Database set up
Host=127.0.0.1
database-port=5432
database_database = storefront
database_database_test = storefront_test
database-user=postgres
database-password=1234



## ports
server => 3000
database => 5432

## env variables
PORT=3000 
```http://localhost:3000```

# Database Variables
ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
# Test Database Variables
ENV=dev
POSTGRES_TEST_DB=storefront_test

# JWT
TOKEN_PASSWORD=token_secret_password
# Bcrypt Password
BCRYPT_PASSWORD=bcrypt_secret_password
SALT_ROUNDS```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=storefront
POSTGRES_USER=###
POSTGRES_PASSWORD=###
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###
```

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- add a `database.json` file in the root directory and set the missing `./database.json` parameters
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "storefront",
    "user": "###",
    "password": "###"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5433,
    "database": "storefront_test",
    "user": "postgres",
    "password": "1234"
  }
}
```
- `npm run test` to run all tests
