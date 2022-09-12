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
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
 




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>

    <PersistGate loading={null} persistor={persistor}>

     <BrowserRouter>
  
     <Routes>
          <Route path='/*' element={<App/>}/>
      </Routes>
     </BrowserRouter>
     </PersistGate>
     </AlertProvider>

    </Provider>
  </React.StrictMode>
);



