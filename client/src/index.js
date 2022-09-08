import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import {store} from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import 'react-slideshow-image/dist/styles.css'

import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'

import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchCarts, getTotal } from './features/cart/cartSlice';

 
 store.getState().auth.token &&  store.dispatch(fetchCarts());;
 store.getState().auth.token &&   store.dispatch(getTotal());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

     <BrowserRouter>
     <Routes>
          <Route path='/*' element={<App/>}/>
      </Routes>
     </BrowserRouter>
     </PersistGate>

    </Provider>
  </React.StrictMode>
);



