'use strict';
const {
  Model
} = require('sequelize');
const { hasPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Produk, { through: models.Order })
    }
  };
  User.init({
    nama: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hasPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};