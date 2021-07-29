const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerOrder = express.Router()

routerOrder.get('/:UserId/:id/add', ControllerProduk.addOrder)
routerOrder.get('/:UserId/keranjang', ControllerProduk.keranjang)
routerOrder.get('/:UserId/:id/seeProduk', ControllerProduk.seeProduk)
routerOrder.get('/:UserId/order', ControllerProduk.readyOrder)
routerOrder.get('/:UserId', ControllerProduk.historyOrder)

module.exports = routerOrder