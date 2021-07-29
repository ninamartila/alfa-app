const { Produk, Order, User } = require('../models');

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

    static keranjang(req, res) {
        const dataUserId = Number(req.params.UserId)

        Order.findAll({
            attributes: ["ProdukId", "UserId", "total_harga", "quantity", "status", "createdAt", "updatedAt", 'id'],
            where: {
                status: 'cart',
                UserId: dataUserId
            },
        })
            .then(async dataOrder => {
                let temp = []
                for (let index = 0; index < dataOrder.length; index++) {
                    const element = dataOrder[index];
                    const dataProduk = await Produk.findByPk(element.ProdukId)
                    temp.push({ ...dataProduk.dataValues, ...element.dataValues })
                }
                const result = []
                temp.forEach(item => {
                    const existedIndex = result.findIndex(itm => itm.ProdukId === item.ProdukId)
                    if (existedIndex !== -1) {
                        result[existedIndex].quantity += item.quantity
                        result[existedIndex].total_harga += item.total_harga
                    } else {
                        result.push(item)
                    }
                })
                res.render('keranjang', { dataProduk: result, dataUserId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static seeProduk(req, res) {
        const dataUserId = Number(req.params.UserId)
        const dataId = Number(req.params.id)

        Produk.findByPk(dataId)
            .then(dataProduk => {
                res.render('seeProduk', { dataProduk, dataUserId })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static readyOrder(req, res) {
        const dataUserId = Number(req.params.UserId)

        Order.findAll({
            attributes: ["ProdukId", "UserId", "total_harga", "quantity", "status", "createdAt", "updatedAt", 'id'],
            where: {
                status: 'cart',
                UserId: dataUserId
            },
        })
            .then(data => {
                data.forEach(item => {
                    Order.update({ status: 'order' }, {
                        where: {
                            id: item.id
                        }
                    })
                })
            })
            .then(() => {
                res.redirect(`/produks/${dataUserId}`)
            })
    }

    static historyOrder(req, res) {
        const dataUserId = Number(req.params.UserId)

        Order.findAll({
            attributes: ["ProdukId", "UserId", "total_harga", "quantity", "status", "createdAt", "updatedAt", 'id'],
            where: {
                status: 'order',
                UserId: dataUserId
            },
        })
            .then(async dataOrder => {
                let temp = []
                for (let index = 0; index < dataOrder.length; index++) {
                    const element = dataOrder[index];
                    const dataProduk = await Produk.findByPk(element.ProdukId)
                    temp.push({ ...dataProduk.dataValues, ...element.dataValues })
                }
                const result = []
                temp.forEach(item => {
                    const existedIndex = result.findIndex(itm => itm.ProdukId === item.ProdukId)
                    if (existedIndex !== -1) {
                        result[existedIndex].quantity += item.quantity
                        result[existedIndex].total_harga += item.total_harga
                    } else {
                        result.push(item)
                    }
                })
                res.render('historyOrder', { dataProduk: result, dataUserId })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerProduk