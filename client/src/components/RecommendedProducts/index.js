import React from 'react'
import useGetRecommendedProducts from '../../hooks/useGetRecommended';
import ShowCaseCard from '../showcaseCard/ShowCaseCard';
import './style.css'

const Recommended = ({product}) => {

    const products = useGetRecommendedProducts(product);

    console.log(products)
    

  return (
    <div  className='recommended'>
    {
        product.length === 0 ? <p>loading....</p>:
        (<div className='product-grid'>

            {
                products.map((product)=>(
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


        </div>)
    }
    </div>
  )
}

export default Recommended