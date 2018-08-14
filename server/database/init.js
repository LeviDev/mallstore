const mongoose = require('mongoose')
const db = 'mongodb://localhost/mallstore'
const {resolve} = require('path')
const glob = require('glob')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
    mongoose.connect(db)
    let maxRetryTimes = 5

    return new Promise((resolve, reject) => {

        mongoose.connection.on('disconnected', () => {
            console.log("***Database disconnected")
            if (maxRetryTimes >= 0) {
                maxRetryTimes--
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('***Database disconnected!')
            }
        })
    
        mongoose.connection.on('error', err=> {
            console.log("***Database error")
            if (maxRetryTimes >= 0) {
                maxRetryTimes--
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('***Database connect error!')
            }
        })  

        mongoose.connection.once('open', () => {
            console.log("Database open")
            resolve()
        })
    })
}