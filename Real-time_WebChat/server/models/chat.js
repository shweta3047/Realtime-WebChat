const mongoose=require('mongoose');
const {ObjectID}=mongoose.Schema.Types

const chatSchema=new mongoose.Schema({
   message:{
       type:String
   },
   sentBy:{
       type:ObjectID,
       ref:"User"
   }
},{timestamps:true})

module.exports = mongoose.model('Chat', chatSchema);
