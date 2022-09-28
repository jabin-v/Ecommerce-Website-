import "./cart.css";
import { useNavigate } from "react-router-dom";


import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarts,
  getTotal,
  removeFromCart,
  selectCart,
} from "../../features/cart/cartSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASEURL;

const Cart = () => {
  const KEY = process.env.REACT_APP_STRIPE_KEY;
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();

  const cart = useSelector(selectCart);


  const cartStats = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart(id)).unwrap();
  };

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      const res = await axios.post(
        `${BASE_URL}/stripe/payment`,
        {
          tokenId: stripeToken.id,
          amount: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };

    stripeToken && makeRequest();
  }, [stripeToken]);



  return (
    <div>
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h1>Your bag</h1>
          </div>
          <div className="top">
            <Link to="/search">
              {" "}
              <button className="cart-btn">Continue shoppping</button>{" "}
            </Link>

            {/* <button className='cart-btn'>Checkout</button> */}
          </div>
          {
            cart.length === 0 ? <p>Currenlty  your bag is empty </p> : (
              <div className="bottom">
            <div className="cart-product-info">
              {cart.map((item) => (
                <div key={item._id}>
                  <div className="cart-products">
                    <Link to={`/product/${item.product._id}`}>
                      <div className="cart-product-detail">
                        <img src={item.product.images[0].url} />
                        <div className="cart-details">
                          <span className="cart-product-name">
                            <b>Product :</b>
                            {item.product.name}
                          </span>
                          <span className="cart-product-id">
                            <b>ID :</b>789456
                          </span>
                          <div className="cart-product-color">
                            <b>Color:</b>
                            {"  "}
                            {item.color}
                          </div>
                          <span className="cart-product-size">
                            <b>Size :</b>
                            {item.size}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div style={{ display: "flex" }}>
                      <div className="cart-price-detail">
                        <div className="cart-amount-container">
                          <div className="cart-product-amount">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="prod-price">{item.product.price}</div>
                      </div>
                      <HighlightOffIcon
                        onClick={() => handleRemoveCart(item._id)}
                        style={{ cursor: "pointer", marginTop: "5px" }}
                      />

                      <div></div>
                    </div>
                  </div>
                  <hr className="hr" />
                </div>
              ))}
              <hr className="hr" />
            </div>
            <div className="cart-summary">
              <div className="title">Order summary</div>
              <div className="summary-item">
                <span className="summary-item-text">Sub total</span>
                <span className="summary-item-price">₹ {cartStats.cartTotalAmount}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-text">Delivery with in</span>
                <span className="summary-item-price" style={{color:"green"}}>3 Days</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-text">Shipping charge</span>
                <span className="summary-item-price">0</span>
              </div>
              <div className="summary-item total">
                <span className="summary-item-text">Total</span>
                <span className="summary-item-price">
                ₹ {cartStats.cartTotalAmount}
                </span>
              </div>
              <Link to="/user/cart-checkout">
                <button className="cart-btn">Check out</button>
              </Link>
            </div>
          </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
