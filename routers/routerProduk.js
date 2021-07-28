const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerProduk = express.Router()

routerProduk.get('/:UserId', ControllerProduk.produk)

module.exports = routerProduk