import Login from "./pages/login";
import Register from "./pages/register";
import {Route,Routes} from "react-router-dom"
import Layout from "./components/Layout";

import Public from "./components/Public";
import Private from "./components/Private";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public */}


        {/* ========= home page ============ */}
         <Route index element={<Public/>}/>

        {/* ========= login page ============ */}

        <Route path="login" element={<Login/>}/>

         {/* ========= unauthorized user page ============ */}
        
        <Route path="unauthorized" element={<Unauthorized/>} />
        
        {/* ========= register page ============ */}

        <Route path="register" element={<Register/>}/>


      
        
        {/* ========= products page ============ */}
        {/* ========= cart page ============ */}
        {/* ========= order page ============ */}


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
