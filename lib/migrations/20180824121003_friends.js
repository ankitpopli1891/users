exports.up = function(knex) {
    return knex.schema.createTable('friends', table => {
        table.increments();

        // keeping it simple
        // user X has friend Y
        // can be saved as
        // -----|--------
        // user | friend
        // -----|--------
        //   X  |   Y
        // ignoring requests/accept/reject
        // it behaves more like follow relation
        table.integer('userId').unsigned();
        table.integer('friendId').unsigned();

        table.foreign('userId').references('users.id');
        table.foreign('friendId').references('users.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('friends');
};
