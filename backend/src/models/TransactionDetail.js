const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TransactionDetailail extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  TransactionDetailail.init(
    {
      transactionId: { type: DataTypes.BIGINT, allowNull: false },
      productId: { type: DataTypes.BIGINT, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      priceBeforeDiscount: { type: DataTypes.DECIMAL, allowNull: false },
      discountPercent: { type: DataTypes.DECIMAL, allowNull: false }, // discount in percent %
      discountValue: { type: DataTypes.DECIMAL, allowNull: false }, // discount in rupiah
      priceAfterDiscount: { type: DataTypes.DECIMAL, allowNull: false },
      total: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: 'TransactionDetail',
      tableName: 't_transaction_detail',
    }
  )

  return TransactionDetailail
}
