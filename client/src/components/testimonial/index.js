import React from 'react'
import "./style.css"

const Testimonial = ({image,title,content,name}) => {
  return (
    
    <div className="testimonial">

    <div className="testimonial-card">

      <img src={image} alt="alan doe" className="testimonial-banner" width="80" height="80"/>

      <p className="testimonial-name">{name}</p>

      <p className="testimonial-title">{title}</p>


      <p className="testimonial-desc">
     {
      content
     }
      </p>

    </div>

  </div>
  
  )
}

export default Testimonial