const express=require('express');
const productController = require('../../controllers/productController');
const reviewRouter =require("../../routes/api/review")

const router=express.Router();



router.use('/:productId/reviews',reviewRouter)






router.route('/top-5-cheap').get(productController.aliasTopCheapProduct,productController.getAllProductsCustomer)
router.route('/featured').get(productController.aliasFeaturedProduct,productController.getAllProductsCustomer)
router.route('/stats-overall').get(productController.productStats)
router.route('/stats-property').get(productController.ProductsStatsByPropery)
router.route('/productsCustomer').get(productController.getAllProductsCustomer)





router.route('/')
     .post(productController.createProduct)
     .get(productController.getAllProducts)
     .put(productController.updateProduct)

router.route('/:id').get(productController.getProductById)




     


module.exports=router;