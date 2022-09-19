const express = require("express");
const  verifyToken = require('../../middlewares/verifyToken');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');


const productController = require("../../controllers/productController");
const reviewRouter = require("../../routes/api/review");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(
    productController.aliasTopCheapProduct,
    productController.getAllProductsCustomer
  );
router
  .route("/featured")
  .get(
    productController.aliasFeaturedProduct,
    productController.getAllProductsCustomer
  );
router.route("/stats-overall/:property").get(productController.productStats);
router.route("/stats-property").get(productController.ProductsStatsByPropery);
router.route("/search").get(productController.getAllProductsCustomer);

router
  .route("/")
  .post(verifyToken,verifyRoles(ROLES_LIST.Admin), productController.createProduct)
  .get(verifyToken,verifyRoles(ROLES_LIST.Admin),productController.getAllProducts)
  .delete(verifyToken,verifyRoles(ROLES_LIST.Admin),productController.deleteProduct)
  .put(verifyToken,verifyRoles(ROLES_LIST.Admin),productController.updateProduct)
  
  router.route("/removeimage")
  .patch(verifyToken,verifyRoles(ROLES_LIST.Admin),productController.removeImage) 

router.route("/:id")
.get(productController.getProductById)


module.exports = router;
