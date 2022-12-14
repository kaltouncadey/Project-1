
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Singup';
import Home from './pages/home/Home';
import SiginUp from './pages/Login';
import Navbar from './pages/navbars/Navbar';

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/singup" element={<SiginUp />}></Route> */}
        </Routes>
        
      </Router>
    </div>
  ); 
}

export default App