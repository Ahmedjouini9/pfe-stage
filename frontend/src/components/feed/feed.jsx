import React from 'react'
import { useEffect } from 'react';
import ProductCard from '../productCard/productCard'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getProduct } from '../../redux/features/productSlice';


export default function feed() {
  const [products,setProducts]=useState()
  const dispatch = useDispatch();
  const { id } = useParams();
    
  useEffect(() => {
    if (id) {
      setProducts(dispatch(getProduct(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
    return (
        <div className="feed">
          <div className="feedWrapper">
              {products.map((p)=>(
                <ProductCard key={p._id} product={p}/>
              ))}
          </div>
        </div>
      );
    }
