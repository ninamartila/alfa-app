const express = require('express');
const ControllerUser = require('../controllers/controllerUser');
const routerUser = express.Router()

routerUser.get('/login', ControllerUser.login)
routerUser.post('/login', ControllerUser.loginPost)
routerUser.get('/logout', ControllerUser.logout)
routerUser.get('/register', ControllerUser.register)
routerUser.post('/register', ControllerUser.registerPost)
routerUser.get('/:idUser', checkIsLogin, ControllerUser.user)
routerUser.get('/:idUser/edit', checkIsLogin, ControllerUser.userEdit)
routerUser.post('/:idUser/edit', checkIsLogin, ControllerUser.userEditPost)

function checkIsLogin(req, res, next) {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

module.exports = routerUser