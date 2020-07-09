const express =require("express");
const router=express.Router();
const Chat=require('../models/chat');
const authRequire=require('../middleware/auth');

router.get("/chats",authRequire,(req,res)=>{
   Chat.find().populate("sentBy","_id name")
   .then(chats=>{
       res.json({chats});
   }).catch(err=>{
       console.log(err)
   })
});

module.exports=router;