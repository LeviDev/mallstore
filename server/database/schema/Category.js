const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new Schema({
    ID: {unique:true, type:String},
    MALL_CATEGORY_NAME: String,
    IMAGE: String,
    TYPE: Number,
    SORT: Number,
    COMMENTS: String
})

mongoose.model('Category', categorySchema)