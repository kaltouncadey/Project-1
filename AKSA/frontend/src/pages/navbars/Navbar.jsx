import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./StyleNav.css";



function Navbar() {
  const [nav, setnav] = useState(false)
  const handleNav = () =>setnav(!nav)
  return (
    <div className='container'>
     <div className="all">
     <div className="header">
     <Link to='/'><li> <h1><span>A</span>K<span>S</span>A</h1></li></Link>
  
   <ul className={nav ? 'menu active ' : 'menu'}>

     <Link to='/'><li>Home</li></Link>
      <Link><li>Contact Us</li></Link>
      <Link><li>About</li></Link>
      <Link><li>Teachers</li></Link>
   </ul>
     
     {/* ================ button ================== */}
     <div className="btn">
    
     <div className="b1">
       <button>
      <li>login</li>
      </button>
     </div>
      <div className="b2">
          <button className='register'>
    <li>register</li>
      </button>
      </div>
     <div className="hamburger" onClick={handleNav}>
      { !nav ?(<i class="fa-sharp fa-solid fa-bars menus"></i>): <i class="fa-sharp fa-solid fa-xmark minus"></i>}
     </div>
     </div>
     
     {/* ================ button ================== */}
      </div>
       
      </div>
    </div>
  )
}

export default Navbar