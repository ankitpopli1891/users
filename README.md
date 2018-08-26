# Users & Friends

## Setup Steps

 - Create database 'users' (PostgreSQL)
 - Use `knex migrate:latest` to get DB to the latest schema
 - Use `knex seed:run` to load initial data
 - Start server using `npm start`
 - Put DATABASE_URL in `lib/.env` file. Supported databases: PostgreSQL, MySQL and others supported by [knex](https://knexjs.org/)

## Postman Collection

   All the APIs have been grouped together in a list as a Postman Collection, available here:
 - https://www.getpostman.com/collections/524a59667f9731242fb6


## Testing

   A sample unit test has been added, and can be invoked via

 - `npm run test`

   Libraries used for testing - `mocha`, `chai` & `supertest`


## Docker container

  Docker container can be built via

 - `docker build . -t users`
 - `docker run -p 3000:80 users`
