require('dotenv').config()
const express = require('express')
const { cors, seeder } = require('./configs')
const db = require('./models')
const router = require('./routes')

// -----------------------------------------------------------------------------

const app = express()
const PORT = process.env.DB_PORT
const HOST = process.env.DB_HOST

// cors
app.use(cors)
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// router
app.use('/api', router)
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate()
    res.send('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    res.status(500).send('Server error')
  }
})

// checking connection
app
  .listen(PORT, HOST, () => {
    console.log(`[server] running on http://${HOST}:${PORT}`)
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use')
    } else {
      console.log(err)
    }
  })

// synchronize database update method
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    db.sequelize
      .sync()
      .then(() => {
        console.log('Sync database')
        seeder()
      })
      .then(() => {
        console.log('Database schema updated!')
      })
  })
  .catch((err) => {
    console.error('Unable to connect to the Database:', err)
  })
