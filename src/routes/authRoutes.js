const express = require("express");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {
        email,
        password
    } = req.body;
 
  try{
    const user = new User({
        email,
        password
    });
    await user.save();
    //console.log(process.env.MY_SECRET_KEY);
    const token=jwt.sign({userId:user._id},process.env.MY_SECRET_KEY)
    res.send({token})
    } catch (err){
        res.status(422).send(err.message);
    }
});

router.post("/signin", async (req,res)=>{
    const {email,password}=req.body;

    if (!email || !password){
        res.status(422).send({error:"Must provide email and password"});
    }
    const user=await User.findOne({email});
    if (!user){
        res.status(422).send({error:"Invalid email and password"});
    }
    try {
        await user.comparePassword(password);
        const token=jwt.sign({userId:user._id},process.env.MY_SECRET_KEY);
        res.send({token});

    } catch(err){
        res.status(422).send({error:"Invalid email and password"});
    }
})
module.exports = router;