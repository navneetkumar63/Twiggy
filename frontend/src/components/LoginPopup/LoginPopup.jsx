import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {

 const[currentState,setCurrentState] =useState("Login");
 const {url,setToken} = useContext(StoreContext);
 
 const [data,setData]= useState({
  name:"",
  email:"",
  password:""

 })
 const onChangeHandler =(event) =>{
       const name=event.target.name;
       const value=event.target.value;
       setData(data=>({...data,[name]:value}));
 }

 const onLogin = async(event)=>{
    event.preventDefault();
   let newUrl =url;
   if(currentState === "Login"){
    newUrl += '/api/user/login'
   }
   else{
    newUrl += "/api/user/register";
   }
   const response =await axios.post(newUrl,data)

    if(response.data.success){
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token);
         setShowLogin(false);
    }
   else{
    alert(response.data.message)
   }
  }
 useEffect(()=>{
   console.log(data);
 },[data]);


  return (
    <div className='login-popup'>
      <form 
       onSubmit={onLogin}
       className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
        </div>
        <div className='login-popup-input'>
        {currentState === "Login" ? <></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required/>}
       
        <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
        <input name='password' onChange={onChangeHandler} value={data.password} type='passowrd' placeholder='password' required/>

        </div>
        <button type='submit'>{currentState==='Sign Up' ?"Create Account":"Login"}</button>
        <div className='login-popup-condition'>
            <input type='checkbox' required/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==='Login'?
        <p>Create a new account ? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>:
        <p onClick={()=>setCurrentState("Login")}>Already have an account?<span>Login Here</span> </p>}
      </form>
    </div>
  )
}

export default LoginPopup