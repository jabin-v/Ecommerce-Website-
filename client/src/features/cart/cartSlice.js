import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const addToCart=createAsyncThunk


const initialState={
    cartItems:[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    

}

const cartSlice=createSlice({
    name:"cart",
    initialState,

})