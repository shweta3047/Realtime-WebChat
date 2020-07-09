const express =require("express");
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const {MONGOURI}=require('./keys');
const Chat=require("./models/chat");
const User=require('./models/user');

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',()=>{
    console.log('Database connected!!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connecting to database ',err)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/chat'));

io.on("connection", socket => {
    socket.on("input_message",(msg) =>{
        try {
            let chat = new Chat({ message: msg.newMessage, sentBy:msg.userId })
            chat.save(async(err, data) => {
              console.log(data)
              if(err) return res.json({ success: false, err })
             await Chat.find({ "_id": data._id })
              .populate("sentBy","_id name")
              .exec((err, data)=> {
                console.log("backend", data)
              io.emit("output_message",data);
              })
            })
        } catch (error) {
          console.error(error);
        }
     })
  })

const server=http.listen(3001,()=>{
    console.log('server is listening!!')
})
