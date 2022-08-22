import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllCategories, useGetCategoriesQuery } from '../../features/category/categoryApiSlice';
import CloseIcon from '@mui/icons-material/Close';


import './sidebar.css'
const SideBar = () => {

  const { data: categories}= useGetCategoriesQuery();
  const categoryLIst=useSelector(selectAllCategories);

  //=======================useEffect here=======================================//






// ======================= list of categories================================//

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span style={{display:"none"}}>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };
    
  return (
    <div className='sidebar has-scrollbar' data-mobile-menu>
     <div className='sidebar-category  has-scrollbar'>
           <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>

              <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                <CloseIcon/>
              </button>
            </div> 
            <ul className="sidebar-menu-category-list">
            {categoryLIst.length > 0
                    ? renderCategories(categoryLIst)
                    : null}
            </ul>

     </div>
     
     

    </div>
  )
}

export default SideBar