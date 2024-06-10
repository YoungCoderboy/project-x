const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Product must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A product name must have less or equal then 40 characters",
      ],
      minlength: [
        5,
        "A product name must have more or equal then 10 characters",
      ],
    },
    slug: String,

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, "Rating must be above 0.0"],
      max: [5, "Rating must be below 5.0"],
      // set: val => Math.round(val * 10) / 10 // 4.66666 => 46.6666 => 47 => 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          // doesn't work on update
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    secretproduct: {
      type: Boolean,
      default: false,
    },

    sellers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Review'
    //   }
    // ]
  },
  {
    // schema option
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ price: 1 });

productSchema.index({ slug: 1 });

// Virtual Populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productRef",
  localField: "_id",
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not in insertMany()
// This will run before the document is saved to the database
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE

productSchema.pre(/^find/, function (next) {
  this.find({ secretproduct: { $ne: true } });

  this.start = Date.now();
  next();
});
//  Populating the data
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

productSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const product = mongoose.model("product", productSchema);

module.exports = product;
