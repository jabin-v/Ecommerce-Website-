import React, { useEffect, useState } from "react";
import FormInput from "../../components/formInput/FormInput";
import Header from "../../components/header";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./style.css";
import { clearCart, selectCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../features/order/orderSlice";
const BASE_URL = "http://localhost:3500/api/stripe";
const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const token = useSelector(selectCurrentToken);
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();

  

  console.log(cart);

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post(
        `${BASE_URL}/payment`,
        {
          amount: cart.cartTotalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data.client_secret);
      setClientSecret(data.data.client_secret);
    };

    fetchClientSecret();
  }, []);

  //====================================orderData===============//

 

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "provide your name",
      label: "name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phonenumber",
      type: "text",
      placeholder: "Phone number",
      label: "Phone",
      errorMessage: "enter your phonenumber",
      required: true,
    },
    {
      id: 4,
      name: "state",
      type: "text",
      placeholder: "state",
      errorMessage: "enter your state",
      label: "State",

      required: true,
    },
    {
      id: 5,
      name: "city",
      type: "text",
      placeholder: "city",
      errorMessage: "enter your city",
      label: "City",

      required: true,
    },
    {
      id: 6,
      name: "zipcode",
      type: "text",
      placeholder: "zipcode",
      errorMessage: "enter zipcode",
      label: "Zipcode",
      required: true,
    },
  ];
  const [address, setAdress] = useState({
    name: "",
    email: "",
    phonenumber: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const orderItems=cart.cartItems.map((item)=>{
    return{
      productName:item.product.name,
      product:item.product._id,
      price:item.product.price,
      image:item.product.images[0].url,
      quantity:item.quantity,
      color:item.color,
      size:item.size


    }
  })

  console.log(orderItems)

  const order={
    shippingInfo:address,
    orderItems,
    totalPrice:cart.cartTotalAmount,
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
        return;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log(result);
          order.paymentInfo={
            status:result.paymentIntent.status,
            id:result.paymentIntent.id

          }
          dispatch(createOrder(order))

          alert("Payment successful");
          dispatch(clearCart());
          navigate("/success");
        } else {
          alert("there is some issue with processing payment");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setAdress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
  };
//================================================================//

















  return (
    <div>
      <Header />
      <div className="register-wrapper">
        <div className="checkout-section">
          <h1>Shipping Details</h1>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={address[input.name] ?? ""}
                onChange={onChange}
              />
            ))}

            <CardElement />
            <button className="submit"> PAY ₹ {cart.cartTotalAmount}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
