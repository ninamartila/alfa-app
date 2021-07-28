const { Produk } = require('../models');

class ControllerProduk {
    static produk(req, res) {
        Produk.findAll()
            .then(dataProduk => {
                res.render('produk', { dataProduk })
            })
    }
}

module.exports = ControllerProduk