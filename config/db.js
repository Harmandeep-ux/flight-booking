const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/flightBooking')
.then(()=>console.log('connected to mongodb'))
.catch(()=>console.log('error'))