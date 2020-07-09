import React,{useContext,useReducer,createContext,useEffect} from 'react';
import Login from './components/login';
import Signup from './components/Signup';
import Chat from './components/chat';
import {initialState,reducer} from './reducers/userAuth';
import { BrowserRouter, Route ,Switch,useHistory, Redirect} from "react-router-dom";

export const UserContext=createContext();

const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith("/signup"))
      history.push("/login")
    }
  },[])
  return(
    <>
    <Switch>
      <Route path="/login"><Login/></Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/chats"><Chat/></Route>
    </Switch>
    </>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
   <>
   <BrowserRouter>
      <Routing/>
   </BrowserRouter>
   </>
   </UserContext.Provider>
  );
}

export default App;
