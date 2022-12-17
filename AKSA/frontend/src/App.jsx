
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home';
import Navbar from './pages/navbars/Navbar';
import Singup from './pages/forms/singup/Singup';
import Login from './pages/forms/login/Login';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/singup" element={<Singup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  ); 
}

export default App