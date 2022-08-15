import './style.css'
import image1 from '../../images/products/jacket-1.jpg'
import image2 from '../../images/products/jacket-2.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import React from 'react'

const ShowCaseCard = () => {
  return (
    <div className="showcase">

                <div className="showcase-banner">
                  <img src={image1} alt="Mens Winter Leathers Jackets" width="300" className="product-img default"/>
                  <img src={image2} alt="Mens Winter Leathers Jackets" width="300" className="product-img hover"/>

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

                  <a href="#" className="showcase-category">jacket</a>

                  <a href="#">
                    <h3 className="showcase-title">Mens Winter Leathers Jackets</h3>
                  </a>

                  <div className="showcase-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </div>

                  <div className="price-box">
                    <p className="price">$48.00</p>
                    <del>$75.00</del>
                  </div>

                </div>

              </div>
    
  )
}

export default ShowCaseCard