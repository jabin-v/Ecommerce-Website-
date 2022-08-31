const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email:{
      type: String,
    
    },

    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      color: {
        type: String,
       
      },
      size: {
        type: String,
        default:"one size"
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price:{
        type: Number,
        required: true,

      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
      },
      deliveryStatus:{
        type:String,
        required: true,
        default: "Processing",
      },
      deliveredAt:{
        type: Date,
    default: Date.now,
      }
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);