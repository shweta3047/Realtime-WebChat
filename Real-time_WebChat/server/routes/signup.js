const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require('bcrypt');

router.post("/signup",(req,res)=>{
    const {name,password}=req.body;
    if(!name || !password){
        return res.status(422).json({error:"Please add all fields"})
    }
    else{
        User.findOne({name:name})
        .then(savedUser=>{
            if(savedUser){
                return res.status(422).json({error:"User already exists"})
            }
            bcrypt.hash(password,10)
            .then(hashedPass=>{
                const user=new User({
                    name:name,
                    password:hashedPass
                })
                user.save()
                .then(user=>{
                    return res.json({message:"User details saved successfully!"})
                })
                .catch(err=>{
                    console.log(err);
                })
            }) 
        })
    }
})
module.exports=router;
