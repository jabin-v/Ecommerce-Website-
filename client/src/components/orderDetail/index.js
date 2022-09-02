import React from 'react';
import Progressbar from '../progressbar/Progressbar';
import image1 from "../../images/products/sports-1.jpg";
// import image1 from "../../images/products/sports-1.jpg";
import './style.css'
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../features/order/orderSlice';

const OrderDetail = ({orderItem}) => {
  const dispatch=useDispatch();


  const handleCancel=()=>{
    

    dispatch(cancelOrder(orderItem._id))

  }
  return (
    <div>
         <div className='order-container'>
          
                    
          <div className='order-image'>
          <img src={orderItem.image} />
          </div>
          <div  className='order-product-spec'>
            <span >
              <b>Product :</b>
             {orderItem.productName} 
            </span>
            <span >
            
            </span>
            <span >
            <b>color :</b>
              {orderItem?.color}</span>
           {
            orderItem.size &&  <span >
            <b>Size :</b>
            {orderItem.size}
          </span>
           }
          </div>
       
        <div className='order-price-details'>
         
            
          
              <span>
               <b>Qty :</b> {orderItem.quantity}
              </span>
              
            
            <span >
              <b>Price :</b>
              ₹ { " "}{orderItem.price} / product
              </span>
              {
                orderItem.deliveryStatus === "delivered" ? "":
                <button type='submit' onClick={handleCancel}>Cancel</button>

              }
         

         
        </div>
      
<div className='order-status'>
  <Progressbar done={orderItem.deliveryStatus}/>
</div>

</div>
<hr className='hr'/>
    </div>
  )
}

export default OrderDetail