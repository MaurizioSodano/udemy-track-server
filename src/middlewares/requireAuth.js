const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const User = mongoose.model("User");

module.exports = (req,res,next)=>{

    const {authorization}=req.headers;

    if(!authorization){
        return res.status(401).send({error:"Please log in"});
    }

    const token = authorization.replace("Bearer ","");

    //get user from User
    jwt.verify(token,process.env.MY_SECRET_KEY, async (err,payload)=>{
        if(err){
            return res.status(401).send({error:"Please log in"});
        }
        const {userId}=payload;
        const user= await User.findById(userId);

        req.user=user;
        //return user.mail and next
        next();

        })
  


}