const express = require('express');
const ControllerProduk = require('../controllers/controllerProduk');
const routerOrder = express.Router()

routerOrder.get('/:idUser/:id/add', ControllerProduk.addOrder)

module.exports = routerOrder