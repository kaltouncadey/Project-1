import React from "react";
import { Link } from "react-router-dom";
import style from "./Singup.module.css";
const Singup = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.contact}>
          <div className={style.back}></div>
          <div className={style.cir}></div>
          <div className={style.all}>

          <div className={style.forms}>
            <form>
              <h2>Welcome To Register</h2>
              <div className={style.line}></div>
               <div className={style.group}>

              <label for="fname">userFname</label> <br />
              <input type="text" placeholder="userFname" required></input>{" "}
              <br />
              <label for="lname">userlname</label> <br />
              <input type="text" placeholder="userlname" required></input>{" "}
              <br />
              <label for="lname">userEmail</label> <br />
              <input type="text" placeholder="userEmail" required></input>{" "}
              <br />
              <label for="lname">useraddress</label> <br />
              <input
                type="text"
                placeholder="useraddress"
                required
              ></input>{" "}
              <br />
              <label for="lname">userLocation</label> <br />
              <input
                type="text"
                placeholder="userLocation"
                required
              ></input>{" "}
              <br />
              <label for="lname">userPhone</label> <br />
              <input
                type="text"
                placeholder="userphone"
                name="lname"
                required
              ></input>{" "}
              <br />
                </div> 
              <div className={style.buton}>
                <button>submite</button>
                <div>
                   <Link to={'/login'}>I have A Account</Link>
                </div>
              </div>
            </form>
          </div>
          </div>

          <div className={style.images}>
            <img src="./public/3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
