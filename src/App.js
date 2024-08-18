
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from './components/Home'
import Alert from './components/Alert'
import About from './components/About'
import NoteState from "./Context/NoteState"
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const [alert, setalert] = useState(null);

  const alertmode = (message, type) => {
    setalert({
      msg: message,
      tpe: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 2000);
  };

  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>  
      
      <Alert alert={alert} />
    <Routes>
        <Route exact path="/" element={<Home alertmode={alertmode}/>}/>
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/signup" element={<Signup alertmode={alertmode} />} />
        <Route exact path="/login" element={<Login alertmode={alertmode} />} />
      </Routes>
        
    </BrowserRouter>
    </NoteState>
    </>
  );
}



export default App;
