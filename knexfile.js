// Used for database automation
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "howardmann",
      password: '',
      database: "myfirstpostgres"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
}
