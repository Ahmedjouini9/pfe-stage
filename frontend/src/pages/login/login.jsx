
import "./login.css"
import React, { useState,useEffect} from 'react'
import {Link,useNavigate } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import { login } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import facebook from '../../assets/facebook.png'
import google from '../../assets/glogo.png'



const initialState = {
  email: "",
  password: "",
};


 const Login = () => {
   const [user, setUser] = useState(initialState);
   const { loading, error } = useSelector((state) => ({ ...state.auth }));
   const { email, password } = user;
   const dispatch = useDispatch();
   const navigate = useNavigate();


   useEffect(() => {
     error && toast.error(error);
   }, [error]);

  const handleSubmit = (e) => {
     e.preventDefault();
     if (email && password) {
       dispatch(login({ user, navigate, toast }));
     }
   };
   const onInputChange = (e) => {
     let { name, value } = e.target;
     setUser({ ...user, [name]: value });
   };
  // const registerLink = () =>{
  //      navigate('/register')
  //  }
return (
  <section>
    <div className="imgBx">
      <img src=""/>
    </div>
    <div className="contentBx">
      <div className="formBx">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="inputBx">
            <span>Email</span>
            <input type="text"
             name="email" value={email}
             onChange={onInputChange}/>
          </div>
          <div className="inputBx">
            <span>password</span>
            <input type="password"
             name="password"
            value={password}
            onChange={onInputChange}/>
          </div>
          <div className="remember">
            <label><input type="checkbox" name="" id="" />Remember me</label>
          </div>
          <div className="inputBx">
            <input type="submit" name="email" value="Sign in"/>
          </div>
          <div className="inputBx">
            
            <p>Don't have an account? <a href="">Sign up</a></p>
          </div>
        </form>
        <h3>Login with Socila media</h3>
        <ul className="sci">
          <li><img src="" /></li>
          <li><img src="" /></li>
        </ul>
      </div>
    </div>
  </section>
  
   )};
    
export default Login;
