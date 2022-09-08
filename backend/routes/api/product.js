const express = require("express");
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
  .post(productController.createProduct)
  .get(productController.getAllProducts)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct)
  
  router.route("/removeimage")
  .patch(productController.removeImage) 

router.route("/:id")
.get(productController.getProductById)


module.exports = router;
