// Used for database automation
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      database: "auth"
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: "us-cdbr-iron-east-04.cleardb.net",
      user: "bc6fa5bdca11f5",
      password: "e6d9f10f",
      database: "heroku_6ed701c24f9e605"
    }
  }
}
