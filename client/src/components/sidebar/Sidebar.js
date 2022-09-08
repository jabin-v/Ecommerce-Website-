import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllCategories, useGetCategoriesQuery } from '../../features/category/categoryApiSlice';
import CloseIcon from '@mui/icons-material/Close';


import ProductMinimalCard from '../../components/productCard';

import './sidebar.css'
import Testimonial from '../testimonial';


const SideBar = () => {


    
  return (
    <div className='sidebar has-scrollbar offerpage' >
    <h2 class="title">testimonial</h2>
    <Testimonial 
    image="https://media.istockphoto.com/photos/closeup-portrait-of-her-she-nice-attractive-puzzled-ignorant-girl-picture-id1132758418?k=20&m=1132758418&s=612x612&w=0&h=ca6WVDDblf3um3mdfCSGVpLGfwuyjj5UTLD9rMMHfH4=" 
    content="Merit and her team did an exceptional job with my sons website. They are very professional and made his website easy for clients to scroll through. I highly recommend Digital Design Solutions. They are a top notch company. " 
    name= "Jabin " 
     title="CEO Myself"/>
    <Testimonial
     image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80" 
     content=" I can not say enough great things about the team at Digitial Design Solutions! The creativity, the attention to details and the excellent communication sets them above the rest. I felt they genuinely cared about our business and took a personal interest in our success." 
     name= "Sudhakaran " 
      title="Uganda enterprises"/>
   
    
   

     
     
     

    </div>
  )
}

export default SideBar