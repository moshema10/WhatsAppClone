import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import { useUserContext } from './UserContext.js';

function App() {

  

  const {isLoggedIn} = useUserContext();

  return (

      <div className="app">

      {!isLoggedIn ? (
        <LoginScreen></LoginScreen>
      ):
      (
        <div className="app__body">

          <Routes>

            <Route exact path='/' element={<Sidebar></Sidebar>}></Route>
            <Route exact path='/rooms' element={<Sidebar></Sidebar>}></Route>
            <Route exact path='/rooms/:roomid' element={[<Sidebar></Sidebar>,<Chat></Chat>]}></Route>
            
          </Routes>


        </div>
      )

      }


      </div>


  );
}

export default App;
