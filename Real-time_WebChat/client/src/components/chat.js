import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import '../stylesheets/chat.css';
import io from "socket.io-client";
import { UserContext } from '../App';

const Chat=()=>{
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);
    const [message,setMessage]=useState("");
    const [chats,setChats]=useState([]);
    let server="http://localhost:3001";
    const socket=io(server);

    useEffect(()=>{
        fetch("/chats",{
            headers:{"Authorization":"Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(data=>{
            console.log("front",data);
            setChats(data.chats);
        }).catch(err=>console.log(err));

        socket.on("output_message",msgFromServer=>{
            console.log("output");
           msgFromServer.map(msg=>setChats(prevChats=>[...prevChats,msg]))
            console.log("After",chats)
        })
    },[])
     
    const sendMsgHandler=()=>{
        if(message!==""){
        let newMessage=message;
        let userId=state._id;
        socket.emit("input_message",{
            newMessage,userId
        })
        setMessage("");
    }
    }

    const logoutHandler=()=>{
        localStorage.clear();
        dispatch({type:"CLEAR"})
        history.push("/login");
    }

    return(
        <>
            <div className="chat-container">
                <div className="bgContainer">
                    <img className="bgImage" src="https://vectorified.com/image/chat-vector-26.jpg" alt="" />
                </div>
            <div className="chatBox">
                <div className="top">
                    <div className="text1">Chat and Connect</div>
                    <button className="logout" onClick={logoutHandler}>Logout</button>
                </div>
                <div className="messages">
                    {chats.map((chat)=>{
                        return (
                            chat.sentBy._id===state._id?<div key={chat._id} className="chatRight"><span className="name">{chat.sentBy.name} -  </span>{chat.message} </div>
                        :<div key={chat._id} className="chatLeft"><span className="name">{chat.sentBy.name} -  </span>{chat.message} </div>
                        )
                        
                    })}
                </div>
                <div className="inputBox">
                    <input type="text" autocomplete="off" name="message" placeholder="Type here...." value={message} onChange={e=>setMessage(e.target.value)} />
                    <button onClick={sendMsgHandler}>Send</button>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Chat;