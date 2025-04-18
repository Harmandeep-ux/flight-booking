const express = require('express');
const BookingModel = require('../Models/BookingModel');
const { userMiddleware } = require('../Middleware/authMiddleware');

const BookingRoute = express.Router();

// ✅ BOOK A FLIGHT
BookingRoute.post('/book', userMiddleware, async (req, res) => {
  try {
    const { flight, bookingDate ,seatsBooked} = req.body;
    const userId = req.user.id; // From token (middleware)

    // Step 1: Create booking
    
    
    const booking = new BookingModel({
      user: userId,
      flight,
      bookingDate,
      seatsBooked
    });
    
   //check kiti seat avaliablity
    if(booking.avaliableSeats < seatsBooked){
      res.json({msg:"not enough seats avaliable"})
    }
      
    booking.avaliableSeats = booking.avaliableSeats - seatsBooked
    await booking.save();
   


    // Step 3: Populate user and flight fields
    const populatedBooking = await BookingModel.find(booking._id)
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

//ticket of booking
BookingRoute.get('/ticket/:bookingid',userMiddleware,async(req,res)=>{

  const {bookingid} = req.params
 try{
   const booking = await BookingModel.findById(bookingid)
   .populate({
    path:'user',
    select:'email username'
   })
   .populate({
    path:'flight',
    select: 'name origin destination departureTime arrivalTime classType price date',
   })
 
   if(!booking){
    res.status(404).json({msg:"no ticket "})
   }else{
    res.status(200).json({booking})
   }
  }catch(err){
    res.json({err})
  }
})

BookingRoute.get('/sorting', userMiddleware, async (req, res) => {
  const { sort } = req.query;

  const userId = req.user.id;

  let sortoption = {};

  if (sort === "newest") {
    sortoption = { bookingDate: -1 }; // Newest first
  } else if (sort === "oldest") {
    sortoption = { bookingDate: 1 }; // Oldest first
  }

  try {
    const sorting = await BookingModel.find({ user: userId }).sort(sortoption).populate('flight','name')
    res.json({
      bookings: sorting
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = BookingRoute;
