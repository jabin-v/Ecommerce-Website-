import React from 'react'
import NewProduct from '../newProduct/NewProduct'
import ProductMinimal from '../productMinimal'
// import ProductMain from './../ProductMain/ProductMain'
import axios from '../../apis/propertyList'
import './productbox.css'
import UseAxios from '../../hooks/useAxios'

const ProductBox = () => {

  const [newArrival] = UseAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/search",
    requestConfig: {
      params:{
        limit:8
      }
    },
  });
  
  const [featured] = UseAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/featured",
    requestConfig: {
      params:{
        limit:8
      }
    },
  });
  const [cheap] = UseAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/top-5-cheap",
    requestConfig: {
      params:{
        limit:8
      }
    },
  });

 
 


  return (
    <div className='product-box'>
        
        <div className='product-minimal'>
            
        <ProductMinimal title="New Arrival" type="search" data={newArrival}/>
        <ProductMinimal title="Trending" type="featured" data={featured}/>
        <ProductMinimal title="customers top pick" type="top-5-cheap" data={cheap}/>

         </div> 
         <NewProduct random/>
         
  


    </div>
  )
}

export default ProductBox