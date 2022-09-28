import React, { useEffect } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import './style.css'
import OrderDetail from '../../components/orderDetail';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllPendingOrders, getRecentlyDelivered, selectAllOrders, selectDelivered } from '../../features/order/orderSlice';


const Order = () => {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllPendingOrders())
  
  },[])
  useEffect(()=>{
    dispatch(getRecentlyDelivered())
  
  },[])


  const orders=useSelector(selectAllOrders);
  const delivered=useSelector(selectDelivered);


  return (
    <div>
        <Header/>
        <div className='container'>
          <div className='title'>Your orders</div>
          {orders?.length == 0 ? <p>You don't have any pending orders</p>:
            orders?.map((item)=><OrderDetail
            key={item.orderItems._id}
             orderItem={item.orderItems}/>)
          }

          <div className='order-delivered'>
           { delivered?.length===0 ? "":<div className='title'>Recently delivered products</div>}

            {
            delivered?.map((item)=><OrderDetail
            key={item.orderItems._id}
             orderItem={item.orderItems}/>)
          }
            

          </div>
        
          

        </div>
        <Footer/>
        
    </div>
  )
}

export default Order