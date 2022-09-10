import React, { useEffect } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Progressbar from '../../components/progressbar/Progressbar'
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
          {
            orders?.map((item)=><OrderDetail
            key={item.orderItems._id}
             orderItem={item.orderItems}/>)
          }

          <div className='order-delivered'>
            <div className='title'>Recently delivered products</div>

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