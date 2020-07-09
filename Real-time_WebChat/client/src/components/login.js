import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../stylesheets/auth.css'
import {UserContext} from '../App';

const Login=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");

    const loginHandler=()=>{
        fetch("/login",{
            method:"POST",
            body:JSON.stringify({name,password}),
            headers:{"Content-Type":"application/json"}
          }).then(res=>res.json())
          .then(data=>{
            if(data.error)
            alert(data.error);
            else{
              localStorage.setItem("jwt",data.token);
              localStorage.setItem("user",JSON.stringify(data.user))
              dispatch({type:'USER',payload:data.user})
              history.push('/chats')
            }
          })
    }
    return (
        <div className="auth-container">
            <div className="form">
                <div className="box">
                    <div className="text1">Chat and Connect!</div>
                    <div className="text2">Login</div>
                    <input type="text" autocomplete="off" name="name" placeholder="Enter your username" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="firstbutton" onClick={loginHandler} >Login</button>
                    <br/>
                    <div className="text3">Not a user?</div>
                    <Link to="/signup"><button className="secbutton">Sign Up</button></Link>
                </div>
            </div>
                <div className="bgContainer">
                    <img className="bgImage" src="https://unblast.com/wp-content/uploads/2020/05/Group-Chat-Illustration.jpg" alt="" />
                </div>
        </div>
    )
}

export default Login;