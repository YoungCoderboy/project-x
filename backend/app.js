const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const productRouter = require("./routes/productRoutes");
const app = express();

app.use(cors());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

module.exports = app;
