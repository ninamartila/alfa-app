const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerProduk = express.Router()

routerProduk.get('/', ControllerProduk.produk)

module.exports = routerProduk