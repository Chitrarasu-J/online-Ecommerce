import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // IMPORTANT: direct array
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});
// GET PRODUCTS BY CATEGORY
router.get("/category/:name", async (req, res) => {
  try {
    const category = req.params.name.toLowerCase();

    const products = await Product.find({
      category: category
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to load category products" });
  }
});

export default router;
