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
import './app.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public */}


        {/* ========= home page ============ */}
         <Route index element={<Home/>}/>

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
