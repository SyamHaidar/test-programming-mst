const { Product } = require('../models')
const { productCode } = require('../utils')

// -----------------------------------------------------------------------------

exports.getAllProduct = async (req, res) => {
  try {
    const data = await Product.findAll()
    res.json(data)
  } catch (error) {
    res.json({ message: error.message })
  }
}

exports.createProduct = async (req, res) => {
  try {
    await Product.create({
      code: productCode(),
      name: req.body.name,
      price: req.body.price,
    })
    res.json({ message: 'success' })
  } catch (error) {
    res.json({ message: error.message })
  }
}
