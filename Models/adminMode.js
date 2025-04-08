const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
   email:String,
   username:String,
   password:String,
   // isAdmin:{type:boolean, default:false}

})

const adminModel = mongoose.model('Admin',AdminSchema)
module.exports = adminModel