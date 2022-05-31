import React, { Fragment, useState ,useEffect } from "react";
import { toast } from "react-toastify";
import {useDispatch , useSelector , useNavigate} from 'react-redux'
import { register } from "../../redux/features/authSlice";

const initialState={
    username: "",
    email: "",
    password: "",
    cf_password: "",
}

const Signup = () => {
  const [userData, setUserData] = useState(initialState);
  const {username , email , password , cf_password} = userData
  const {laoding , error } = useSelector((state) => ({...state.auth}))
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = e => {
    e.preventDefault()
    if(username && email && password && cf_password){
        dispatch(register({userData , navigate , toast}))
    }
  }

  const onInputChange=()=>{
      let {name , value } = e.target
      setUserData({...userData , [name] : value })
  }
  useEffect (()=>{
      error && toast.error(error)
  },[error])

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">
            Name<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={onInputChange}
            value={username}
            type="text"
            id="name"
            className="px-4 py-2 focus:outline-none border"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={onInputChange}
            value={email}
            type="email"
            id="email"
            className="px-4 py-2 focus:outline-none border"
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
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={onInputChange}
            value={cf_password}
            type="password"
            id="cPassword"
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
          className="px-4 py-2 text-white text-center cursor-pointer font-medium"
        >
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
