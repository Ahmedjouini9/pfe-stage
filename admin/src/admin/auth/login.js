import React, { Fragment, useState,useEffect } from "react";
import {toast} from 'react-toastify'
import { login } from "../../redux/features/authSlice";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


const initialState= {
    email : " ",
    password : " "
}

const Login = () => {
  const {laoding , error} = useSelector((state)=>({...state.auth}))

  const [userData, setuserData] = useState(initialState);

  const {email , password } = userData

  const dispatch = useDispatch()
  const navigate = useNavigate()


useEffect (()=>{
    error && toast.error(error)
},[error])


  const handleSubmit = e => {
      e.preventdefault()
      if(email && password){
        dispatch(login({userData , navigate , toast}))
      }
    };
  
const onInputChange =()=>{
    let {name , value} = e.target
    setuserData({...userData ,[name]:value})
}
  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Login</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">
            email or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={onInputChange}
            value={email}
            type="text"
            id="name"
            className= "px-4 py-2 focus:outline-none border"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={onInputChange}
            value={password}
            type="password"
            id="password"
            className="px-4 py-2 focus:outline-none border"
          />
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          Login
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
