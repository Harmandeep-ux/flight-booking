const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { z } = require('zod');
const adminModel = require('../Models/adminMode');
const {adminMiddleware} = require('../Middleware/authMiddleware');
const flightModel = require('../Models/flightModel');
const BookingModel = require('../Models/BookingModel');
const userModel = require('../Models/userModel');
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
AdminRouter.get('/totalBookings',adminMiddleware,async(req,res)=>{
    
    const Bookings = await BookingModel.find()
    try{
        if(Bookings.length > 0){
            return res.status(200).json({total:Bookings.length})
        }else{
            res.status(400).json({msg:"something went wrong"})
        }
    }catch(err){
        return res.status(400).json({msg:"error while getting bookings length"})
    }
})

AdminRouter.get('/totalFlights',adminMiddleware,async(req,res)=>{
     
    const totalFlights = await flightModel.find()
    try{
        if(totalFlights.length > 0){
            return res.status(200).json({total: totalFlights.length})
        }else{
          res.status(400).json({msg:'something went wrong'})
        }
    }catch(err){
        return res.status(400).json({msg:'error while getting flights'})
    }
    
})

AdminRouter.get('/totalUsers',adminMiddleware,async(req,res)=>{
    
    const totalUsers = await userModel.find()
    try{
       if(totalUsers.length > 0){
       return res.status(200).json({total: totalUsers.length})
       }else{
        res.status(400).json({msg:"something went wrong"})
       }
    }catch(err){
        return res.status(400).json({msg:'error whule getting users'})
    }
})

//admin delete the user 
AdminRouter.put('/deleteUser/:id',adminMiddleware,async(req,res)=>{

    const userId = req.params.id
     
    try{
        const totalUsers = await userModel.findByIdAndDelete(
            userId
        )

        if(totalUsers){
          return  res.status(200).json({msg:"deleted"})
        }else{
            res.status(400).json({msg:'something went wrong'})
        }

    }catch(err){
        return res.status(400).json({msg:"error while deleting"})
    }
})


 module.exports = AdminRouter