const express = require('express');
const ControllerUser = require('../controllers/controllerUser');
const routerUser = express.Router()

routerUser.get('/login', ControllerUser.login)
routerUser.post('/login', ControllerUser.loginPost)
routerUser.get('/logout', ControllerUser.logout)
routerUser.get('/register', ControllerUser.register)
routerUser.post('/register', ControllerUser.registerPost)

module.exports = routerUser