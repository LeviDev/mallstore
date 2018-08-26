const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fs = require('fs')
const Router = require('koa-router')

let router = new Router()

router.get('/insertGoods', (ctx) => {
    fs.readFile('./data_json/goods.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let goodsData = JSON.parse(data)
            let Goods = mongoose.model('Goods')
            goodsData.map((value, index) => {
                let newGoods = new Goods(value)
                newGoods.save().then(() => {
                    console.log(value)
                }).catch(error=> {
                    console.log(error)
                })
            })
        }
    })

    ctx.body = "正在插入商品数据"
})

module.exports = router