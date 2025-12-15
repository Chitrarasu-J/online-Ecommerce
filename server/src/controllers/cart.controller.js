import Cart from "../models/Cart.js";

// Get cart items
export const getCart = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user.id })
      .populate("product");

    res.json(items);
  } catch {
    res.status(500).json({ message: "Failed to load cart" });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let item = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (item) {
      item.quantity += 1;
      await item.save();
      return res.json(item);
    }

    item = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: 1,
    });

    res.json(item);
  } catch {
    res.status(500).json({ message: "Add to cart failed" });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({
      user: req.user.id,
      product: req.params.id,
    });

    res.json({ message: "Item removed from cart" });
  } catch {
    res.status(500).json({ message: "Remove failed" });
  }
};
