import React from 'react'
import "./style.css"

const Testimonial = ({image,title,content,name}) => {
  return (
    
    <div class="testimonial">

    <div class="testimonial-card">

      <img src={image} alt="alan doe" class="testimonial-banner" width="80" height="80"/>

      <p class="testimonial-name">{name}</p>

      <p class="testimonial-title">{title}</p>


      <p class="testimonial-desc">
     {
      content
     }
      </p>

    </div>

  </div>
  
  )
}

export default Testimonial