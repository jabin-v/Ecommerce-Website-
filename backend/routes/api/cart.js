const express=require('express');
const CartController = require('../../controllers/cartController');
const verifyToken = require('../../middlewares/verifyToken');

const router=express.Router();


router.route('/')
     .post(verifyToken,CartController.addToCart)
     .patch(verifyToken,CartController.removeCart)
     .get(verifyToken,CartController.getCart)
     .delete(verifyToken,CartController.clearCart)



module.exports=router;