import {  createSlice } from "@reduxjs/toolkit";



const initialState={
    filteredProduct:[]

}



export const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        addProducts(state,action){
            state.filteredProduct=action.payload
        }
        
    },

})

export const { addProducts } = productSlice.actions;

export const selectAllProducts = (state) => state.products.filteredProduct;

export default productSlice.reducer;