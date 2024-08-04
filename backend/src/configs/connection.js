const database = require('./database')
const { Sequelize } = require('sequelize')

// -----------------------------------------------------------------------------

const config = database['development']

let connection
if (config.use_env_variable) {
  connection = new Sequelize(config.use_env_variable, config)
} else {
  connection = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    dialect: config.dialect,
  })
}

module.exports = connection
