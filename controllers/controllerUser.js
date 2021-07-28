const { checkPassword } = require('../helper/bcrypt');
const { User } = require('../models');
class ControllerUser {
    static login(req, res) {
        res.render('login')
    }

    static loginPost(req, res) {
        const dataFind = {
            username: req.body.username,
            password: req.body.password
        }

        User.findOne({
            where: {
                username: dataFind.username
            }
        })
            .then(data => {
                const isPasswordMatch = checkPassword(dataFind.password, data.password)
                if (isPasswordMatch) {
                    req.session.isLogin = true
                    res.redirect('/produks')
                } else {
                    res.send('username/password salah')
                }
            })
            .catch((err) => {
                res.send('username/password salah')
            })
    }

    static logout(req, res) {
        req.session.isLogin = false
        res.redirect('/users/login')
    }

    static register(req, res) {
        res.render('register')
    }

    static registerPost(req, res) {
        const dataNew = {
            nama: req.body.nama,
            phone_number: req.body.phone_number,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(dataNew)
            .then(() => {
                res.redirect('/users/login')
            }).catch(err => {
                res.send(err)
            });
    }
}

module.exports = ControllerUser