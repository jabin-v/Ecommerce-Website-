import React from 'react';
import './slider.css'
import banner1 from '../../images/banner-1.jpg'
import banner2 from '../../images/banner-1.jpg'
import banner3 from '../../images/banner-1.jpg'

// <p className="banner-subtitle">Trending item</p>

// <h2 className="banner-title">Women's latest fashion sale</h2>

const Sider = () => {
    const bannerData=[
        {
            image:banner1,
            smallheading:"Trending item",
            mainheading:"Women's latest fashion sale"

        },
        {
            image:banner2,
            smallheading:"Trending accessories",
            mainheading:"Modern sunglasses"
        },
        {
            image:banner3,
            smallheading:"Sale Offer",
            mainheading:"New fashion summer sale"
        },
    ]





  return (
    <div>
         <div className="banner">

<div className="container">

  <div className="slider-container has-scrollbar">



{
      bannerData.map((banner)=>(
        <div className="slider-item" key={banner.smallheading}>
    
          <img src={banner.image} alt="women's latest fashion sale" className="banner-img"/>
    
          <div className="banner-content">
    
            <p className="banner-subtitle">{banner.smallheading}</p>
    
            <h2 className="banner-title">{banner.mainheading}</h2>
    
    
            <a href="#" className="banner-btn">Shop now</a>
    
          </div>
    
        </div>
      ))
}

    

    

  </div>

</div>

</div>
    </div>
  )
}

export default Sider