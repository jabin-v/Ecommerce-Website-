import './style.css'
import image1 from '../../images/products/jacket-1.jpg'
import image2 from '../../images/products/jacket-2.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Rating from '@mui/material/Rating';


import React from 'react'

const ShowCaseCard = ({name,id,price,rating,image1,image2}) => {
  return (
    <div className="showcase">

                <div className="showcase-banner">
                  <img src={image1} alt={name} width="300" className="product-img default"/>
                  <img src={image2} alt={name} width="300" className="product-img hover"/>

                  {/* <p className="showcase-badge">15%</p> */}

<div className="showcase-actions">

<div className="btn-action">
<FavoriteBorderIcon/>
</div>

<div className="btn-action">
  <AddShoppingCartIcon/>
</div>

<div className="btn-action">
  <RemoveRedEyeIcon/>
</div>

{/* <button className="btn-action">
  <ion-icon name="repeat-outline"></ion-icon>
</button> */}



</div>

                </div>

                <div className="showcase-content">

            

                  <a href="#">
                    <h3 className="showcase-title">{name}</h3>
                  </a>

                  <div className="showcase-rating">
                  <Rating name="read-only" value={rating} readOnly />
                  </div>

                  <div className="price-box">
                    <p className="price">₹ {" "}{price}</p>
                    <del>₹ 75.00</del>
                  </div>

                </div>

              </div>
    
  )
}

export default ShowCaseCard