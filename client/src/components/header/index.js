import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../features/category/categoryApiSlice";
import "./header.css";

const Header = () => {
  const {
    data: cat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  console.log(cat);

  const categoryLIst = useSelector(selectAllCategories);

  console.log(categoryLIst);
 

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
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
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Featured Product</a>
                </li>
                <li>
                  <a href="#">wishlist</a>
                </li>
              </ul>
            </div>
            <div className="right">
              <ul className="flexitem main-links">
                <li>
                  <a href="#">Sign Up</a>
                </li>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Order tracking</a>
                </li>
                <li>
                  <a href="#">USD</a>
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
                <a href="#">
                  <span className="circle"></span>Store
                </a>
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
                  <a href="#" className="iscart">
                    <div className="icon-large">
                      <i className="ri-shopping-cart-line"></i>
                      <div className="fly-item">
                        <span className="item-number">0</span>
                      </div>
                    </div>
                  </a>
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
