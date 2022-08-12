const Cart=require('../model/Cart')
const slugify=require('slugify');
const catchAsync = require("../util/catchAsync");
const User = require('../model/User');

const addToCart=catchAsync
(async(req,res,next)=>{

    const username=req.user;
    const addProduct=req.body.cartItems.product;
    
    const userId=await User.findOne({username}).select("_id").exec();
    

    const cartExist=await Cart.findOne({user:userId}).exec();

    if(cartExist){
    //1) find wheather the product exist in the cart 

    //2) if the product exist update the quantity

    const existingProduct=cartExist.cartItems.find(item =>item.product == addProduct);

    if(existingProduct){
       const newCart= await Cart.findOneAndUpdate({"user":userId,"cartItems.product":addProduct},{
            "$set":{
                "cartItems.$":{
                    ...req.body.cartItems,
                    quantity:existingProduct.quantity +req.body.cartItems.quantity

                }
            }
        }, {
            new: true,
          });

    return res.json(newCart)


    }

    //3) if product not exist $push the product to the cart items array

    const newCart= await Cart.findOneAndUpdate({user:userId},{
        "$push":{
            "cartItems":req.body.cartItems
        }
    }, {
        new: true,
      });

     res.json(newCart)





    }else{

        const newCart=await Cart.create({
            user:userId,
            cartItems:[req.body.cartItems]
    
        });
    
    
        res.status(200).json({
            status:"Add to cart success",
            data:newCart
           
            
        })


    }

    
    
})


module.exports={
    addToCart 
}