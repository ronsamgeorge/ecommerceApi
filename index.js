require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT || 8080;

// connect to Mongo Database
mongoose
  .connect(dbUrl)
  .then((respose) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// api endpoint routing
app.get("/app/test", () => {
  console.log("test successful");
});

// the server will listen on the specified PORT for incoming traffic, if no port given in env, use 8080
app.listen(port, () => {
  console.log("Backend server is running at", port);
});
