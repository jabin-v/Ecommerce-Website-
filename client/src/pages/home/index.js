import './home.css'
import React from 'react'
import Header from '../../components/header'
import Slider from '../../components/slider'
import CategorySlider from '../../components/category'
import Footer from '../../components/footer'
import ProductContainer from '../../components/productContainer'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'

const index = () => {

  
  return (
   <div>
    <Header/>
    <Slider/>
    <CategorySlider/>
    <ProductContainer/>
    <Footer/>
   </div>
  )
}

export default index