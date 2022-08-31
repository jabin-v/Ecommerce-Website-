import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import image1 from "../../images/products/sports-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rating from "@mui/material/Rating";

import "./style.css";
import ReviewCard from "../../components/review/ReviewCard";
import ShowCaseCard from "../../components/showcaseCard/ShowCaseCard";
import NewProduct from "../../components/newProduct/NewProduct";
import { useLocation } from "react-router-dom";
import useGetProduct from "../../hooks/useGetProduct";
import Button from "./Button";
import SelectSmall from "./Button";
import SelectSize from "./SelectSize";
import Recommended from "../../components/RecommendedProducts";
import Review from "../../components/ReviewInput";
import { addItem, addToCart, getTotal } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {

  const dispatch=useDispatch();
  const { singleProduct, isLoading } = useGetProduct();
  const [error,setError]=useState("")
 
  const location = useLocation();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedsize, setSelectedSize] = useState('one size');

  const[visible,setVisible]=useState(true);

  


  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  if (!singleProduct) return <p> Loading</p>;
  //========add to cart ================================================//

  const handleCart = async () => {

    console.log(singleProduct._id,selectedColor,selectedsize)

    if(singleProduct.availableSizes?.length > 0 && !selectedsize){
      setError("select size before add to basket")
      return;
    }
    if(singleProduct.colors?.length > 0 && !selectedColor){
      setError("select Color before add to basket");
      return;
    }

    setError("")

    console.log("added")
    //trying another way response.data?the dispatch addProductTocart action
    const response = await dispatch(
      addToCart({ productId:singleProduct._id, quantity: 1,color:selectedColor,size:selectedsize ||"one size"})
    ).unwrap();

    console.log(response);

    // find the document with same index as product id and

    if (response.cartItems) {
      console.log(selectedsize)
      console.log(selectedColor)
      const itemIndex = response.cartItems.findIndex(
        (item) => item.product === singleProduct._id  && item.color === selectedColor && item.size === selectedsize 
      );

      console.log(itemIndex)

      // console.log(itemIndex);
      const addedProductId = response.cartItems[itemIndex].product;
      const doc_Id = response.cartItems[itemIndex]._id;
      const addedQuantity = response.cartItems[itemIndex].quantity;
      const addedColor = response.cartItems[itemIndex].color;
      const addedSize = response.cartItems[itemIndex].size;
      const image1=singleProduct.images[0].url;
      const price=singleProduct.price;
      const name=singleProduct.name;

      console.log(image1)

      dispatch(
        addItem(addedProductId, doc_Id, addedQuantity, image1, price, name,addedColor,addedSize)
      );
      dispatch(getTotal());
    }

    console.log(response);
  };













  

  return (
    <>
      <Header />
      {
        isLoading ? <p>Loading ..... </p> :
        <div className="container">
        <div className="card-wrapper" onClick={()=>setVisible(false)}>
          <div className="card">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <img src={singleProduct?.images[0].url} alt="shoe image" />
                </div>
              </div>
              <div className="img-select">
                <div className="img-item">
                  <a href="#" data-id="1">
                    <img src={image1} alt="shoe image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="2">
                    <img src={image1} alt="shoe image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="3">
                    <img src={image1} alt="shoe image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="4">
                    <img src={image1} alt="shoe image" />
                  </a>
                </div>
              </div>
            </div>

            <div className="product-content">
              <h2 className="product-title">{singleProduct.name}</h2>
             <div style={{display:"flex",alignItems:"center"}}>
              
             <Rating name="read-only" value={singleProduct.ratingsAverage} readOnly /> 
              <span>({singleProduct.ratingsQuantity})</span>
             </div>

              <div className="product-price">
                <p className="last-price">
                  Old Price: <span>$257.00</span>
                </p>
                <p className="new-price">
                  New Price: <span>{singleProduct.price}</span>
                </p>
              </div>

              <div className="product-detail">
                <h4>about this item: </h4>
                <p className="desc">
                 {
                  singleProduct.description
                 }
                
                 
                </p>
                
              
                <div className="specifications">
                 {
                  singleProduct.availableSizes &&  
                  <div>
                  <span>Available Sizes :</span>
                  <div className="size-buttons">
                    <SelectSize sizes={singleProduct.availableSizes}
                    selectedsize={selectedsize}
                    setSelectedSize={setSelectedSize}
                    />
      

                  </div>
                 </div>
                  
                 }
                  {
                  singleProduct.colors &&  
                  <div>
                  <span>Available Colors :</span>
                  <div className="size-buttons" >
                   <SelectSmall colors={singleProduct.colors} handleChange={handleChange} selectedColor={selectedColor}/>
      

                  </div>
                 </div>
                  
                 }

                  {
                    singleProduct.activity && 
                    <div>
                      Activity : {
                        singleProduct.activity.map((item)=> <span key={item} style={{color:"black"}}>{item}</span>)
                      }

                    </div>
                  }
                  
                
                </div>
            
               
              </div>

              <div className="purchase-info">
                {
                  error && <p style={{color:"red"}}>{error}</p>
                }
                <button type="button" className="btn" onClick={handleCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="review-container ">
          <div className="review-top">
            <h4>Reviews</h4>
            {
              !singleProduct.reviews.length === 0 && <p style={{ display: "flex", cursor: "pointer" }}>
              View all <ArrowForwardIcon />
            </p>
            }



            
          </div>

          <div className="review-slider has-scrollbar">
{singleProduct.reviews.length === 0 ? <p>No reviews yet...</p> :


  singleProduct.reviews.map((review)=>
  <ReviewCard
  key={review._id}
  review={review.review}
  user={review.user}
  rating={review.rating}


  

  
  />
  
  )
}
          </div>
        </div>
        <div>
          <h3>Similar Products</h3>
          <div className="container">
            <Recommended product={singleProduct}/>
          </div>
        </div>
      </div>
      }

      {
        visible &&
         <Review 
         setVisible={setVisible}
          />
          

      }

      <Footer />
    </>
  );
};

export default ProductDetail;
