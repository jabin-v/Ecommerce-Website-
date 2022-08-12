const express=require('express');
const CartController = require('../../controllers/cartController');

const router=express.Router();


router.route('/')
     .post(CartController.addToCart)



module.exports=router;