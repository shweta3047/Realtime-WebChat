const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JWT_SECRET="abc123abc123"

router.post("/login",(req,res)=>{
    const {name,password}=req.body;
    User.findOne({name:name})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Incorrect credentials!"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(passMatch=>{
            if(!passMatch){
                return res.status(422).json({error:"Incorrect credentials!"})
            }
            const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name}=savedUser;
            return res.json({token,user:{_id,name},message:"Succesfully logged in!"})
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router;