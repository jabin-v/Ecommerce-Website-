import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import image1 from '../..//images/products/sports-1.jpg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './style.css'
import ReviewCard from '../../components/review/ReviewCard'
import ShowCaseCard from '../../components/showcaseCard/ShowCaseCard';
import NewProduct from '../../components/newProduct/NewProduct';


const ProductDetail = () => {

    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1; 
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    window.addEventListener('resize', slideImage);


  return (
  <>
  <Header/>
   <div className='container'>
   
   <div className = "card-wrapper">
      <div className = "card">
        
        <div className = "product-imgs">
          <div className = "img-display">
            <div className = "img-showcase">
              <img src = {image1} alt = "shoe image"/>
              <img src = {image1} alt = "shoe image"/>
              <img src = {image1} alt = "shoe image"/>
              <img src = {image1} alt = "shoe image"/>
            </div>
          </div>
          <div className = "img-select">
            <div className = "img-item">
              <a href = "#" data-id = "1">
                <img src = {image1} alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "2">
                <img src = {image1} alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "3">
                <img src = {image1} alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "4">
                <img src = {image1} alt = "shoe image"/>
              </a>
            </div>
          </div>
        </div>
       
        <div className = "product-content">
          <h2 className = "product-title">nike shoes</h2>
          <a href = "#" className = "product-link">visit nike store</a>
          <div className = "product-rating">
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div className = "product-price">
            <p className = "last-price">Old Price: <span>$257.00</span></p>
            <p className = "new-price">New Price: <span>$249.00 (5%)</span></p>
          </div>

          <div className = "product-detail">
            <h2>about this item: </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Shoes</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div className = "purchase-info">
            <input type = "number" min = "0" value = "1" onChange={()=>{
              console.log("first")
            }}/>
            <button type = "button" className = "btn">
              Add to Cart
            </button>
          </div>

        
        </div>
      </div>
    </div>
    <div className='review-container '>
      <div className='review-top'>
      <h4>Reviews</h4>
      <p style={{display:"flex" ,cursor:"pointer"}}>View all <ArrowForwardIcon/></p>

      </div>
    
    <div className='review-slider has-scrollbar'>
     <ReviewCard/>
     <ReviewCard/>
     <ReviewCard/>
     <ReviewCard/>
     <ReviewCard/>

     
     
    </div>
    
     
    </div>
    <div>
      <h3>Similar Products</h3>
      <div className='similar-product-wrap'>
        <NewProduct/>


      </div>
    </div>
    
    


  

    </div>

    <Footer/>
  </>
  )
}

export default ProductDetail