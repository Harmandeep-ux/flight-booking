const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
// const Jwt_secret = "12321";
const userModel = require('../Models/userModel');
const {userMiddleware} = require('../Middleware/authMiddleware');
const BookingModel = require('../Models/BookingModel');
const flightModel = require('../Models/flightModel')

const userRouter = express.Router();

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

const signSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

//  Signup route
userRouter.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;


    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const hash = await bcrypt.hash(password, 10);
    try {
        await userModel.create({
            email,
            username,
            password: hash
        });
        res.json({ msg: "userSignedup" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Signin route
userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log( email, password)

    const validation = signSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.json({ msg: 'invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = jwt.sign({ id: user._id,}, process.env.Jwt_User_secret);
        return res.status(200).json({ token, msg: "Login successful" });    } else {
        return res.json({ msg: 'invalid credentials' });
    }
});



// ✅ GET USER BOOKINGS
userRouter.get('/bookings', userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // From token (middleware)

    const bookings = await BookingModel.find({ user: userId }).populate('flight').populate('user');
    if(bookings.length == 0){
        res.json({msg:"no bookings for this user"})
    }


    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to get bookings", error: err.message });
  }
});


// Cancel Booking
userRouter.delete('/cancelBooking/:bookingId', userMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      const bookingId = req.params.bookingId;
  
      // Find the booking first
      const booking = await BookingModel.findOne({ _id: bookingId, user: userId });
  
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found or not authorized" });
      }
  
      // Optionally: increase seat count (if you maintain availableSeats in DB)
      // You can implement this if you're managing seat availability dynamically.
  
      await BookingModel.findByIdAndDelete(bookingId);
  
      res.status(200).json({ msg: "Booking canceled successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to cancel booking" });
    }
  });
  
// userRouter.get('/bookings',async(req,res)=>{

//     //  const Bookings =await BookingModel.find()
//      const Bookings =await BookingModel.find().populate('flight').populate('user')
//         if(Bookings.length > 0){
//           res.json({Bookings})
//         }else{
//             res.json({msg:"no bookings avaliable"})
//         }
    
// })

userRouter.get("/allFlights",async(req,res) =>{
    try{
       const flights = await flightModel.find()
       if(flights.length >0){
        res.json({flights})
       }else{
        res.json({msg:"no flights are available right now"})
       }
    }catch(err){
        res.json({err})
    }
})

module.exports = userRouter;

