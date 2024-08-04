const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'custId',
      })
      Transaction.hasMany(models.TransactionDetail, {
        as: 'transactionDetail',
        foreignKey: 'transactionId',
      })
    }
  }

  Transaction.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      code: { type: DataTypes.STRING(15), allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      custId: { type: DataTypes.INTEGER, allowNull: false },
      subtotal: { type: DataTypes.DECIMAL, allowNull: false },
      discount: { type: DataTypes.DECIMAL, allowNull: false },
      shippingPrice: { type: DataTypes.DECIMAL, allowNull: false },
      totalPayment: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 't_transaction',
    }
  )

  return Transaction
}
