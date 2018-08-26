exports.seed = knex => {
    // Deletes ALL existing entries
    return knex('friends')
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('friends').insert([
                { id: 1, userId: 1, friendId: 2 },
                { id: 2, userId: 2, friendId: 3 },
                { id: 3, userId: 3, friendId: 1 },
                { id: 4, userId: 3, friendId: 2 }
            ]);
        });
};
