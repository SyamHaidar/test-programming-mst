const database = require('./database')
const { Sequelize } = require('sequelize')

// -----------------------------------------------------------------------------

const config = database['development']

const connection = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: config.dialect,
})

module.exports = connection
