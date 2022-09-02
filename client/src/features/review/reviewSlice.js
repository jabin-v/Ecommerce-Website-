import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const REVIEW_URL = "http://localhost:3500/api/reviews";

const initialState = {
    reviews:[]

};

// export const fetchCarts = createAsyncThunk(
//   "cart/fetchCart",
//   async (arg, { getState, rejectWithValue }) => {
//     const { auth } = getState();

//     try {
//       // get user data from store

//       // configure authorization header with user's token
//       const config = {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       const response = await axios.get(CART_URL, config);

//       let data;

//       if (response.status === 204) {
//         data = [];

//         return data;
//       } else {
//         data = response.data.data.cartItems;

//         return data;
//       }
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
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
      console.log(newReview)
      const newData={...newReview,user:{
        username:auth.user
      }}

      console.log(newData)

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
// export const removeFromCart = createAsyncThunk(
//   "cart/removeCart",
//   async (data, { getState, rejectWithValue }) => {
//     console.log(data);
//     const { auth } = getState();

//     try {
//       // get user data from store

//       const payload = {
//         data,
//       };

//       // configure authorization header with user's token
//       const config = {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       const response = await axios.patch(CART_URL, payload, config);
//       console.log(response);

//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const clearCart = createAsyncThunk(
//   "cart/delete",
//   async (arg, { getState, rejectWithValue }) => {
   
//     const { auth } = getState();

//     try {
    
//       // configure authorization header with user's token
//       const config = {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       await axios.delete(CART_URL, config);
     

      
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// =====================================================================

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {

   productReview(state,action){
    console.log(action.payload)


    state.reviews=action.payload
   }
    
  },
  extraReducers(builder){
    builder
    .addCase(addReview.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.reviews.push(payload)
      })
  }
 
});

export const { productReview} = reviewSlice.actions;

export const selectAllReviews=state=>state.review.reviews



export default reviewSlice.reducer;
