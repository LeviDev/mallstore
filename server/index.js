const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const mogoose = require('mongoose')
const Router = require('koa-router')

const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')


app.use(bodyParser())
app.use(cors())

let user = require('./service/user.js')


let router = new Router()
router.use('/user', user.routes())

app.use(router.routes(),router.allowedMethods())

app.use(async(ctx) => {
    ctx.body = '<h1> Hello Koa2 </h1>'
})


;(async() => {
    await connect()
    initSchemas()
})()

app.listen(3000, () =>{
    console.log("Server started at port :3000")
})