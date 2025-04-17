const mongoose = require('mongoose');

// const FlightSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   arrivalTime: { type: String, required: true },
//   departureTime: { type: String, required: true },
//   origin: { type: String, required: true },
//   destination: { type: String, required: true },
//   duration: { type: String, required: true },
//   classType: { 
//     type: String, 
//     enum: ['Economy', 'Business', 'First'], 
//     default: 'Economy', 
//     required: true 
//   },
//   price:{type:String,required:true},
//   admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
//   date: { type: Date, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Flight", FlightSchema);


const FlightSchema = mongoose.Schema({
  name: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  classType: { 
    type: String, 
    enum: ['Economy', 'Business', 'First'], 
    default: 'Economy', 
    required: true 
  },
  price: { type: String, required: true },
  availableSeats: { type: Number, required: true },   // 🛫 New Field
  status: { type: String, enum: ['On-Time', 'Delayed', 'Cancelled'], default: 'On-Time' }, // 🛬 New Field
  imageUrl: { type: String },    // 🖼️ (optional, if you want flight photo)
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Flight", FlightSchema);

