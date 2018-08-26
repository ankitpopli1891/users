const Model = require('.');

class Friend extends Model {
    static get tableName() {
        return 'friends';
    }

    static get relationMappings() {
        const User = require('./users');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'friends.userId'
                }
            },
            friend: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'friends.friendId'
                }
            }
        };
    }
}

module.exports = Friend;
