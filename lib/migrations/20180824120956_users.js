exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();

        // default length of 255 chars
        // should be good enough for names
        table.string('firstName');
        table.string('lastName');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
