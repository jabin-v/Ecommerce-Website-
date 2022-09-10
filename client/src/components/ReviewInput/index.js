import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";
import { useDispatch } from "react-redux";
import { addReview } from "../../features/review/reviewSlice";
import { hideReviewForm } from "../../features/ui/uiSlice";

const Review = ({ setVisible,productId}) => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState(null);
  const dispatch=useDispatch();

 

  const handleRating = (e, newValue) => {
    setValue(newValue);
  };
  const handleText = (e) => {
    setReview(e.target.value);
  };



  const handleReviewSubmit=()=>{

    const data={
      rating:value,
      review,
      product:productId
    }

  

    dispatch(addReview(data))
    

    
    //send to backend
  }

  return (
    <div className="review-input">
     
      <div className="review-input-div">
        <div className="close-card" onClick={()=>dispatch(hideReviewForm())}>
        <CloseIcon/>


        </div>
        
        <h3>Post a Review </h3>
        <Rating
          name="size-large"
          value={value}
          size="large"
          onChange={handleRating}
        />
        <textarea
          className="desc"
          rows="4"
          cols="32"
          placeholder="What you feel about the product"
          onChange={handleText}
        />
        <div className="review-btn">
          <button onClick={handleReviewSubmit}>Post</button>
         
        </div>
      </div>
    </div>
  );
};

export default Review;
