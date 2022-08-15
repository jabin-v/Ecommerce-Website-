import './cart.css'
import image1 from '../../images/products/sports-1.jpg';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
// /images/products/sports-1.jpg'

import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Cart = () => {
  return (
    <div>
        <Header/>
        <div className='container'>
            <div className='wrapper'>
                <div className='title'>
                    <h1>Your bag</h1>

                </div>
                <div className='top'>
                    <button className='cart-btn'>Continue shoppping</button>
                  
                    {/* <button className='cart-btn'>Checkout</button> */}
                </div>
                <div className='bottom'>
                    <div className='cart-product-info'>
                        <div className='cart-products'>
                            <div className='cart-product-detail'>
                                <img src={image1}/>
                                <div className='cart-details'>
                                    <span className='cart-product-name'><b>Product :</b>Nike shoe for men</span>
                                    <span className='cart-product-id'><b>ID :</b>789456</span>
                                    <div className='cart-product-color'></div>
                                    <span className='cart-product-size'><b>Size :</b>XL</span>


                                </div>
                            </div>
                            <div className='cart-price-detail'>
                                <div className='cart-amount-container'>
                                    <AddIcon/>
                                    <div className='cart-product-amount'>
                                        2

                                    </div>
                                    <MinimizeIcon/>

                                </div>
                                <div className='prod-price'>

                                    $30

                                </div>
                            </div>
                        </div>
                        <hr className='hr'/>
                        <div className='cart-products'>
                            <div className='cart-product-detail'>
                                <img src={image1}/>
                                <div className='cart-details'>
                                    <span className='cart-product-name'><b>Product :</b>Nike shoe for men</span>
                                    <span className='cart-product-id'><b>ID :</b>789456</span>
                                    <div className='cart-product-color'></div>
                                    <span className='cart-product-size'><b>Size :</b>XL</span>


                                </div>
                            </div>
                            <div className='cart-price-detail'>
                                <div className='cart-amount-container'>
                                    <AddIcon/>
                                    <div className='cart-product-amount'>
                                        2

                                    </div>
                                    <MinimizeIcon/>

                                </div>
                                <div className='prod-price'>

                                    $30

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cart-summary'>
                        <div className='title'>
                            Order summary

                        </div>
                        <div className='summary-item'>
                            <span className='summary-item-text'>
                                Sub total
                            </span>
                            <span className='summary-item-price'>
                               $80
                            </span>

                        </div>
                        <div className='summary-item'>
                            <span className='summary-item-text'>
                                Estimated shipping 
                            </span>
                            <span className='summary-item-price'>
                               $5.90
                            </span>

                        </div>
                        <div className='summary-item'>
                            <span className='summary-item-text'>
                                Shipping discount
                            </span>
                            <span className='summary-item-price'>
                               $-5.90
                            </span>

                        </div>
                        <div className='summary-item total'>
                            <span className='summary-item-text'>
                                Total 
                            </span>
                            <span className='summary-item-price'>
                               $556
                            </span>

                        </div>
                        <button className='cart-btn'>Checkout Now</button>

                    </div>
                </div>

            </div>
    

        </div>
        <Footer/>
    </div>
  )
}

export default Cart