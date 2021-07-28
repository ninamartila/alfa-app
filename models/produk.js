'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produk.belongsToMany(models.User, { through: models.Order })
    }
  };
  Produk.init({
    nama_produk: DataTypes.STRING,
    harga_produk: DataTypes.INTEGER,
    stok_produk: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    kode_produk: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};