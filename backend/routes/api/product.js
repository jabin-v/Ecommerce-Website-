const express=require('express');
const productController = require('../../controllers/productController');

const router=express.Router();


router.route('/')
     .post(productController.createProduct)
     .get(productController.getAllProducts)
     .put(productController.updateProduct)
     


module.exports=router;