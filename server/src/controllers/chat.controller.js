import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.json({ reply: "Please type a message." });
    }

    const text = message.toLowerCase();

    // Portfolio templates
    if (text.includes("portfolio")) {
      const category = await Category.findOne({ name: "portfolio" });

      if (!category) {
        return res.json({ reply: "Portfolio category not found." });
      }

      const products = await Product.find({
        category: category._id
      }).limit(3);

      return res.json({
        reply: products.length
          ? products.map(p => `${p.title} – ₹${p.price}`).join("\n")
          : "No portfolio templates available."
      });
    }

    res.json({
      reply: "Ask me about portfolio or business templates."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error" });
  }
};
