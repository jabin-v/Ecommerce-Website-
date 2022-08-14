import React from 'react'
import './category.css'
import image1 from '../../images/icons/dress.svg'






const category=[
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
    {
        image:image1,
        name:"dress"
    },
]

const CategorySlider = () => {
  return (
    <div class="category">

    <div class="container">

      <div class="category-item-container has-scrollbar">
     {
       category.map((cat)=>
       <div class="category-item">

<div class="category-img-box">
  <img src={cat.image} alt="dress & frock" width="30"/>
</div>

<div class="category-content-box">

  <div class="category-content-flex">
    <h3 class="category-item-title">Dress & frock</h3>

    <p class="category-item-amount">(53)</p>
  </div>

  <a href="#" class="category-btn">Show all</a>

</div>

</div>

       )
     }

      </div>

    </div>

  </div>
  )
}

export default CategorySlider