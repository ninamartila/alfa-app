const { checkPassword } = require('../helper/bcrypt');
const { User } = require('../models');
const nodemailer = require('nodemailer');


class ControllerUser {
    static login(req, res) {
        const welcome = User.getKode()
        res.render('login', { welcome })
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

        User.findOne({ where: { email: req.body.email } })
            .then((result) => {
                if(result) {
                    const err = "Not Found"
                    res.send(err)
                } else {
                    return User.create(dataNew)
                }
            })
            .then(() => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'alfa.app14@gmail.com',
                        pass: 'alfaapp123'
                    }
                })

                const mailOptions = {
                    from: 'alfa.app14@gmail.com',
                    to: req.body.email,
                    subject: "Register",
                    text: 'WELCOME TO ALFA APP'
                }

                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.redirect('/users/login')
                    }
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static user(req, res) {
        const dataUserId = Number(req.params.UserId)

        User.findByPk(dataUserId)
            .then(dataUser => {
                res.render('user', { dataUser, dataUserId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userEdit(req, res) {
        const dataUserId = Number(req.params.UserId)

        User.findByPk(dataUserId)
            .then(dataUser => {
                res.render('userEdit', { dataUser, dataUserId })
            })
    }

    static userEditPost(req, res) {
        const dataUpdate = {
            UserId: Number(req.params.UserId),
            nama: req.body.nama,
            phone_number: req.body.phone_number,
            email: req.body.email,
        }

        User.update(dataUpdate, {
            where: {
                id: dataUpdate.UserId
            }
        })
            .then(() => {
                res.redirect(`/users/${dataUpdate.UserId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userDelete(req, res) {
        const dataUserId = Number(req.params.UserId)

        User.destroy({
            where: {
                id: dataUserId
            }
        })
            .then(() => {
                res.redirect('/users/login')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser