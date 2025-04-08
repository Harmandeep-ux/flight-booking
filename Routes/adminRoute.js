const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { z } = require('zod');
const adminModel = require('../Models/adminMode');
const {adminMiddleware} = require('../Middleware/authMiddleware')
const AdminRouter = express.Router()

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

const signSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

AdminRouter.post('/signup',async(req,res)=>{
    const { email, username, password } = req.body;

    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const hash = await bcrypt.hash(password, 10);
    try {
        await adminModel.create({
            email,
            username,
            password: hash
        });
        res.json({ msg: "Admin Signedup" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})
AdminRouter.post('/signin',async (req,res)=>{
    const { email, password } = req.body;

    const validation = signSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const user = await adminModel.findOne({ email });

    if (!user) {
        return res.json({ msg: 'invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = jwt.sign({ id: user._id}, process.env.Jwt_Admin_secret);
        return res.json({ token });
    } else {
        return res.json({ msg: 'invalid credentials' });
    }
});

AdminRouter.put('/updateBookings',adminMiddleware,(req,res)=>{
    res.send("hii")
})
AdminRouter.get('/bookings',adminMiddleware,(req,res)=>{
    res.send("hii")
})

 module.exports = AdminRouter