import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const REVIEW_URL =`${process.env.REACT_APP_BASEURL}/reviews`;


const initialState = {
    reviews:[]

};


export const addReview = createAsyncThunk(
  "review/addReview",
  async (data, { getState, rejectWithValue }) => {
    const { auth } = getState();

   

    try {
      // get user data from store


      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.post(REVIEW_URL, { ...data }, config);
      const newReview=response.data.data.newReview;
   
      const newData={...newReview,user:{
        username:auth.user
      }}

      

      return newData;

   

     
    }

      
     catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }

);


const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {

   productReview(state,action){
   


    state.reviews=action.payload
   }
    
  },
  extraReducers(builder){
    builder
    .addCase(addReview.fulfilled, (state, { payload }) => {
       

        state.reviews.push(payload)
      })
  }
 
});

export const { productReview} = reviewSlice.actions;

export const selectAllReviews=state=>state.review.reviews



export default reviewSlice.reducer;
