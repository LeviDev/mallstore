const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const mogoose = require('mongoose')



app.use(async(ctx) => {
    ctx.body = '<h1> Hello Koa2 </h1>'
})


;(async() => {
    await connect()
    initSchemas()
    const User = mogoose.model('User')
    let oneUser = new User({
        userName: "Levi.xie",
        password: "123456"
    })
    oneUser.save().then(()=> {
        console.log('Insert successfully')
    })
    let user = await User.findOne({})

})()

app.listen(3000, () =>{
    console.log("Server started at port :3000")
})