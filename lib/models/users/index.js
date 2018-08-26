const Model = require('..');

const TABLE_NAME = 'users';

class User extends Model {
    static get tableName() {
        return TABLE_NAME;
    }

    static get idColumn() {
        return 'id';
    }

    name() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Optional JSON schema. This is not the database schema!
    // Nothing is generated based on this. This is only used
    // for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['firstName', 'lastName'],

            properties: {
                id: { type: 'integer' },

                // default length of string type in knex is 255
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }

    static get relationMappings() {
        const Friend = require('../friends');

        return {
            friends: {
                relation: Model.HasManyRelation,
                modelClass: Friend,
                join: {
                    from: 'users.id',
                    to: 'friends.userId'
                }
            }
        };
    }
}

module.exports = User;
