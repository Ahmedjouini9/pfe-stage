import React from 'react';
import { setLogout } from "../../redux/features/authSlice";
import {useDispatch} from "react-redux";
import './dropdown.css'
import userimg from '../../assets/user.png'
import edit from '../../assets/edit.png'
import settings from '../../assets/settings.png'
import question from '../../assets/question.png'
import logout from '../../assets/log-out.png'
import envelope from '../../assets/envelope.png'


const Dropdown = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(setLogout());
      };
  return (
    <div className='action'>
      <div className="menu">
      <ul>
        <li>
          <img src={userimg} >
          <a href='/profile'>
             Profile
          </a>
          </img>
        </li> 
        <li>
          <img src={envelope}>
          <a href='/profile'>
             My Company
          </a>
          </img>
        </li> 
        <li>
          <img src={edit}>
          <a href='/profile'>
             edit Profile
          </a>
          </img>
        </li> 
        <li>
        <img src={settings}>
          <a href='/profile'>
             settings
          </a>
          </img>
        </li> 
        <li>
        <img src={question}>
          <a href='/'>
             help
          </a>
          </img>
        </li>
        <li>
        <img src={logout}>
          <a href='/' onClick={()=>handleLogout()}>
             logout
          </a>
          </img>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Dropdown;
