const mogoose = require('mongoose')
const Schema = mogoose.Schema
let ObjectId = Schema.ObjectId
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    UserId: ObjectId,
    userName: {unique:true, type:String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
})

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})

userSchema.statics = {
    comparePassword:(pwd1, pwd2) =>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(pwd1, pwd2, (err, isMatch) =>{
                if (err) {
                    reject(err)
                } else {
                    resolve(isMatch)
                }
            })
        })
    }
}

mogoose.model('User', userSchema)