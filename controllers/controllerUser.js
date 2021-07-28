const { render } = require('ejs');
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
                    res.redirect(`/produks/${data.id}`)
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

    static user(req, res) {
        const dataIdUser = Number(req.params.idUser)

        User.findByPk(dataIdUser)
            .then(dataUser => {
                res.render('user', { dataUser, dataIdUser })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userEdit(req, res) {
        const dataIdUser = Number(req.params.idUser)

        User.findByPk(dataIdUser)
            .then(dataUser => {
                res.render('userEdit', { dataUser, dataIdUser })
            })
    }

    static userEditPost(req, res) {
        const dataUpdate = {
            idUser: Number(req.params.idUser),
            nama: req.body.nama,
            phone_number: req.body.phone_number,
            email: req.body.email,
            username: req.body.username,
        }

        console.log(dataUpdate);
        User.update(dataUpdate, {
            where: {
                id: dataUpdate.idUser
            }
        })
            .then(() => {
                res.redirect(`/users/${dataUpdate.idUser}`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser