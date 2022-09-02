import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ORDER_URL = "http://localhost:3500/api/order";

const initialState={
    orders:[],
    recentlyDelivered:[],
    AllDelivered:[]
}


export const createOrder=createAsyncThunk("order/create",async(order,{getState,rejectWithValue})=>{
    const {auth}=getState();


    try {
        const config = {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          };
          const response = await axios.post(ORDER_URL,{order}, config);
        //   return response.data
        console.log(response.data)

        
    } catch (error) {

        console.log(error)
        
    }

})
export const allDelivered=createAsyncThunk("order/deliveredproduct",async(arg,{getState,rejectWithValue})=>{
  const {auth}=getState();

  


  try {
      const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        const response = await axios.get(`${ORDER_URL}/alldelivered`,config);
        return response.data
     

      
  } catch (error) {

      console.log(error)
      
  }

})


export const getAllPendingOrders=createAsyncThunk("order/getAllOrderUser",async(arg,{getState,rejectWithValue})=>{
    const {auth}=getState();


    try {
        const config = {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          };
          const response = await axios.get(ORDER_URL,config);
          return response.data
       

        
    } catch (error) {

        console.log(error)
        
    }

})
export const getRecentlyDelivered=createAsyncThunk("order/delivered",async(arg,{getState,rejectWithValue})=>{
    const {auth}=getState();


    try {
        const config = {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          };
          const response = await axios.get(`${ORDER_URL}/delivered`,config);
          console.log(response)
          return response.data
       

        
    } catch (error) {

        console.log(error)
        
    }

})

//cancel order
export const cancelOrder=createAsyncThunk("order/cancel",async(orderId,{getState,rejectWithValue})=>{

  const {auth}=getState();

console.log(orderId)
  try {
      const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        const response = await axios.patch(`${ORDER_URL}/cancelorder`,{orderId},config);
        console.log(response)
        return {response:response.data,orderId
     }

      
  } catch (error) {

      console.log(error)
      
  }

})




const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
      .addCase(getAllPendingOrders.fulfilled, (state, { payload }) => {

    //    const check= Array.isArray(state.orders)
       console.log(typeof (state.orders))

        state.orders=payload;

        
      })

      builder
      .addCase(getRecentlyDelivered.fulfilled,(state,{payload})=>{

        state.recentlyDelivered=payload

      })
      builder
      .addCase(allDelivered.fulfilled,(state,{payload})=>{

        state.AllDelivered=payload

      })
      builder.addCase(cancelOrder.fulfilled,(state,{payload})=>{
        
     const existingOrders=state.orders.filter((order)=>order.orderItems._id !== payload.orderId

     );

     state.orders=existingOrders;
      })
        
    }
   

})


export const { addOrder } = orderSlice.actions;

export const selectAllOrders = (state) => state.order.orders;
export const selectDelivered = (state) => state.order.recentlyDelivered;
export const selectAllDelivered = (state) => state.order.AllDelivered;


export default orderSlice.reducer;