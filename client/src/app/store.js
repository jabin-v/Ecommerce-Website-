import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import filterReducer from '../features/filter/filterSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import reviewReducer from '../features/review/reviewSlice';
import uiReducer from '../features/ui/uiSlice';

import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import uiSlice from '../features/ui/uiSlice';


const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({ 
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authReducer,
    filter:filterReducer,
    cart:cartReducer,
    order:orderReducer,
    review:reviewReducer,
    ui:uiSlice

   });

    const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store=configureStore({
    reducer:persistedReducer
       
    ,
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware(
        {
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }
    ).concat(apiSlice.middleware),
    devTools:true
})

export const persistor = persistStore(store)
