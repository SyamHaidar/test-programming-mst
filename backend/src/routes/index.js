const express = require('express')
const TransactionRouter = require('./TransactionRouter')
const CustomerRouter = require('./CustomerRouter')
const ProductRouter = require('./ProductRouter')

// -----------------------------------------------------------------------------

const router = express.Router()

router.use('/transaction', TransactionRouter)
router.use('/customer', CustomerRouter)
router.use('/product', ProductRouter)

module.exports = router
