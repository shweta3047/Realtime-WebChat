const express =require("express");
const app=express();
const PORT=process.env.port||3001
const http=require('http').Server(app);
const io=require('socket.io')(http);
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const {MONGOURI}=require('./config/keys');
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
              .populate("sentBy","_id name createdAt")
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

  if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
  }

const server=http.listen(PORT,()=>{
    console.log('server is listening!!')
})
