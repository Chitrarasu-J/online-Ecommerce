import express from "express";
import Wishlist from "../models/Wishlist.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Wishlist.create({
    user: req.user.id,
    product: req.body.productId
  });
  res.json({ message: "Added to wishlist" });
});

router.get("/", auth, async (req, res) => {
  const items = await Wishlist.find({ user: req.user.id }).populate("product");
  res.json(items);
});

export default router;
