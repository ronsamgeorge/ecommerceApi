const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register new user route
router.post("/register", async (req, res) => {
  // implement error checking for fields here later

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // check if username exists
    if (!user) {
      res.status(401).json("Incorrect username");
    }

    // retrieve hashed password and decrypt it
    // recieved is an Object -> convert to string for comparison
    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );

    const originalPassword = decryptedPassword.toString(CryptoJs.enc.Utf8);

    console.log(user.password);

    // check saved password and received password
    if (originalPassword !== req.body.password) {
      res.status(401).json("Incorrect credential");
    }

    // create jwt access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc; //stores user info except password in others;
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
