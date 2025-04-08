 const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
    bookingDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Booking', bookingSchema);
  
// const mongoose = require('mongoose')
// const BookingSchema = mongoose.Schema({
//     user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
//     flight:{type:mongoose.Schema.Types.ObjectId, ref:"FLIGHT"},
//     bookingDate:{type:date, default:Date.now}
// })

// module.exports = mongoose.model("Booking",BookingSchema)