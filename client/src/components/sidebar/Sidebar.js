import React from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import './sidebar.css'
const SideBar = () => {

    
  return (
    <div className='sidebar has-scrollbar'>
     <div className='sidebar-category'>
           <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>

              <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                {/* <CloseIcon/> */}4
              </button>
            </div> 

     </div>
     
     

    </div>
  )
}

export default SideBar