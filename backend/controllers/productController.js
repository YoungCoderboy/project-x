const Product = require("./../models/productModel");

const multer = require("multer");
const sharp = require("sharp");
const {
  deleteOne,
  updateOne,
  createOne,
  getAll,
  findOne,
} = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

// upload.array('images', 5); req.file
// upload.single('image'); req.files
exports.resizeProductImages = catchAsync(async (req, res, next) => {
  //  console.log(req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Process cover image
  const imageCoverFilename = `product-${
    req.params.id
  }-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${imageCoverFilename}`);

  req.body.imageCover = imageCoverFilename;

  req.body.images = [];
  // 2) Process other images
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);
      req.body.images.push(filename);
    })
  );
  next();
});
exports.getProduct = findOne(Product, { path: "reviews" });
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
exports.getAllProducts = getAll(Product);
