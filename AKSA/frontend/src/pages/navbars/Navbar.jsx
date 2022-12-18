import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./StyleNav.css";
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import {logout} from '../../redux/slices/Slice'


const Navbar = () => {
  const { user } = useSelector((state)=> state.auth);

  const [showbtn, setshowbtn] = useState(false)

  const dispatch = useDispatch()

   const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(()=>{
    if(user?.token){
      setshowbtn(false)
      return
    }
    setshowbtn(true)
  },[user])

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
   {showbtn ? (
    <>
      <div className="btn">
    
     <div className="b1">
       <button>
      <Link to={'/login'}><li>Login</li></Link>
      </button>
     </div>
      <div className="b2">
          <button className='register'>
      <Link to={'/singup'}><li>register</li></Link>
      </button>
      </div>
     <div className="hamburger" onClick={handleNav}>
      { !nav ?(<i className="fa-sharp fa-solid fa-bars menus"></i>): <i class="fa-sharp fa-solid fa-xmark minus"></i>}
     </div>
     </div>
    </>
     ):
     <>
     <div className="buttn">
     
      <li onClick={logoutHandler}>Logout</li>
   
      <li onClick={logoutHandler}>dashboard</li>
     </div>
   </>}
     
     {/* ================ button ================== */}
      </div>
      </div>
    </div>
  )
}

export default Navbar