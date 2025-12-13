import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", auth, getWishlist);
router.post("/", auth, addToWishlist);
router.delete("/:id", auth, removeFromWishlist);

export default router;
