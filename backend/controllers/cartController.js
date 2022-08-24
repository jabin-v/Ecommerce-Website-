const Cart=require('../model/Cart')
const slugify=require('slugify');
const catchAsync = require("../util/catchAsync");
const User = require('../model/User');




const getCart=catchAsync(async(req,res,next)=>{

    ///================//
    const username="jabin" ;   //   ;req.user;
  
    
    const userId=await User.findOne({username}).select("_id").exec();
    //=============================//
    

const cart=await Cart.findOne({user:userId}).populate("cartItems.product","_id name price images");




res.json(cart)



})

const addToCart=catchAsync
(async(req,res,next)=>{

    const username="jabin" ;   //   ;req.user;
    const addProduct=req.body.cartItems.product;
    
    const userId=await User.findOne({username}).select("_id").exec();
    

    const cartExist=await Cart.findOne({user:userId}).exec();

    if(cartExist){
    //1) find wheather the product exist in the cart 

    //2) if the product exist update the quantity

    const existingProduct=cartExist.cartItems.find(item =>item.product == addProduct);

    if(existingProduct){
       const newCart= await Cart.findOneAndUpdate({"user":userId,"cartItems.product":addProduct},{
            $set:{
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
        $push:{
            cartItems:req.body.cartItems
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

// const removeCart=catchAsync(async(req,res,next)=>{

    const removeCart = catchAsync(async(req,res,next) => {

        const username="jabin" ;   //   ;req.user;
       
        
        const userId=await User.findOne({username}).select("_id").exec();
        const { productId } = req.body.payload;
        if (productId) {
         const result= await Cart.findOneAndUpdate(
            { user: userId },
            {
              $pull: {
                cartItems: {
                  product: productId,
                },
              },
            },{
                new: true,
              }
          )

          res.status(202).json({ result });
        }
      });




module.exports={
    addToCart,
    removeCart,
    getCart
}