import React from 'react'
import ShowCaseCard from '../showcaseCard/ShowCaseCard'
import "./newProduct.css"

const NewProduct = () => {
  return (
    <div className="product-main">

            <h2 className="title">New Products</h2>

            <div className="product-grid">
            <ShowCaseCard/>
            <ShowCaseCard/>
            <ShowCaseCard/>
            <ShowCaseCard/>
            <ShowCaseCard/>

            </div>
            </div>
  )
}

export default NewProduct