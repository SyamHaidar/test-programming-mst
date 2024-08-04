const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      code: { type: DataTypes.STRING(10), allowNull: false },
      name: { type: DataTypes.STRING(100), allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'm_product',
    }
  )
  return Product
}
