import express from "express";
import Cart from "../models/Cart.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Cart.create({
    user: req.user.id,
    product: req.body.productId
  });
  res.json({ message: "Added to cart" });
});

router.get("/", auth, async (req, res) => {
  const items = await Cart.find({ user: req.user.id }).populate("product");
  res.json(items);
});

export default router;
