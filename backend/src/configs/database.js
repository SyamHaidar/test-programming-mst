const config = process.env

const database = {
  development: {
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,
  },
  preview: {
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,
  },
  production: {
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,
  },
}

module.exports = database
