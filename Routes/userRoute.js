const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
// const Jwt_secret = "12321";
const userModel = require('../Models/userModel');
const {userMiddleware} = require('../Middleware/authMiddleware');
const BookingModel = require('../Models/BookingModel');

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
        return res.json({ token });
    } else {
        return res.json({ msg: 'invalid credentials' });
    }
});



// ✅ GET USER BOOKINGS
userRouter.get('/bookings', userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // From token (middleware)

    const bookings = await BookingModel.find({ user: userId }).populate('flight');
    if(bookings.length == 0){
        res.json({msg:"no bookings for this user"})
    }


    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to get bookings", error: err.message });
  }
});

module.exports = userRouter;

