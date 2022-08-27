import { Rating } from '@mui/material'
import React from 'react'
import img1 from '../../images/icons/quotes.svg'
import img2 from '../../images/testimonial-1.jpg'
import './style.css'

const ReviewCard = ({review,user,rating}) => {
  return (
   <>
   <div className="review card-1">
     
      <Rating name="disabled" value={rating} disabled />
     
      <h2 className="card__title">{review}</h2>
      <span className="card__apply">
        <p className="card__link" >{user}</p>
      </span>
    </div>
    
   </>
    
  )
}

export default ReviewCard