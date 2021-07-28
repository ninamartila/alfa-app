const { Produk, Order } = require('../models');

class ControllerProduk {
    static produk(req, res) {
        const dataIdUser = Number(req.params.idUser)
        Produk.findAll()
            .then(dataProduk => {
                res.render('produk', { dataProduk, dataIdUser })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addOrder(req, res) {
        let dataOrder
        const dataId = {
            UserId: Number(req.params.idUser),
            ProdukId: Number(req.params.id)
        }

        Produk.findByPk(dataId.ProdukId)
            .then(dataProduk => {
                dataOrder = dataProduk
                let stok_produk = +dataProduk.stok_produk - 1
                return Produk.update({ stok_produk }, {
                    where: {
                        id: dataId.ProdukId
                    }
                })
            })
            .then(() => {
                res.redirect(`/produks/${dataNew.UserId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerProduk