const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
    products: [
      { 
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
             },
       productPrice:
       {type:Number,
         required:true},
       image:{type:String},
       quantity: { type: Number, default: 1 },
       size:{
        type:String
       },
       color:{
        type:String
       }
    
    },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);