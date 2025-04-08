const mongoose = require('mongoose')
const { boolean } = require('zod')

const UserSchema = new mongoose.Schema({
   email:String,
   username:String,
   password:String,
   
})

const userModel = mongoose.model('User',UserSchema)
module.exports = userModel