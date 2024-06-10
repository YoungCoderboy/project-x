const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const {
  deleteOne,
  updateOne,
  createOne,
  findOne,
} = require("./handlerFactory");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { productRef: req.params.productId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allowed Nested Routes
  if (!req.body.productRef) req.body.productRef = req.params.productId;
  if (!req.body.userRef) req.body.userRef = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
exports.findOneReview = findOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
