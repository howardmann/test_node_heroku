var bcrypt = require('bcrypt-nodejs');

var pass = bcrypt.hashSync("chicken");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({id: 1, email: 'howie@ga.co', password: pass, name: 'Howie Mann', is_admin: 1}),
      knex('users').insert({id: 2, email: 'hela@ga.co', password: pass, name: 'Hela Mann'}),
      knex('users').insert({id: 3, email: 'felix@ga.co', password: pass, name: 'Felix Mann'})
    ]);
};
