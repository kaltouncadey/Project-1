import React, {useEffect} from 'react'
import style from"./Stylehome.module.css";
import {Link} from 'react-router-dom'
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate()

 
  return (
    <div>
      <div className={style.container1}>
        <div className={style.contact}>
          <div className={style.sec}>
            <span style={{ color: "red", fontWeight: "bold" }}>
              <Typewriter
                words={[
                  " WELCOME!",
                  "TO,AKSA",
                  "HOME, TEACHING","COMPANY",
                ]}
                loop={5}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
              possimus assumenda, laudantium blanditiis id your enter tap.
              
            </p>
            <Link><button>I'am teacher</button></Link>
          </div>
          <div className={style.images}>
      
            <div className={style.cir}></div>
            <div className={style.back}></div>
            <img src="./public/1.png" alt="" />
          </div>
        </div>
          <div className={style.all}>
         
          </div>
      </div>
    </div>
  );
}

export default Home


