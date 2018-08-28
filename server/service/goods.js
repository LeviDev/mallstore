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
                    // console.log(value)
                }).catch(error=> {
                    console.log(error)
                })
            })
        }
    })

    ctx.body = "正在插入商品数据"
})

router.get('/insertCategory', (ctx) =>{
    fs.readFile('./data_json/category.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            data = JSON.parse(data)
            let Category = mongoose.model('Category')
            data.RECORDS.map((value, index) => {
                let newCategory = new Category(value)
                newCategory.save().then(() =>{
                    console.log('成功插入:' )
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    })
    ctx.body = '正在插入分类数据...'
})

router.get('/insertCategorySub', (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            data = JSON.parse(data)
            let CategorySub = mongoose.model('CategorySub')
            data.RECORDS.map((value, index) => {
                let newCategorySub = new CategorySub(value)
                newCategorySub.save().then(() => {
                    console.log('Insert OK')
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    })
    ctx.body = '正在导入商品子类...'
})


router.post('/getDetailInfo', async(ctx) => {
    const goodsId = ctx.request.body.goodsId

    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID: goodsId}).exec()
    .then(async(response) => {
        console.log(response)
        ctx.body = {
            code: 200,
            message: response
        }
    })
    .catch(error=> {
        console.log(error)
        ctx.body = {
            code: 500,
            message: error
        }
    })
})


module.exports = router