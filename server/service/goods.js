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
            let count = 0
            goodsData.map((value, index) => {
                let newGoods = new Goods(value)
                newGoods.save().then(() => {
                    count++
                    console.log('成功导入:' + count + '条数据')
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    })

    ctx.body = "正在插入商品数据"
})

router.get('/insertCategory', (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            data = JSON.parse(data)
            let Category = mongoose.model('Category')
            let count = 0
            data.RECORDS.map((value, index) => {
                let newCategory = new Category(value)
                newCategory.save().then(() => {
                    cont++
                    console.log('成功导入:' + count + '条数据')
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
            let count = 0
            data.RECORDS.map((value, index) => {
                let newCategorySub = new CategorySub(value)
                newCategorySub.save().then(() => {
                    count++
                    console.log('成功导入:' + count + '条数据')

                }).catch(error => {
                    console.log(error)
                })
            })
        }
    })
    ctx.body = '正在导入商品子类...'
})


router.post('/getDetailInfo', async (ctx) => {
    const goodsId = ctx.request.body.goodsId

    const Goods = mongoose.model('Goods')
    await Goods.findOne({
            ID: goodsId
        }).exec()
        .then(async (response) => {
            console.log(response)
            ctx.body = {
                code: 200,
                message: response
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = {
                code: 500,
                message: error
            }
        })
})


router.get('/listCategory', async (ctx) => {
    // const id = ctx.request.body.ID
    const id = 1
    const Category = mongoose.model('Category')
    await Category.find()
    .sort({
        'SORT' : 1
    })
    .exec()
    .then(async(response) => {
        console.log(response)
        ctx.body = {
            code: 200,
            message: response
        }
    })
    .catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})


router.post('/listCategorySub', async(ctx) => {
    const CategorySub = mongoose.model('CategorySub')
    let categoryId = ctx.request.body.categoryId
    await CategorySub.find({MALL_CATEGORY_ID: categoryId})
    .exec()
    .then(async(response) => {
        ctx.body = {
            code: 200,
            message: response
        }
    })
    .catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.post('/listGoodsBySubId', async(ctx) => {
    let categorySubId = ctx.request.body.categorySubId
    let page = ctx.request.body.page
    const num = 10
    let start = (page - 1) * num
    try {
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
        ctx.body = {
            code: 200,
            message: result
        }
    }
    catch(error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})


module.exports = router
