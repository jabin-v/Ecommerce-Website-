const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const cartSchema=new Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   cartItems:[{
    product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
     },
     quantity:{
        type:Number,
        default:1,
     },
     color:{
      type:String,
      default:"none"
     },
     size:{
      type:String,
      default:"none"
     }


   }]
   


} ,{ timestamps: true })


module.exports = mongoose.model('Cart', cartSchema);