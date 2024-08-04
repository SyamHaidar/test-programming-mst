const _cors = require('./cors')
const database = require('./database')
const connection = require('./connection')
const seeder = require('./seeder')

// -----------------------------------------------------------------------------

module.exports = { cors: _cors, database, connection, seeder }
