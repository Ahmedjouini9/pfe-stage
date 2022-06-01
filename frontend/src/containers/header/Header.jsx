import React , {  useState }from 'react';
import people from '../../assets/people.png';
import rca from '../../assets/combiné.png';
import './header.css';
import {searchProducts } from "../../redux/features/productSlice";
import {useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';



const Header = () => {
  const [search, setSearch] = useState();  

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchProducts(search));
      navigate(`/company/search?searchQuery=${search}`);
      // setSearch("");
    } else {
      navigate("/");
    }
  };
  return (
  <div className="container">
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">VOTRE VISIBILITÉ VOTRE RÉFÉRENCEMENT</h1>
        <p>Find the perfect job</p>
        <div className="gpt3__header-content__input">
          <input type="email" placeholder="Search"
           onChange={(e) => setSearch(e.target.value)}/>
          <button type="button" onClick={handleSubmit}>Search</button>
        </div>
        <div className="gpt3__header-content__people">
          <img src={people} alt=""/>
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>
      <div className="gpt3__header-image">
        <img src={rca} alt=""/>
      </div>
    </div>
  </div>
)};

export default Header;
