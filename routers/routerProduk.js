const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerProduk = express.Router()

routerProduk.get('/:idUser', ControllerProduk.produk)

module.exports = routerProduk