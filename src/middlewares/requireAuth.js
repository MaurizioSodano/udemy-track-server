const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req,res,next)=>{

    const {authorization}=req.headers;
  // authorization === 'Bearer laksjdflaksdjasdfklj'

    if(!authorization){
        console.log("Authorization header is null");
        return res.status(401).send({error:"Please log in"});
    }

    const token = authorization.replace("Bearer ","");

    //get user from User
    jwt.verify(token,process.env.MY_SECRET_KEY, async (err,payload)=>{
        if(err){
            console.log(`token error: ${token}`);
            return res.status(401).send({error:"Please log in"});
        }
        const {userId}=payload;

        const user= await User.findById(userId);

        req.user=user;
        next();

        });
  


};