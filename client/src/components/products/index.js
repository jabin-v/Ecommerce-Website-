import React from 'react';
import ShowCaseCard from '../showcaseCard/ShowCaseCard';
import './style.css'

const Products = ({result}) => {
  if(result.data.length ===  0 ){return <p>No Products found try changing filters</p>}
  
  return (
    <div className='product-grid'>
          {
                result.data.map((product)=>(
                    <ShowCaseCard
                    key={product._id}
                    name={product.name}
                    id={product.id}
                    price={product.price}
                    rating={product.ratingsAverage}
                    image1={product.images[0].url}
                    image2={product.images[1].url}
                    productId={product._id}
                    
                    />
                ))
            }

    </div>
  )
}

export default Products