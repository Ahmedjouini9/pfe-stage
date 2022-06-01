import React from 'react'
import './productCard.css'
import noAvatar from '../../assets/noAvatar.png'
import { useSelector } from 'react-redux';
import { likeProduct } from '../../redux/features/productSlice';


export default function profileCard({product}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const {user : currentUser} = useSelector((state)=>({...state.user}))

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    e.preventDdefault()
    dispatch(likeProduct(currentUser._id))
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  
  return (
<div class="card">
  <img src={noAvatar} alt="John" style={{width:'100%'}}/>
  <h1>{product.name}</h1>
  <p class="title">CEO & Founder, Example</p>
  <p>{product.service}</p>
  <a href="#"><i class="fa fa-dribbble"></i></a>
  <a href="#"><i class="fa fa-twitter"></i></a>
  <a href="#"><i class="fa fa-linkedin"></i></a>
  <a href="#"><i class="fa fa-facebook"></i></a>
  <p><button>Contact</button></p>
</div>
  )
}
