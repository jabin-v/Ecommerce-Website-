import React from 'react'
import './productCard.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';

const ProductMinimalCard = ({name,id,image,price,offer}) => {
  return (
    <Link to= {`product/${id}`} className="showcase">

                    <span  className="showcase-img-box">
                      <img src={image} alt="relaxed short full sleeve t-shirt" width="70" className="showcase-img"/>
                    </span>

                    <div className="showcase-content">

                      <span >
                        <h4 className="showcase-title">{name}</h4>
                      </span>

                      <span className="showcase-category">
                     {
                      offer &&  <Rating name="read-only" value={4} readOnly />
                     }
                      </span>

                      <div className="price-box">
                        <p className="price">₹ {" "}{price}</p>
                        <del>$12.00</del>
                      </div>

                    </div>

                  </Link>
  )
}

export default ProductMinimalCard