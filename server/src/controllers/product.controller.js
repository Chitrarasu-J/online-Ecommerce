import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, previewUrl } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image,
      previewUrl
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
