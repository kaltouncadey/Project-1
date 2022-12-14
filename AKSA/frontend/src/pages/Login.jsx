import  {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



  
const Login = () => {

const [userFname, setuserFname] = useState("");
const [userLname, setuserLname] = useState("");
const [userPhone, setuserPhone] = useState("");
const [userLocation, setuserLocation] = useState("");
const [useraddress, setuseraddress] = useState("");
const [userEmail, setuserEmail] = useState("");
const [Userpassword, setUserpassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!userFname || !userLname ||!userPhone ||!userLocation ||!userEmail ||!useraddress  ||!Userpassword) {
      alert('Please provide all');
      return;
    }

    try {
        const response = await axios.post(
          "http://localhost:5000/api/users/post",
          {
            userFname,
            userLname,
            userPhone,
            userLocation ,
            userEmail,
            useraddress,
            Userpassword
          }
        );

      localStorage.setItem('useData', JSON.stringify(response.data))
     console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="container w-[60%] mx-auto">
        <form onSubmit={registerHandler}>
          <h1 className="text-center">Welcome, Please Register</h1>
          <div className="inputGroup">
            <label htmlFor="text">First Name</label>
            <div>
              <input
                type="text"
                value={setuserFname}
                onChange={(e) => setuserFname(e.target.value)}
                className="border py-2 px-3 w-full"
                placeholder="Enter your FirstName"
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="text">Last Name</label>
            <div>
              <input
                type="text"
                value={setuserLname}
                onChange={(e) => setuserLname(e.target.value)}
                className="border py-2 px-3 w-full"
                placeholder="Enter your Last Name"
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="phone">Phone</label>
            <div>
              <input
                type="text"
                value={setuserPhone}
                onChange={(e) => setuserPhone(e.target.value)}
                className="border py-2 px-3 w-full"
                placeholder="Enter your Phone Number"
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="text">Location</label>
            <div>
              <input
              type="text"
                value={setuserLocation}
                onChange={(e) => setuserLocation(e.target.value)}
                className="border py-2 px-3 w-full"
                placeholder="Enter your Location"
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="text">Address</label>
            <div>
              <input type='text'
                value={setuseraddress}
                onChange={(e) => setuseraddress(e.target.value)}
               
                className="border py-2 px-3 w-full"
                placeholder="Enter your  address"
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <div>
              <input type='email'
                value={setuserEmail}
                onChange={(e) => setuserEmail(e.target.value)}
             
                className="border py-2 px-3 w-full"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="text">Password</label>
            <div>
              <input type='password'
                value={setUserpassword}
                onChange={(e) => setUserpassword(e.target.value)}
              
                className="border py-2 px-3 w-full"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="inputGroup">
            <button className="p-4 my-5 bg-blue-600 text-white rounded-sm">
              Register
            </button>
          </div>

          <div>
            <p>
              need new account ? <Link to="/register">please Login</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );

}


export default Login