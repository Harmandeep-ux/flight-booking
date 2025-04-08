const express = require('express')
const flightRouter = express.Router()
const flightModel = require('../Models/flightModel')
const {adminMiddleware} = require('../Middleware/authMiddleware')

//create
flightRouter.post('/createFlight',adminMiddleware,async(req,res)=>{
 
    const {name,arrivalTime,departureTime,date} = req.body
   try{

       await flightModel.create({
             name,
             arrivalTime,
             departureTime,
             admin:req.admin.id,
             date
       })
       res.status(200).json({msg:"flight created successfully"})
    //    console.log(flightModel.id)
    }catch(e){
        res.status(400).json({msg:"error while createing FLight"})
    }
})
module.exports = flightRouter