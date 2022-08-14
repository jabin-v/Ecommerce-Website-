import React from 'react'
import './productCard.css'
import image from '../../images/products/jacket-1.jpg'


const ProductMinimalCard = (props) => {
  return (
    <div class="showcase">

                    <a href="#" class="showcase-img-box">
                      <img src={image} alt="relaxed short full sleeve t-shirt" width="70" class="showcase-img"/>
                    </a>

                    <div class="showcase-content">

                      <a href="#">
                        <h4 class="showcase-title">Relaxed Short full Sleeve T-Shirt</h4>
                      </a>

                      <a href="#" class="showcase-category">Clothes</a>

                      <div class="price-box">
                        <p class="price">$45.00</p>
                        <del>$12.00</del>
                      </div>

                    </div>

                  </div>
  )
}

export default ProductMinimalCard