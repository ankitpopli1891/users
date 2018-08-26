exports.seed = knex => {
    return knex('users')
        .del()
        .then(() => {
            return knex('users').insert([
                { id: 1, firstName: 'Ryan', lastName: 'Chan' },
                { id: 2, firstName: 'Nick', lastName: 'Tsianos' },
                { id: 3, firstName: 'Ankit', lastName: 'Khatri' }
            ]);
        });
};
