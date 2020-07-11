import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { Input,Button } from '@material-ui/core';
import '../stylesheets/auth.css'

const Signup=()=>{
    const history=useHistory();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    
    const signupHandler=()=>{
        fetch("/signup",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,password})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error)
            alert(data.error);
            else
            alert(data.message);
            history.push("/login");
        })
    }
    return (
        <div className="auth-container">
            <div className="bgContainer">
            <img className="bgImage" src="https://unblast.com/wp-content/uploads/2020/05/Group-Chat-Illustration.jpg" alt="" />
            </div>
            <div className="form">
                <div className="box">
                <div className="text1">Chat and Connect!</div>
                    <div className="text2">Sign Up</div>
                    <input type="text" autocomplete="off" name="name" placeholder="Enter your username" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="password" name="password" placeholder="Create password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <button className="firstbutton" onClick={signupHandler} >Signup</button>
                    <br/>
                    <div className="text3">Already a user?</div>
                    <Link to="/login"> <button className="secbutton">Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;