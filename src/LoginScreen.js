
import React from 'react';
import { Button } from '@mui/material';
import {auth, provider} from './firebase.js';
import './LoginScreen.css';
import { signInWithPopup } from 'firebase/auth';

import { useUserContext } from './UserContext.js';





function LoginScreen() {

  const {
    setUserData,
    setIsLoggedIn} = useUserContext();
  
  const signIn = () =>{
    signInWithPopup(auth, provider).then((result)=>{
      setIsLoggedIn(true);
      setUserData(result);
      
    }).catch((err)=>{
      console.log(err);
    })
  }


  

  return (
    
    <div className="login">
      <div className='login__container'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png' alt="whatsapp"></img>

        <div className='login__containerText'>
          <h1>Sign in to Whatsapp</h1>
        </div>

        <Button onClick={signIn}>
          Sign In With Google
        </Button>
        
      </div>
    </div>

  )
}

export default LoginScreen;
