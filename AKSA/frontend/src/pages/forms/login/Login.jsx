import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../../../redux/slices/Slice'
import { Audio, ThreeDots } from "react-loader-spinner";




const Login = () => {

  const [userEmail, setuserEmail] = useState('');
  const [Userpassword, setUserpassword] = useState('');
   
  const navigate = useNavigate();

  const {user} = useSelector((state)=> state.auth);

  useEffect(()=>{
    if(user?.token){
      navigate('/')
    } 
  },
  [user]);



  const dispatch = useDispatch();
  
   const { loginloading, loginSuccess, loginError, loginErrorms } = useSelector(
     (state) => state.auth
   );
  const loginhandler = (e) =>{
     e.preventDefault();

    if(!userEmail || !Userpassword){
      alert('please provide Email and password')
      return
    }
  
    const data = {
      userEmail,
      Userpassword
    }
  
    dispatch(login(data))
  }
  return (
    <div>
      <div className={style.container}>
        <div className={style.contact}>
          <div className={style.back}></div>
          <div className={style.cir}></div>
          <p>{loginError ? loginErrorms : ""}</p>
          <div className={style.all}>
            <div className={style.forms}>
              <form onSubmit={loginhandler}>
                <h2>Welcome Again Login</h2>
                <div className={style.line}></div>
                <div className={style.group}>
                  <div className={style.inputType}>
                    <label htmlFor="">Email</label>

                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      value={userEmail}
                      onChange={(e) => setuserEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className={style.inputType}>
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      value={Userpassword}
                      onChange={(e) => setUserpassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className={style.buton}>
                  <button>
                    <i>
                      {loginloading ? (
                        <ThreeDots
                          height="40"
                          width="40"
                          radius="9"
                          color="white"
                        />
                      ) : (
                        "Login"
                      )}
                    </i>
                  </button>
                  <div className={style.lin}>
                    <Link to={"/singup"}>I Need Account</Link>
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

export default Login;
