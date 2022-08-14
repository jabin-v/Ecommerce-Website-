import React from 'react'
import NewProduct from '../newProduct/NewProduct'
import ProductMinimal from '../productMinimal'
// import ProductMain from './../ProductMain/ProductMain'
import './productbox.css'

const ProductBox = () => {
  return (
    <div className='product-box'>
        
        <div className='product-minimal'>
            
        <ProductMinimal title="New Arrival"/>
        <ProductMinimal title="Trending"/>
        <ProductMinimal title="Top 5"/>

         </div> 
         <NewProduct/>
         
  


    </div>
  )
}

export default ProductBox