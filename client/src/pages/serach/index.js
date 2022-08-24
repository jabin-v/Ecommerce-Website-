import React, { useState } from "react";
import { useSelector } from "react-redux";
import Activity from "../../components/activity";
import Brands from "../../components/brands";
import Colors from "../../components/colors";
import Footer from "../../components/footer";
import Header from "../../components/header";
import NewProduct from "../../components/newProduct/NewProduct";
import Ratings from "../../components/Rating";
import Size from "../../components/size";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../features/category/categoryApiSlice";
import Category from "../../components/categorySelector/Category";
import "./search.css";
import Price from "../../components/price";

import useSearch from "../../hooks/useSearch";

const Search = () => {
  const { data: categories } = useGetCategoriesQuery();
  const categoryLIst = useSelector(selectAllCategories);
  
  const { isLoading } = useSearch();


  const [visible, setVisible] = useState(false);

  const styles = {
    sidebar: {
      visibility: visible ? "visible" : "",
    },
  };

  return (
    <>
      <Header />
      <div className="product-container">
        <div className="container">
          <div className="sidebar has-scrollbar" style={styles.sidebar}>
            <div
              className="sidebar-category  has-scrollbar"
              style={{ height: "100vh" }}
            >
              <div className="sidebar-top">
                <h2 className="sidebar-title" style={{ fontWeight: "600" }}>
                  filters
                </h2>

                <button
                  className="sidebar-close-btn"
                  data-mobile-menu-close-btn
                ></button>
              </div>
              <div className="sidebar-bottom">
                <div className="filter-section">
                  <p className="filter-title">Category</p>
                  <div className="filter-category has-scrollbar">
                    <Category categories={categoryLIst} />
                  </div>
                </div>
                <div className="filter-section">
                  <p className="filter-title">Rating</p>
                  <div className="filter-category has-scrollbar">
                    <Ratings />
                  </div>
                </div>
                <div className="filter-section">
                  <p className="filter-title">Brands</p>
                  <div className="filter-category has-scrollbar">
                    <Brands />
                  </div>
                </div>
                <div className="filter-section">
                  <p className="filter-title">Price</p>
                  <div className="filter-category has-scrollbar">
                    <Price />
                  </div>
                </div>
                <div className="filter-section">
                  <p className="filter-title">Colors</p>
                  <div className="filter-category has-scrollbar">
                    <Size />
                  </div>
                </div>
                <div className="filter-section">
                  <p className="filter-title">Activity</p>
                  <div className="filter-category has-scrollbar">
                    <Activity />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="search-container">
            {/* <NewProduct /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
