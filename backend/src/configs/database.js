const config = process.env

const database = {
  development: {
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,
  },
  test: {
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,
  },
  production: {
    use_env_variable:
      'postgres://default:FduKIL7iAY5J@ep-little-waterfall-a42b6l1q.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
    dialect: 'postgres',
    dialectModule: 'pg',
  },
}

module.exports = database
