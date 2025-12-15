import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} from "../controllers/wishlist.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Add to wishlist
router.post("/", authMiddleware, addToWishlist);

// Get wishlist
router.get("/", authMiddleware, getWishlist);

// ✅ REMOVE FROM WISHLIST (IMPORTANT)
router.delete("/remove/:id", authMiddleware, removeFromWishlist);

export default router;
