import React from 'react';
import ProdcuctCard from '../productCard';
import './productMinimal.css'

const ProductMinimal = (props) => {
  return (
   
      <div className="product-showcase">

        
      <h2 className="title">{props.title}</h2>   
      <div className="showcase-wrapper has-scrollbar">
      <div className="showcase-container">
     
       <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
      </div>
      <div className="showcase-container">
      <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
     



      </div>
          
          
      </div>  


    </div>
  )
}

export default ProductMinimal