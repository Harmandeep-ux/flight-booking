const express = require('express');
const BookingModel = require('../Models/BookingModel');
const { userMiddleware } = require('../Middleware/authMiddleware');

const BookingRoute = express.Router();

// ✅ BOOK A FLIGHT
BookingRoute.post('/book', userMiddleware, async (req, res) => {
  try {
    const { flight, bookingDate } = req.body;
    const userId = req.user.id; // From token (middleware)

    // Step 1: Create booking
    const booking = new BookingModel({
      user: userId,
      flight,
      bookingDate,
    });

    // Step 2: Save it into DB
    await booking.save();

    // Step 3: Populate user and flight fields
    const populatedBooking = await BookingModel.findById(booking._id)
      .populate({
        path: 'user',
        select: '-password' // Exclude password
      })
      .populate('flight');

    res.status(201).json({
      msg: "Booking successful",
      booking: populatedBooking,
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Booking failed", error: err.message });
  }
});

module.exports = BookingRoute;
