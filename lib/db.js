const Knex = require('knex');
const config = require('./knexfile');
const env = process.env.NODE_ENV || 'dev';
// todo
// different configs for environments
const connection = Knex(config[env]);
module.exports = connection;
