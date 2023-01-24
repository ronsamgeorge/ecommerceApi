const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// create Product
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updating user details
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // to return the updated user info
    );
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get User Cart
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userid });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get ALL cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cartsList = await Cart.find();
    res.status(200).json(cartsList);
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
