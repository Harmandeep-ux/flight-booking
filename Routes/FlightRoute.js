const express = require('express')
const flightRouter = express.Router()
const flightModel = require('../Models/flightModel')
const {adminMiddleware} = require('../Middleware/authMiddleware')
const { populate } = require('../Models/adminMode')

//create
flightRouter.post('/createFlight',adminMiddleware,async(req,res)=>{
 
    const {name,arrivalTime,departureTime,date,destination,origin,duration,classType,price, imageUrl ,availableSeats,status} = req.body
   try{

      const flight = await flightModel.create({
             name,
             arrivalTime,
             departureTime,
             origin,
             destination,
             duration,
             classType,
             admin:req.admin.id,
             date,
             availableSeats,
             status,
             price,
             imageUrl 
       })
       res.status(200).json({flight},"created Succesfully")
    //    console.log(flightModel.id)
    }catch(e){
        res.status(400).json({msg:"error while createing FLight"})
    }
})
flightRouter.put('/updateFlight/:id',adminMiddleware,async(req,res)=>{

    const flightId = req.params.id;
    const updates = req.body;

    try{
   const updatedFlight = await flightModel.findByIdAndUpdate(
    flightId,
    updates,
    {new: true}
   )

   if(!updatedFlight){
    return res.status(400).json({msg:"Flight not Found"})
   }else{
    res.status(200).json({updatedFlight})
   }
    }catch(err){
     return res.status(400).json({msg:'error while updating'})
    }
    
})
flightRouter.delete('/DeleteFlight',adminMiddleware,(req,res)=>{

})

// flightRouter.get('/searchFlights',async(req,res)=>{

//     const {name,origin,destination,classType,price} = req.query

//     const query ={}

//     const orConditions = []

//     if(destination){
//     orConditions.push({destination: {$regex:destination , $options:"i" }})
    
//     }
//     if(origin){
//       orConditions.push({origin:{$regex:origin, $options:"i"}})
//     }
//     if(orConditions.length > 0){
//         query.$or = orConditions
//     }
//     if(price){
//         query.price = {$lte:price, }
//     }
//     if(classType){
//         query.classType = {$regex:classType , $options:"i"}
//     }

//     if(name){
//         query.name = {$regex:name, $options:"i"}
//     }

//     const flight =await flightModel.find(query)
//     res.status(200).json({flight})
// })
module.exports = flightRouter