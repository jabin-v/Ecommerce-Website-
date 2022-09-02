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

const Header = ({search}) => {
  
  const {
    data: cat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  const categoryLIst = useSelector(selectAllCategories);
  const cart = useSelector((state) => state.cart.cartTotalQuantity);
  const token = useSelector(selectCurrentToken);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="header-top mobile-hide">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left">
              <ul className="flexitem main-links">

                <li>
                  <a href="#">wishlist</a>
                </li>
              </ul>
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
            <div className="right">
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
                <li>
                  <a href="#">
                    English <i className="ri-arrow-down-s-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-nav">
        <div className="container header-list">
          <div className="wrapper flexitem">
            <a href="#" className="trigger desktop-hide">
              <i className="ri-menu-line"></i>
            </a>
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
                  <a href="#">
                    <div className="icon-large">
                      <i className="ri-heart-line"></i>
                    </div>
                  </a>
                </li>
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
