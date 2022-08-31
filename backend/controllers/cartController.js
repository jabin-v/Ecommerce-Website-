const Cart = require("../model/Cart");
const slugify = require("slugify");
const catchAsync = require("../util/catchAsync");
const User = require("../model/User");

const getCart = catchAsync(async (req, res, next) => {
  ///================//

  console.log("verifying")
  const username = req.user; //   ;req.user;

  const userId = await User.findOne({ username }).select("_id").exec();

  //=============================//

  const isFound = await Cart.findOne({ user: userId });

  let cart;

  if (isFound) {
    cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product",
      "_id name price images"
    );
    console.log(cart);
  } else {
    return res.status(204).json("cart is empty");
  }

  console.log(cart);

  res.status(200).json({
    data: cart,
  });
});

const addToCart = catchAsync(async (req, res, next) => {
 

  const username = req.user; //   ;req.user;
  

  console.log("items", req.body.cartItems);
  const addProduct = req.body.cartItems.product;
  console.log(addProduct)
  const addColor = req.body.cartItems.color;
  const addSize = req.body.cartItems.size;

  const userId = await User.findOne({ username }).select("_id").exec();

  const cartExist = await Cart.findOne({ user: userId }).exec();

  if (cartExist) {
    //1) find wheather the product exist in the cart

    //2) if the product exist update the quantity

    const existingProduct = cartExist.cartItems.find(
      (item) => item.product == addProduct && item.color === addColor && item.size === addSize

    );

    console.log(existingProduct)

    // item.product === addProduct && item.color === addCcolor && item.size === addsize

    if (existingProduct) {
      const newCart = await Cart.findOneAndUpdate(
        { user: userId, "cartItems._id": existingProduct._id },
        {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: existingProduct.quantity + req.body.cartItems.quantity,
            },
          },
        },
        {
          new: true,
        }
      );

      return res.json(newCart);
    }

    //3) if product not exist $push the product to the cart items array

    const newCart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          cartItems: req.body.cartItems,
        },
      },
      {
        new: true,
      }
    );

    res.json(newCart);
  } else {
    const newCart = await Cart.create({
      user: userId,
      cartItems: [req.body.cartItems],
    });

    res.status(200).json(newCart);
  }
});

// const removeCart=catchAsync(async(req,res,next)=>{

const removeCart = catchAsync(async (req, res, next) => {
  const username = req.user; //   ;req.user;

  const userId = await User.findOne({ username }).select("_id").exec();
  // const { data } =req.body.payload;

  console.log(req.body.data)
  if (req.body.data) {
    const result = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          cartItems: {
            _id: req.body.data,
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(202).json("suuceesufully removed");
  }
});

const clearCart = catchAsync(async (req, res, next) => {
  const username = req.user ; //   ;req.user;

  const userId = await User.findOne({ username }).select("_id").exec();
  // const { data } =req.body.payload;

 
  if (userId) {
    const result = await Cart.findOneAndDelete(
      { user: userId },
    );

    res.status(202).json("suuceesufully removed");
  }
});




module.exports = {
  addToCart,
  removeCart,
  getCart,
  clearCart
};
