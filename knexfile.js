// Used for database automation
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      database: "auth",
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: "production",
      user: "production",
      database: "auth",
    }
  }
}
