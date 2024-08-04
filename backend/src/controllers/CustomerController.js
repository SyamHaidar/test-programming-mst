const { Customer } = require('../models')
const { customerCode } = require('../utils')

// -----------------------------------------------------------------------------

exports.getAllCustomer = async (req, res) => {
  try {
    const data = await Customer.findAll()
    res.json(data)
  } catch (error) {
    res.json({ message: error.message })
  }
}

exports.createCustomer = async (req, res) => {
  try {
    await Customer.create({
      code: customerCode(),
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    })
    res.json({ message: 'success' })
  } catch (error) {
    res.json({ message: error.message })
  }
}
