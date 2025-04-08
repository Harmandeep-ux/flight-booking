const mongoose = require('mongoose')

const FlightSchema = mongoose.Schema({
  name: String,
  arrivalTime: String,
  departureTime: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  date: Date,
})

module.exports = mongoose.model("Flight", FlightSchema)
