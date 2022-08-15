import { Rating } from '@mui/material'
import React from 'react'
import img1 from '../../images/icons/quotes.svg'
import img2 from '../../images/testimonial-1.jpg'
import './style.css'

const ReviewCard = () => {
  return (
   <>
   <div className="review card-1">
     
      <Rating name="disabled" value={5} disabled />
     
      <h2 className="card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      <p className="card__apply">
        <a className="card__link" href="#">Apply Now <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
   </>
    
  )
}

export default ReviewCard