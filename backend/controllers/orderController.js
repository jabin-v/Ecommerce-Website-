const  mongoose  = require("mongoose");
const Order = require("../model/Order");
const User = require("../model/User");
const APIFeatures = require("../util/APIFeatures");
const catchAsync = require("../util/catchAsync");
const moment =require("moment")

const createOrder = catchAsync(async (req, res, next) => {
  const username = req.user //   ;req.user;
  const userId = await User.findOne({ username }).select("_id").exec();

  console.log("orderfot" , userId)

  const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body.order;

  console.log(
    shippingInfo,
    "order",
    orderItems,
    "pay",
    paymentInfo,
    "total",
    totalPrice
  );

  const order = await Order.create({
    shippingInfo: shippingInfo,
    orderItems,
    paymentInfo,
    totalPrice,
    user: userId,
    paidAt: Date.now(),
  });

  console.log(order);
  res.status(201).json({
    success: true,
    order,
  });
});

// const getOrderByuser = catchAsync(async (req, res, next) => {
//   const username = req.user//   ;req.user;
//   const userId = await User.findOne({ username }).select("_id").exec();
//   req.query.fields = "orderItems";

//   const features = new APIFeatures(Order.find({ user: userId }), req.query)
//     .filter()
//     .sort()
//     .limit()
//     .paginate();

//   const orders = await features.query;

//   res.status(200).json({
//     success: true,
//     orders,
//   });
// });


//the user will get all the products that are not delivered yet

const getOrderByuser = catchAsync(async (req, res, next) => {

  const username = req.user//   ;req.user;
  const userId = await User.findOne({ username }).select("_id").exec();

  console.log(userId)

  const orders = await Order.aggregate([

    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
    {
      $project: {
        shippingInfo: 0,
        paymentInfo: 0,
        paidAt: 0,
      },
    },

    {
      $unwind: "$orderItems",
    },
    {
      $match: { "orderItems.deliveryStatus": { $ne: "delivered" } },
    },
    { $sort: {"orderItems.deliveredAt": -1} },
    
  ]);

  res.status(200).json(orders);
});

//delivered orders
const getDelivered = catchAsync(async (req, res, next) => {

  const username = req.user//   ;req.user;
  const userId = await User.findOne({ username }).select("_id").exec();
  const date=new Date(2022-08-31)

 

  console.log(userId)

  const orders = await Order.aggregate([

    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $project: {
        shippingInfo: 0,
        paymentInfo: 0,
        paidAt: 0,
      },
    },
    {
      $match: { "orderItems.deliveryStatus": "delivered"  },
    },
    
    
    { $sort: {"orderItems.deliveredAt": -1} },
    { $limit : 10 }
   
   
   
    
  ]);

  res.status(200).json(orders);
});















const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().select("orderItems");

  // let totalAmount = 0;

  res.status(200).json({
    success: true,
    // totalAmount,
    orders,
  });
});

//get all orders to the admin which are not delivered @@@@@@@complted checking
const stats = catchAsync(async (req, res, next) => {

  const username = "jabinvc"//   ;req.user;
  const userId = await User.findOne({ username }).select("_id").exec();

  const stats = await Order.aggregate([
    {
      $project: {
        shippingInfo: 0,
        paymentInfo: 0,
        paidAt: 0,
      },
    },

    {
      $unwind: "$orderItems",
    },
    {
      $match: { "orderItems.deliveryStatus": { $ne: "delivered" } },
    },
  ]);

  res.status(200).json(stats);
});

//get all orders  of  user

module.exports = {
  createOrder,
  getOrderByuser,
  getAllOrders,
  stats,
  getDelivered
};
