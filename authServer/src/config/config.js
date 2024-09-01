
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT, DB_PORT, DB_SSL_CA } = require('./serverConfig');

module.exports = {
  development: {
    username: "root",
    password: "Himanshu@0422",
    database: "AUTH_DB",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "Himanshu@0422",
    database: "AUTH_DB",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  }
};
