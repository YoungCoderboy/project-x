const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
// const reviewController = require('./../controllers/reviewController');
const router = express.Router();
const reviewRouter = require("./reviewRoutes");

// router.param('id', productController.checkID);

router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.uploadProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.deleteProduct
  );

module.exports = router;
