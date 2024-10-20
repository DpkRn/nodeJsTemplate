// src/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios'
import './LoginPage.css';

const LoginPage = () => {
    
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const handleClick=async(e)=>{
       
        try{
            const res=await axios.post('http://localhost:8080/login',{email,password});
            console.log('done')

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>facebook</h1>
          <p>Connect with friends and the world around you.</p>
        </div>

        <div className="login-right">
          <div className="login-form">
            <input type="text" placeholder="Email or phone number" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="login-button" onClick={(e)=>handleClick(e)}>Log In</button>
            <a href="#" className="forgot-password">Forgot password?</a>
            <hr />
            <button className="create-account">Create new account</button>
          </div>
        </div>
      </div>

      <footer>
        <ul>
          <li>About</li>
          <li>Help</li>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
        <p>© 2024 Clone, Inc.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
