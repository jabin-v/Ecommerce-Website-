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
        name:"dress10"
    },
    {
        image:image1,
        name:"dress1"
    },
    {
        image:image1,
        name:"dress2"
    },
    {
        image:image1,
        name:"dress3"
    },
    {
        image:image1,
        name:"dress4"
    },
    {
        image:image1,
        name:"dress5"
    },
    {
        image:image1,
        name:"dress6"
    },
    {
        image:image1,
        name:"dress7"
    },
]

const CategorySlider = () => {
  return (
    <div className="category">

    <div className="container">

      <div className="category-item-container has-scrollbar">
     {
       category.map((cat)=>
       <div className="category-item" key={cat.name}>

<div className="category-img-box">
  <img src={cat.image} alt="dress & frock" width="30"/>
</div>

<div className="category-content-box">

  <div className="category-content-flex">
    <h3 className="category-item-title">Dress & frock</h3>

    <p className="category-item-amount">(53)</p>
  </div>

  <a href="#" className="category-btn">Show all</a>

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