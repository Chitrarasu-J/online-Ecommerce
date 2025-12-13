import express from "express";
import { addProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", addProduct);           // Add product
router.get("/", getAllProducts);           // Get all
router.get("/:id", getProductById);        // Get one

export default router;
