const express = require('express');
const routerOrder = require('./routerOrder');
const routerProduk = require('./routerProduk');
const routerUser = require('./routerUser');
const router = express.Router()

router.use('/produks', routerProduk)
router.use('/users', routerUser)
router.use('/orders', routerOrder)

module.exports = router