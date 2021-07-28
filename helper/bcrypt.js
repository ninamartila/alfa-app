const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10)

function hasPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, salt)
}

function checkPassword(plainPassword, hasPassword) {
    return bcrypt.compareSync(plainPassword, hasPassword)
}

module.exports = { hasPassword, checkPassword }