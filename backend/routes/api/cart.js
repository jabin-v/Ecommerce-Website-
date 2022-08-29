const express=require('express');
const CartController = require('../../controllers/cartController');

const router=express.Router();


router.route('/')
     .post(CartController.addToCart)
     .patch(CartController.removeCart)
     .get(CartController.getCart)
     .delete(CartController.clearCart)



module.exports=router;