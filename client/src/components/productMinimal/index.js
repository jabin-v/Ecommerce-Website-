import React from 'react';
import ProdcuctCard from '../productCard';
import './productMinimal.css'

const ProductMinimal = (props) => {
  return (
   
      <div class="product-showcase">

        
      <h2 class="title">{props.title}</h2>   
      <div class="showcase-wrapper has-scrollbar">
      <div class="showcase-container">
     
       <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
       <ProdcuctCard/>
      </div>
      <div class="showcase-container">
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