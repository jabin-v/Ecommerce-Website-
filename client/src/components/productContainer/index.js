import React from 'react'
import NewProduct from '../newProduct/NewProduct'
import ProductBox from '../productbox'
import SideBar from '../sidebar/Sidebar'
import './productContainer.css'

const ProductContainer = () => {
  return (
    <div className='product-container'>

        <div className='container'>

            <SideBar/>
            <ProductBox/>
           
            
        </div>
    


    </div>
  )
}

export default ProductContainer