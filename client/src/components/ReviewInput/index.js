import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

const Review = ({ setVisible }) => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState(null);

  console.log(value);
  console.log(review);

  const handleRating = (e, newValue) => {
    setValue(newValue);
  };
  const handleText = (e) => {
    setReview(e.target.value);
  };



  const handleReviewSubmit=()=>{
    //send to backend
  }

  return (
    <div className="review-input">
     
      <div className="review-input-div">
        <div className="close-card" onClick={()=>setVisible(false)}>
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
