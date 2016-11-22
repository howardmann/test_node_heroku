
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE users (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      email varchar(50) DEFAULT NULL,
      password varchar(100) DEFAULT NULL,
      name varchar(50) DEFAULT NULL,
      is_admin tinyint(1) DEFAULT '0',
      oauth_provider varchar(50) DEFAULT NULL,
      oauth_id varchar(50) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
  `);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
