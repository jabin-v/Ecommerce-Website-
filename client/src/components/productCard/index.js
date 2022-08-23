import React from 'react'
import './productCard.css'
import image from '../../images/products/jacket-1.jpg'


const ProductMinimalCard = ({name,id,image,price}) => {
  return (
    <div className="showcase">

                    <a href="#" className="showcase-img-box">
                      <img src={image} alt="relaxed short full sleeve t-shirt" width="70" className="showcase-img"/>
                    </a>

                    <div className="showcase-content">

                      <a href="#">
                        <h4 className="showcase-title">{name}</h4>
                      </a>

                      <a href="#" className="showcase-category">Clothes</a>

                      <div className="price-box">
                        <p className="price">₹ {" "}{price}</p>
                        <del>$12.00</del>
                      </div>

                    </div>

                  </div>
  )
}

export default ProductMinimalCard