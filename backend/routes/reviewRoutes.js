const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo("user"), reviewController.createReview);
router
  .route("/:id")
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  )
  .get(reviewController.findOneReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  );
module.exports = router;
