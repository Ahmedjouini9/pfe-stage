import React, { useState,useEffect} from 'react'
import { useSelector,useDispatch} from "react-redux";
import { Link,useNavigate } from 'react-router-dom'
import {isEmail,isMatch} from '../../components/utils/validation/Validation'
import { toast } from "react-toastify";
import { register } from "../../redux/features/authSlice.js";
import './register.css'
import loadingBox from '../../components/loadingBox/loadingBox'


const initialState = {
  email: '',
  password: '',
  cf_password: '',
}

function Register() {
  const [user, setUser] = useState(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading ,error } = useSelector((state) => ({ ...state.auth }));
  const {email, password,cf_password} = user

  const onInputChange = e => {
      let {name, value} = e.target
      setUser({...user, [name]:value})
  }

  useEffect(() => {
    error && toast.error(error);
  }, [error]);


  const handleSubmit = async e => {
      e.preventDefault()
      if(!isMatch(password,cf_password)) {
           return toast.error("Password should match.")
      }
      if(!isEmail(email)) {
           return toast.error("should be email form.")
      }
      if (email && password && cf_password) {
        dispatch(register({ user, navigate, toast }));
  }
  }

  return (
    <div class="cont">
    <div class="form sign-up">
        <h2>Sign Up</h2>
        {loading && <loadingBox />}
        <label>
          <span>Email</span>
          <input class="input1" type="email"
          name="email" value={email}
          onChange={onInputChange}
          />
        </label>
        <label>
          <span>Password</span>
          <input class="input1" type="password"
          name="password" value={password}
          onChange={onInputChange}
          />
        </label>
        <label>
          <span>Confirm Password</span>
          <input class="input1" type="password"
          name="cf_password" value={cf_password}
          onChange={onInputChange}
          />
        </label>
        <button type="button" 
        class="submit" 
        onClick={handleSubmit}>Sign Up Now</button>
        <div class="img-text m-in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img-btn">
         <span class="m-up"><Link to="/login">Sign In</Link></span>
        </div>
      </div>
      </div>
  )};
    
  export default Register;