import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CART_URL = "http://localhost:3500/api/cart";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const fetchCarts = createAsyncThunk(
  "cart/fetchCart",
  async (arg, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      // get user data from store

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(CART_URL, config);

      let data;

      if (response.status === 204) {
        data = [];

        return data;
      } else {
        data = response.data.data.cartItems;

        return data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { getState, rejectWithValue }) => {
    const { auth } = getState();

    try {
      // get user data from store

      const cartItems = {
        product: data.productId,
        quantity: data.quantity,
        color: data.color,
        size: data.size,
      };

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.post(CART_URL, { cartItems }, config);
     

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeCart",
  async (data, { getState, rejectWithValue }) => {
   
    const { auth } = getState();

    try {
      // get user data from store

      const payload = {
        data,
      };

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.patch(CART_URL, payload, config);
    

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/delete",
  async (arg, { getState, rejectWithValue }) => {
   
    const { auth } = getState();

    try {
    
      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(CART_URL, config);
     

      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// =====================================================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      reducer(state, action) {
       
        const existingIndex = state.cartItems.findIndex(
          (item) => item.product._id === action.payload.product._id && 
          item.color === action.payload.color && item.size === action.payload.size
        );

        if (existingIndex >= 0) {
          state.cartItems[existingIndex] = action.payload;
        } else {
          state.cartItems.push(action.payload);
        }
      },

      prepare(
        addedProductId,
        doc_Id,
        addedQuantity,
        image1,
        price,
        name,
        addedColor,
        addedSize
      ) {
        

        return {
          payload: {
            product: {
              _id: addedProductId,
              images: [image1],
              name,
              price,
             
            },
            color: addedColor,
            size: addedSize,
            quantity: addedQuantity,
            _id: doc_Id,
          },
        };
      },
    },
    getTotal(state, action) {

    
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const price = cartItem.product.price;
          const cartQuantity = cartItem.quantity;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    removeOnLogout(state,action){
      state.cartItems= [];
      state.cartTotalQuantity= 0;
      state.cartTotalAmount=0 ;

    }
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCarts.fulfilled, (state, { payload }) => {
      

        state.cartItems = payload;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const data = action.payload;

        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload
        );

        state.cartItems = nextCartItems;
      })

      .addCase(clearCart.fulfilled,(state,action)=>{

        state.cartItems=[];
        state.cartTotalQuantity=0;
        state.cartTotalAmount=0;
        
      })

      


      
      
  },
});

export const { addItem, changeQuantity, getTotal,removeOnLogout } = cartSlice.actions;

export const selectCart = (state) => state.cart.cartItems;

export default cartSlice.reducer;
