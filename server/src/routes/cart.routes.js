import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getCart } from "../controllers/cart.controller.js";

const router = express.Router();
router.get("/", auth, getCart);
export default router;
