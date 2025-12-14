import Product from "../models/Product.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Please type a message 😊" });
    }

    const text = message.toLowerCase();
    const products = await Product.find();

    // ✅ SAFE formatter (multiline + fallback)
    const formatProducts = (items) => {
      return items
        .map((p) => {
          const title = p.title || p.name || "Template";
          const price = p.price ?? "N/A";
          const desc = p.description || "No description available";

          return `${title}\nPrice: ₹${price}\nDescription: ${desc}`;
        })
        .join("\n\n"); // blank line between products
    };

    if (text.includes("portfolio")) {
      const items = products.filter(p =>
        p.category?.toLowerCase().includes("portfolio")
      );

      return res.json({
        reply: items.length
          ? formatProducts(items)
          : "No portfolio templates available."
      });
    }

    if (text.includes("business")) {
      const items = products.filter(p =>
        p.category?.toLowerCase().includes("business")
      );

      return res.json({
        reply: items.length
          ? formatProducts(items)
          : "No business templates available."
      });
    }

    if (text.includes("restaurant")) {
      const items = products.filter(p =>
        p.category?.toLowerCase().includes("restaurant")
      );

      return res.json({
        reply: items.length
          ? formatProducts(items)
          : "No restaurant templates available."
      });
    }

    if (text.includes("price")) {
      return res.json({
        reply:
          "Our templates range from ₹299 to ₹999 depending on category and features."
      });
    }    
   
    return res.json({
      reply:
        "I can help you with portfolio, business, or restaurant templates. Try asking 😊"
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "Server error. Please try again." });
  }
};
