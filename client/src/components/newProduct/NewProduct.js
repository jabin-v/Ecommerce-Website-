import React from 'react'
import UseAxios from '../../hooks/useAxios';
import ShowCaseCard from '../showcaseCard/ShowCaseCard'
import axios from '../../apis/propertyList'
import "./newProduct.css"

const NewProduct = () => {

  
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

  console.log("new.......",newArrival)


  return (
    <div className="product-main">

            <h2 className="title">New Products</h2>

            <div className="product-grid">
            {
              newArrival?.map((product)=>
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
              )
            }


            </div>
            </div>
  )
}

export default NewProduct