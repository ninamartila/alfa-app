const { Produk, Order } = require('../models');

class ControllerProduk {
    static produk(req, res) {
        const dataUserId = Number(req.params.UserId)
        Produk.findAll()
            .then(dataProduk => {
                res.render('produk', { dataProduk, dataUserId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addOrder(req, res) {
        let dataOrder
        const dataId = {
            UserId: Number(req.params.UserId),
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
                const dataKeranjang = {
                    UserId: dataId.UserId,
                    ProdukId: dataId.ProdukId,
                    quantity: 1,
                    total_harga: dataOrder.harga_produk,
                    status: 'cart'
                }
                return Order.create(dataKeranjang)
            })
            .then(() => {
                res.redirect(`/produks/${dataId.UserId}`)
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = ControllerProduk