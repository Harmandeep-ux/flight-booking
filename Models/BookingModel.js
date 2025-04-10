 const mongoose = require('mongoose')

// const bookingSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
//     bookingDate: { type: Date, default: Date.now }
//   });
  
//   module.exports = mongoose.model('Booking', bookingSchema);

  // new
  const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    bookingDate: { type: Date, default: Date.now },
    avaliableSeats:{type:Number, default:10},
    seatsBooked: { type: Number, default: 1 },   // 🪑 New Field: How many seats user booked
    status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' }  // ❌ if user cancels
  });
  
  module.exports = mongoose.model('Booking', bookingSchema);
