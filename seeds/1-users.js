var bcrypt = require('bcrypt-nodejs');

var pass = bcrypt.hashSync("chicken");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({email: 'howie@ga.co', password: pass, name: 'Howie Mann', is_admin: true}),
      knex('users').insert({email: 'hela@ga.co', password: pass, name: 'Hela Mann'}),
      knex('users').insert({email: 'felix@ga.co', password: pass, name: 'Felix Mann'})
    ]);
};
