import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {register } from "../../../redux/slices/Slice";
import { ThreeDots } from "react-loader-spinner";
import style from "./Singup.module.css";
// iporting 


const Singup = () => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [phone, setphone] = useState('');
  const [location, setlocation] = useState('');
  const [address, setaddress] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');

  const dispatch = useDispatch()

  const registerhandel = (e)=>{
    e.preventDefault();

    if(!fname || !lname ||!phone ||!location ||!address ||!password ||!email){
  
      alert('please provide All')
      return
    };
    const data = {
      useraddress: address,
      userpassword: password,
      userEmail: email,
      userLocation: location,
      userPhone: phone,
      userLname: lname,
      userFname : fname,
    };
  dispatch(register(data));
  };
 
  const { registerloading, iserror, isSuccess, errmesg } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.isSuccess = true) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.contact}>
          <div className={style.back}></div>
          <div className={style.cir}></div>
          <div className={style.all}>
            <div className={style.forms}>
              <form onSubmit={registerhandel}>
                <h2>Welcome To Register</h2>
                <div className={style.line}></div>
                <div className={style.group}>
                  <label htmlFor="">userFname</label>
                  <p>{iserror ? errmesg : ''}</p>
                  <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} placeholder="userFname" required></input>

                  <label htmlFor="">userlname</label>
                  <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} placeholder="userlname" required></input>

                  <label htmlFor="">Phone</label>
                  <input type="phone" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="Phone" required></input>
                  <br />
                  <label htmlFor="">useraddress</label>
                  <input type="text" value={address} onChange={(e) => setaddress
                    (e.target.value)} placeholder="useraddress" required></input>

                  <label htmlFor="">userLocation</label>
                  <input
                    type="text"
                    value={location} onChange={(e) => setlocation(e.target.value)}
                    placeholder="userLocation"
                    required
                  ></input>

                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={email} onChange={(e) => setemail(e.target.value)}
                    placeholder="Email"
                    name="lname"
                    required
                  ></input>
                  <label htmlFor="lname">Password</label>
                  <input
                    type="password"
                    value={password} onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    name=""
                    required
                  ></input>
                </div>
                <div className={style.buton}>
                  <button>  {registerloading ? (
                        <ThreeDots
                          height="40"
                          width="40"
                          radius="9"
                          color="white"
                        />
                      ) : (
                        "REGISTER"
                      )}
             
                  </button>
                  <div>
                    <Link to={"/login"}>I have A Account</Link>
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
