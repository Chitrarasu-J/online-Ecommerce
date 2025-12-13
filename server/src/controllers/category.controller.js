import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Category added",
      category
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

