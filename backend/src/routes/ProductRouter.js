const express = require('express')
const { getAllProduct, createProduct } = require('../controllers/ProductController')

// -----------------------------------------------------------------------------

const ProductRouter = express.Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.post('/', createProduct)

module.exports = ProductRouter
