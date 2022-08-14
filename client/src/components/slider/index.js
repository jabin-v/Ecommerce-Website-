import React from 'react';
import './slider.css'
import banner1 from '../../images/banner-1.jpg'
import banner2 from '../../images/banner-1.jpg'
import banner3 from '../../images/banner-1.jpg'

// <p class="banner-subtitle">Trending item</p>

// <h2 class="banner-title">Women's latest fashion sale</h2>

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
         <div class="banner">

<div class="container">

  <div class="slider-container has-scrollbar">



{
      bannerData.map((banner)=>(
        <div class="slider-item">
    
          <img src={banner.image} alt="women's latest fashion sale" class="banner-img"/>
    
          <div class="banner-content">
    
            <p class="banner-subtitle">{banner.smallheading}</p>
    
            <h2 class="banner-title">{banner.mainheading}</h2>
    
    
            <a href="#" class="banner-btn">Shop now</a>
    
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