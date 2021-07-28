const express = require('express');
const routerOrder = require('./routerOrder');
const routerProduk = require('./routerProduk');
const routerUser = require('./routerUser');
const router = express.Router()

router.use('/produks', checkIsLogin, routerProduk)
router.use('/users', routerUser)
router.use('/orders', checkIsLogin, routerOrder)

function checkIsLogin(req, res, next) {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

module.exports = router