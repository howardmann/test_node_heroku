
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return Promise.all([
      // Inserts seed entries
      knex('posts').insert({id: 1, text: 'Some howie post', user_id: 1}),
      knex('posts').insert({id: 2, text: 'Another howie post', user_id: 1}),
      knex('posts').insert({id: 3, text: 'Hela post', user_id: 3})
    ]);
};
