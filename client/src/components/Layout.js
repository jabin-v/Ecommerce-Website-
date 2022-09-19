import { Outlet } from "react-router-dom"
import "./layout.css"
import UserChat from "./userChat/UserChat"
const Layout = () => {
    
    return (
        <main className="App">
             <div className="chatui">
                <UserChat/>
             </div>
            <Outlet />
           
        </main>
    )
}

export default Layout