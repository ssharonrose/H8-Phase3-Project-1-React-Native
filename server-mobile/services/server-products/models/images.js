'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Product, { foreignKey: "productId" })
      // define association here
    }
  }
  Images.init({
    productId: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Url cannot be empty"
        },
        notEmpty: {
          msg: "Image Url cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};