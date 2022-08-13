const express=require('express');
const productController = require('../../controllers/productController');

const router=express.Router();

router.route('/top-5-cheap').get(productController.aliasTopProduct,productController.getAllProductsCustomer)
router.route('/featured').get(productController.aliasFeaturedProduct,productController.getAllProductsCustomer)
router.route('/')
     .post(productController.createProduct)
     .get(productController.getAllProducts)
     .put(productController.updateProduct)
router.get('/productsCustomer',productController.getAllProductsCustomer)
     


module.exports=router;