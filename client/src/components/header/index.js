import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut, selectCurrentToken } from "../../features/auth/authSlice";
import SearchIcon from '@mui/icons-material/Search';
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../features/category/categoryApiSlice";
import { category, keyword } from "../../features/filter/filterSlice";
import useSearch from "../../hooks/useSearch";
import "./header.css";
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getTotal, removeOnLogout, selectCart, SelectQunatity } from "../../features/cart/cartSlice";

const Header = ({search,setVisible}) => {

  // const [cart,setCart]=useState(0)
  
  const {
    data: cat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery({
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  }
    
  );

  // const a=useSelector(selectCart);

  // useEffect(()=>{
    
  // })
 
  const categoryLIst = useSelector(selectAllCategories);

  const items = useSelector(selectCart);
  const cart=items.length;


  const token = useSelector(selectCurrentToken);
  const [query, setQuery] = useState("");
  const [open,setOpen]=useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(cart)

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {

      dispatch(keyword(query))


    }
  }, [query]);


  console.log(cart);

  const handleClick = (categoryId) => {
    console.log(categoryId);

    dispatch(category([categoryId]));

    navigate("/search", { state: { catId: categoryId } });
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(removeOnLogout())
    navigate("/");
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <span
              onClick={() => handleClick(category._id)}
              href={category.slug}
            >
              {category.name}
            </span>
          ) : (
            <span>{category.name}</span>
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
    <header>
      <div className="header-top ">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left">
           {
            !open &&  <ArrowCircleRightIcon className="search-arrow" onClick={()=>setOpen(true)}/>
           }
            </div>
           
            {
              search ?
              <div className="header-search-container">
              <input
                type="search"
                name="search"
                className="search-field"
                placeholder="search product,brand...."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />

              <button className="search-btn">
               <SearchIcon/>
              </button>
            </div>:<div></div>
            }
            <div className="right actions">
             
             <ul className="flexitem main-links">
              <li>{!token && <Link to="/register">Sign Up</Link>}</li>
              <li>{!token && <Link to="/login">Login</Link>}</li>
              <li>{token && <Link to="/user/order">Order tracking</Link>}</li>
              <li>
                {token && (
                  <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Logout
                  </span>
                )}
              </li>
            </ul>
             
            </div>
           
              
           {
            open && 
            <div className="search-sidebar">

            <div className="">
             
             <ul className="flexitem main-links">
              <li>{!token && <Link to="/register">Sign Up</Link>}</li>
              <li>{!token && <Link to="/login">Login</Link>}</li>
              <li>{token && <Link to="/user/order">Orders</Link>}</li>
              <li>
                {token && (
                  <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Logout
                  </span>
                )}
              </li>
              <li>
                <CloseIcon onClick={()=>setOpen(false)}/>
              </li>
            </ul>
             
            </div>
                

              </div>
           }
            
          </div>
        </div>
      </div>
      <div className="header-nav">
        <div className="container header-list">
          <div className="wrapper flexitem">
        {
         search &&  <span className="trigger desktop-hide" onClick={()=>setVisible(true)} style={{cursor:"pointer"}}> 
          <i className="ri-menu-line"></i>
            </span>
        }   
             
            <div className="left flexitem">
              <div className="logo">
                <Link to="/">
                  <span className="circle"></span>Store
                </Link>
              </div>
              <nav className="mobile-hide menu-header">
                <ul>
                  {categoryLIst.length > 0
                    ? renderCategories(categoryLIst)
                    : null}
                </ul>
              </nav>
            </div>
            <div className="right">
              <ul className="flexitem second-links">

                <li>
                  <Link to="/user/cart" className="iscart">
                    <div className="icon-large">
                      <i className="ri-shopping-cart-line"></i>

                      <div className="fly-item">
                        <span className="item-number">{cart}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* menu header */}
    </header>
  );
};

export default Header;
