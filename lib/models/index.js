const { Model } = require('objection');
const knex = require('../db');
Model.knex(knex);

// common helpers
Model.prototype.findById = id => {
    return this.where('id', id).first();
};

module.exports = Model;
