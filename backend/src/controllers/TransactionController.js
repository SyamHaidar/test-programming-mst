const { Sequelize } = require('sequelize')
const { Transaction, TransactionDetail, Customer } = require('../models')
const moment = require('moment')

// -----------------------------------------------------------------------------

exports.getAllTransaction = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      attributes: {
        include: [
          // Use a subquery to calculate the total quantity
          [
            Sequelize.literal(`(
              SELECT SUM("quantity")
              FROM "t_transaction_detail"
              WHERE "t_transaction_detail"."transactionId" = "Transaction"."id"
            )`),
            'totalQuantity',
          ],
        ],
      },
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['name'], // Include only the customer's name
        },
      ],
    })

    const customData = data.map((transaction) => ({
      id: transaction.id,
      code: transaction.code,
      date: moment(transaction.date).format('DD-MMM-YYYY'),
      customerName: transaction.customer.name,
      quantity: transaction.getDataValue('totalQuantity'),
      subtotal: transaction.subtotal,
      discount: transaction.discount,
      shippingPrice: transaction.shippingPrice,
      totalPayment: transaction.totalPayment,
    }))

    res.json(customData)
  } catch (error) {
    res.json({ message: error.message })
  }
}

exports.createTransaction = async (req, res) => {
  // validate
  const products = req.body.products
  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'Products cannot be null or empty' })
  }

  try {
    const transaction = await Transaction.create({
      code: req.body.transactionCode,
      date: req.body.transactionDate,
      custId: req.body.custId,
      subtotal: req.body.subtotal,
      discount: req.body.discount,
      shippingPrice: req.body.shippingPrice,
      totalPayment: req.body.totalPayment,
    })

    const transactionDetail = products.map((product) => ({
      transactionId: transaction.id,
      productId: product.id,
      quantity: product.quantity,
      priceBeforeDiscount: product.priceBeforeDiscount,
      discountPercent: product.discountPercent,
      discountValue: product.discountValue,
      priceAfterDiscount: product.priceAfterDiscount,
      total: product.priceAfterDiscount * product.quantity,
    }))

    await TransactionDetail.bulkCreate(transactionDetail)

    res.status(200).json({ message: 'Transaction created successfully', transaction })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
