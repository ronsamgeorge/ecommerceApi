const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// create Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updating user details
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // to return the updated user info
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get User info
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Users
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let productList;

    if (queryNew) {
      productList = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      productList = await Product.find({
        category: { $in: [queryCategory] },
      });
    } else {
      productList = await Product.find();
    }

    res.status(200).json(productList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
