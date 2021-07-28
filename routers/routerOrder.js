const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerOrder = express.Router()

routerOrder.get('/:UserId/:id/add', ControllerProduk.addOrder)

module.exports = routerOrder