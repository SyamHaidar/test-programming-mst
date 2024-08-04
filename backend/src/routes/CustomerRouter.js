const express = require('express')
const { getAllCustomer, createCustomer } = require('../controllers/CustomerController')

// -----------------------------------------------------------------------------

const CustomerRouter = express.Router()

CustomerRouter.get('/', getAllCustomer)
CustomerRouter.post('/', createCustomer)

module.exports = CustomerRouter
