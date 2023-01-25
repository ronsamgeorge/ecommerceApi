require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/carts");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT || 8080;

// connect to Mongo Database
mongoose
  .connect(dbUrl)
  .then((respose) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// to parse req json bodies
app.use(express.json());

app.use(cors());

// api endpoint routing
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// the server will listen on the specified PORT for incoming traffic, if no port given in env, use 8080
app.listen(port, () => {
  console.log("Backend server is running at", port);
});
