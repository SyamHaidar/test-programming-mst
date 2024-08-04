const { Product, Customer, transaction, transactionDetail } = require('../models')
const { uniqId, randomNumber, productCode, customerCode } = require('../utils')

// -----------------------------------------------------------------------------

const seeder = async () => {
  ProductSeeder()
  CustomerSeeder()
}

const ProductSeeder = async () => {
  // table name is m_product
  const data = await Product.findAll()
  const count = data.length

  console.log(`There are ${count} data in products.`)

  if (count === 0) {
    console.log('Table product is empty, running seeder...')
    Product.create({ code: productCode(), name: 'Lenovo Yoga 9i', price: 10000000 })
    Product.create({ code: productCode(), name: 'Asus Zenbook 13s', price: 12500000 })
    Product.create({ code: productCode(), name: 'HP Omen 15', price: 2250000 })
    Product.create({ code: productCode(), name: 'Acer Predator', price: 15000000 })
    Product.create({ code: productCode(), name: 'Macbook Air', price: 9000000 })
    console.log('Seeder has been run successfully!')
  } else {
    console.log('Table product is not empty, skipping seeder.')
  }
}

const CustomerSeeder = async () => {
  // table name is m_customer
  const data = await Customer.findAll()
  const count = data.length

  console.log(`There are ${count} data in customer.`)

  if (count === 0) {
    console.log('Table customer is empty, running seeder...')
    Customer.create({ code: customerCode(), name: 'John', phoneNumber: '081112222231' })
    Customer.create({ code: customerCode(), name: 'Steve', phoneNumber: '081112222232' })
    Customer.create({ code: customerCode(), name: 'Jackie', phoneNumber: '081112222233' })
    Customer.create({ code: customerCode(), name: 'Melisa', phoneNumber: '081112222234' })
    Customer.create({ code: customerCode(), name: 'Danielle', phoneNumber: '081112222235' })
    console.log('Seeder has been run successfully!')
  } else {
    console.log('Table customer is not empty, skipping seeder.')
  }
}

// TODO: seeder Transaction and Transaction Detail
const TransactionSeeder = async () => {
  // table name is t_transaction
  const data = await Transaction.findAll()
  const count = data.length

  console.log(`There are ${count} data in transaction.`)

  if (count === 0) {
    console.log('Table transaction is empty, running seeder...')
    Transaction.create({
      code: '',
      date: '',
      custId: '',
      subtotal: '',
      discount: '',
      shippingPrice: '',
      totalPayment: '',
    })
    console.log('Seeder has been run successfully!')
  } else {
    console.log('Table transaction is not empty, skipping seeder.')
  }
}

const TransactionDetailSeeder = async () => {
  // table name is t_transaction_detatil
  const data = await TransactionDetail.findAll()
  const count = data.length

  console.log(`There are ${count} data in transaction detail.`)

  if (count === 0) {
    console.log('Table transaction detail is empty, running seeder...')
    TransactionDetail.create({
      transactionId: '',
      prdocutId: '',
      quantity: '',
      discountPercent: '',
      discountValue: '',
      priceBeforeDiscount: '',
      priceAfterDiscount: '',
      total: '',
    })
    console.log('Seeder has been run successfully!')
  } else {
    console.log('Table transaction detail is not empty, skipping seeder.')
  }
}

module.exports = seeder
