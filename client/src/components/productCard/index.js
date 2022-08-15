import React from 'react'
import './productCard.css'
import image from '../../images/products/jacket-1.jpg'


const ProductMinimalCard = (props) => {
  return (
    <div className="showcase">

                    <a href="#" className="showcase-img-box">
                      <img src={image} alt="relaxed short full sleeve t-shirt" width="70" className="showcase-img"/>
                    </a>

                    <div className="showcase-content">

                      <a href="#">
                        <h4 className="showcase-title">Relaxed Short full Sleeve T-Shirt</h4>
                      </a>

                      <a href="#" className="showcase-category">Clothes</a>

                      <div className="price-box">
                        <p className="price">$45.00</p>
                        <del>$12.00</del>
                      </div>

                    </div>

                  </div>
  )
}

export default ProductMinimalCard