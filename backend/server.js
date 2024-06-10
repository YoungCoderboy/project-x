const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Server INITIALIZATION and DATABASE CONNECTION
const app = require("./app");
const port = process.env.PORT || 9000;
// Database connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful");
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
