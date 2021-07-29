const express = require('express');
const ControllerUser = require('../controllers/controllerUser');
const routerUser = express.Router()

routerUser.get('/login', ControllerUser.login)
routerUser.post('/login', ControllerUser.loginPost)
routerUser.get('/logout', ControllerUser.logout)
routerUser.get('/register', ControllerUser.register)
routerUser.post('/register', ControllerUser.registerPost)
routerUser.get('/:UserId', checkIsLogin, ControllerUser.user)
routerUser.get('/:UserId/edit', checkIsLogin, ControllerUser.userEdit)
routerUser.post('/:UserId/edit', checkIsLogin, ControllerUser.userEditPost)
routerUser.get('/:UserId/delete', checkIsLogin, ControllerUser.userDelete)

function checkIsLogin(req, res, next) {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

module.exports = routerUser