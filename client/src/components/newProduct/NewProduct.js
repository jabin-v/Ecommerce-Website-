import React from 'react'
import ShowCaseCard from '../showcaseCard/ShowCaseCard'
import "./newProduct.css"

const NewProduct = () => {
  return (
    <div class="product-main">

            <h2 class="title">New Products</h2>

            <div class="product-grid">
            <ShowCaseCard/>

            </div>
            </div>
  )
}

export default NewProduct