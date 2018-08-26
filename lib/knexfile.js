require('dotenv').config();

// const pg = require('pg');
// pg.defaults.ssl = true;

// todo
// different configs for each env
module.exports = {
    dev: {
        client: 'pg',
        connection: 'postgres://postgres:veris@172.18.0.1:5432/users'
    },
    test: {
        client: 'pg',
        connection: 'postgres://postgres:veris@172.18.0.1:5432/test-users'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
