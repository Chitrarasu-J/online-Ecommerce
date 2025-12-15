import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Add to cart
router.post("/", authMiddleware, addToCart);

// Get cart
router.get("/", authMiddleware, getCart);

// Remove from cart (by productId)
router.delete("/remove/:id", authMiddleware, removeFromCart);

export default router;
