import React from 'react';
import UseAxios from '../../hooks/useAxios';
import ProdcuctCard from '../productCard';

import './productMinimal.css'


const ProductMinimal = ({title,data}) => {

  //*************props.data is the data for the box */

  console.log(data)




  return (


    // key={product.id}
    //                         id={product.id}
    //                         name={product.name}
    //                         brand={product.brand}
    //                         imgUrl={product.api_featured_image}
    //                         price={product.price}


   
      <div className="product-showcase">

        
      <h2 className="title">{title}</h2>   
      <div className="showcase-wrapper has-scrollbar">
      <div className="showcase-container">
     {
      data?.slice(0,4).map((product)=>
      <ProdcuctCard 
      key={product._id}
      name={product.name}
      id={product._id}
      image={product.images[0].url}
      price={product.price}
      

      />)
     }
      </div>
      <div className="showcase-container">
      {
      data?.slice(4).map((product)=>
      <ProdcuctCard 
      key={product._id}
      name={product.name}
      id={product._id}
      image={product.images[0].url}
      price={product.price}
      

      />)
     }
     



      </div>
          
          
      </div>  


    </div>
  )
}

export default ProductMinimal