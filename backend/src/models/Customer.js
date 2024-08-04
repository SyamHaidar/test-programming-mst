'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      code: { type: DataTypes.STRING(10), allowNull: false },
      name: { type: DataTypes.STRING(100), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'm_customer',
    }
  )
  return Customer
}
