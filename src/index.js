require("./models/User");
const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

require('dotenv').config();

const authRoutes=require("./routes/authRoutes");

const app=express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri=process.env.DB_HOST

mongoose.connect(mongoUri,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo instance");
})

mongoose.connection.on("error",(err)=>{
    console.error("Error connecting to mongo",err);
})


app.get("/",(req,res)=>{
    res.send("Hi there!");
});

app.listen(3000,()=>{
    console.log("Listening to 3000 port");
})