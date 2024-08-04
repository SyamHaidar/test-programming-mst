const express = require('express')
const { getAllTransaction, createTransaction } = require('../controllers/TransactionController')

// -----------------------------------------------------------------------------

const TransactionRouter = express.Router()

TransactionRouter.get('/', getAllTransaction)
TransactionRouter.post('/', createTransaction)

module.exports = TransactionRouter
