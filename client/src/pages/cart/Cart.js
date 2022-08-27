import "./cart.css";
import image1 from "../../images/products/sports-1.jpg";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
// /images/products/sports-1.jpg'

import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts, getTotal, removeFromCart, selectCart } from "../../features/cart/cartSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const cartStats=useSelector((state)=>state.cart);

  console.log(cartStats)

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  useEffect(()=>{
    dispatch(getTotal())

  },[cart,dispatch])



  console.log(cart);

  const handleRemoveCart=(id)=>{
    console.log("clicked on remove")
    console.log(id)

    dispatch(removeFromCart(id)).unwrap();
    

  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h1>Your bag</h1>
          </div>
          <div className="top">
            <button className="cart-btn">Continue shoppping</button>

            {/* <button className='cart-btn'>Checkout</button> */}
          </div>
          <div className="bottom">
            <div className="cart-product-info">
              {cart.map((item) => (
                <div key={item._id}>
                  <div className="cart-products">
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
                        <div className="cart-product-color">{item.color}</div>
                        <span className="cart-product-size">
                          <b>Size :</b>
                          {item.size}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="cart-price-detail">
                        <div className="cart-amount-container">
                          <AddIcon />
                          <div className="cart-product-amount">
                            {item.quantity}
                          </div>
                          <MinimizeIcon  />
                        </div>
                        <div className="prod-price">{item.product.price}</div>
                      </div>
                      <HighlightOffIcon onClick={()=>handleRemoveCart(item._id)}
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
                <span className="summary-item-price">$80</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-text">Estimated shipping</span>
                <span className="summary-item-price">$5.90</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-text">Shipping discount</span>
                <span className="summary-item-price">$-5.90</span>
              </div>
              <div className="summary-item total">
                <span className="summary-item-text">Total</span>
                <span className="summary-item-price">{cartStats.cartTotalAmount}</span>
              </div>
              <button className="cart-btn">Checkout Now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
