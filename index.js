require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");

const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT || 8080;

// connect to Mongo Database
mongoose
  .connect(dbUrl)
  .then((respose) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.use(express.json()); // to parse req bodies
// api endpoint routing
app.use("/api/users", userRoute);

// the server will listen on the specified PORT for incoming traffic, if no port given in env, use 8080
app.listen(port, () => {
  console.log("Backend server is running at", port);
});
