import "./style.css";
import image1 from "../../images/products/jacket-1.jpg";
import image2 from "../../images/products/jacket-2.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { addItem, addToCart } from "../../features/cart/cartSlice";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowCaseCard = ({
  name,
  id,
  price,
  rating,
  image1,
  image2,
  productId,
}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  //adding to cart

  const handleCart = async () => {
    //trying another way response.data?the dispatch addProductTocart action
    const response = await dispatch(
      addToCart({ productId, quantity: 1 })
    ).unwrap();

    console.log(response.cartItems);

    //find the document with same index as product id and

    if (response.cartItems) {
      const itemIndex = response.cartItems.findIndex(
        (item) => item.product === productId
      );

      // console.log(itemIndex);
      const addedProductId = response.cartItems[itemIndex].product;
      const doc_Id = response.cartItems[itemIndex]._id;
      const addedQuantity = response.cartItems[itemIndex].quantity;

      dispatch(
        addItem(addedProductId, doc_Id, addedQuantity, image1, price, name)
      );
    }

    
  };


  return (
    <div className="showcase">
      <div className="showcase-banner">
        <img
          src={image1}
          alt={name}
          width="300"
          className="product-img default"
        />
        <img
          src={image2}
          alt={name}
          width="300"
          className="product-img hover"
        />

        {/* <p className="showcase-badge">15%</p> */}

        <div className="showcase-actions">
          <div className="btn-action">
            <FavoriteBorderIcon />
          </div>
          {/* onClick dispatch(addtocart (productId)) */}

          <div className="btn-action">
            <AddShoppingCartIcon onClick={handleCart} />
          </div>

          <Link to={`/product/${productId}`} className="btn-action" >
            <RemoveRedEyeIcon />
          </Link>

          {/* <button className="btn-action">
  <ion-icon name="repeat-outline"></ion-icon>
</button> */}
        </div>
      </div>

      <div className="showcase-content">
        <a href="#">
          <h3 className="showcase-title">{name}</h3>
        </a>

        <div className="showcase-rating">
          <Rating name="read-only" value={rating} readOnly />
        </div>

        <div className="price-box">
          <p className="price">₹ {price}</p>
          <del>₹ 75.00</del>
        </div>
      </div>
    </div>
  );
};

export default ShowCaseCard;
