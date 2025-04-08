const jwt = require('jsonwebtoken')

const userMiddleware = (req,res,next)=>{
    try{
        const token = req.headers.token
        if(!token){
         return res.status(401).json({error:"invalid"})
        }
        if(token){
         const decoded = jwt.verify(token,process.env.Jwt_User_secret)
         req.user = decoded
         next()
        }
    }catch(err){
        return res.status(401).json({msg:'invalid'})
    }
}

//admin middleware

const adminMiddleware = (req,res,next)=>{
    const token = req.headers.token
   try{
       if(!token){
           return res.status(401).json({msg:"invalid No admin Acess"})
       }
       if(token){
        const decoded = jwt.verify(token,process.env.Jwt_Admin_secret)
        // if(!decoded.isAdmin){
        //     return res.status(401).json({msg:"access denied"})
        // }
        req.admin = decoded
        next()
       }

   }catch(err){
    return res.status(401).json({msg:"invalid no access"})
   }
}

module.exports ={adminMiddleware,userMiddleware}