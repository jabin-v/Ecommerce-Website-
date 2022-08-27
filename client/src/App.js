import Login from "./pages/login";
import Register from "./pages/register";
import {Route,Routes} from "react-router-dom"
import Layout from "./components/Layout";
import Home from './pages/home'
import 'remixicon/fonts/remixicon.css'

import Public from "./components/Public";
import Private from "./components/Private";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";
import './App.css'
import ProductDetail from "./pages/pooductDetail.js";
import Cart from "./pages/cart/Cart";
import Search from "./pages/serach";
import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout/>}>
        {/* public */}


        {/* ========= home page ============ */}
         <Route index element={<Home/>}/>
         <Route path="/product/:productId" element={<ProductDetail/>}/>
         <Route path="/user/cart" element={<Cart/>}/>
         <Route path="/search" element={<Search/>}/>

         
         
      
         




        {/* ========= login page ============ */}

        <Route path="login" element={<Login/>}/>

      
        
        {/* ========= register page ============ */}

        <Route path="register" element={<Register/>}/>


      
        
        {/* ========= products page ============ */}
        {/* ========= cart page ============ */}
        {/* ========= order page ============ */}

           {/* ========= unauthorized user page ============ */}
        
         <Route path="unauthorized" element={<Unauthorized/>} />


        {/* ========= protected admin pages ============ */}
        <Route element={<RequireAuth allowedRoles={[5150]}/>} >

        <Route path="/private" element={<Private/>}/>
        <Route path="/userslist" element={<UsersList />} />

        </Route>

        

        


      
        
        


      </Route>

    </Routes>
  );
}

export default App;
