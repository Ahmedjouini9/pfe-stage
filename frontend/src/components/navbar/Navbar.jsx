import React, {  useState} from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css';
import noAvatar from '../../assets/noAvatar.png';
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { setLogout } from "../../redux/features/authSlice";
import Dropdown from '../dropdown/dropdown';
import { searchCompanys } from "../../redux/features/companySlice";




const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navbar, setNavbar] = useState();
  const [search, setSearch] = useState();  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;
  const [openDropdown, setOpenDropdown] = useState(false);



  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchCompanys(search));
      navigate(`/company/search?searchQuery=${search}`);
      // setSearch("");
    } else {
      navigate("/");
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const changeBackgroundSearch = () => {
    if (window.scrollY >= 400) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };
  window.addEventListener('scroll', changeBackground);
  window.addEventListener('scroll', changeBackgroundSearch);
     return (
       <>
      <div className={navbar ? 'gpt3__navbar active' : 'gpt3__navbar'}>
       <div className="gpt3__navbar-links">
         <div className={search ? 'gpt3__navbar-links_logos' : 'gpt3__navbar-links_logo'}>
           <h2 className={navbar ? 'cblack' : 'cwhite'}>RCA ENTREPRISE</h2>
         </div>
         <form onSubmit={handleSubmit}>
         <div className={search ? 'gpt3__input' : 'gpt3__input hidesearch'}>
            <input className="input1" type="text" placeholder="Search" 
            onChange={(e) => setSearch(e.target.value)}/>
            <button className="btn" type="button">Search</button>
         </div>
           </form>
         {/* <div className={search ? 'Domaines' : 'Domaineshide'}>
           <p>Sante</p>
           <p>Plombier</p>
           <p>Informaticien</p>
           <p>Ingenieure</p>
           <p>Photographiste</p>
           <p>Hopitale</p>
        </div> */}
         <div className={navbar ? 'gpt3__navbar-links_containers' : 'gpt3__navbar-links_container'}>
           <p><a href="#home">Home</a></p>
           <p><a href="#wgpt3">About us</a></p>
           {user ?
           (<p><a href="/addcompany">Create Company</a></p>)
           :
           (<p><a href="#possibility">Our Services</a></p>)
            }
         </div>
       </div>
       {user 
       ? (<div className="gpt3__navbar-menu_container-links-sign"
       onClick={() => setOpenDropdown(true)}>
           <img src={noAvatar} alt=""
            className="profileImg" 
            />
            {openDropdown && <Dropdown />}
           <span className="barOnline"></span> 
         </div> )
         :
         (<div className={navbar ? 'gpt3__navbar-signs' : 'gpt3__navbar-sign'}>
         <Link to="/login"><p className="signin" >Sign in </p></Link>
         <Link to="/register"><button className="button1" type="button">Join</button></Link>
       </div>)}
       <div className="gpt3__navbar-menu">
         {toggleMenu
           ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
         : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
         {toggleMenu && (
         <div className="gpt3__navbar-menu_container scale-up-center">
           <div className="gpt3__navbar-menu_container-links">
             <p><a href="#home">Home</a></p>
             <p><a href="#wgpt3">About us</a></p>
             <p><a href="#possibility">Our Services</a></p>
           </div>
          <div className="gpt3__navbar-menu_container-links-sign">
             <p>Sign in</p>
             <button type="button">Sign up</button>
           </div>
         </div>
         )}
       </div>
       </div>
       </>
   );
 }
 export default Navbar;

