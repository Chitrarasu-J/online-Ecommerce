import Wishlist from "../models/Wishlist.js";

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id })
      .populate("product");
    res.json(items);
  } catch {
    res.status(500).json({ message: "Failed to load wishlist" });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const item = await Wishlist.create({
      user: req.user.id,
      product: productId,
    });

    res.json(item);
  } catch {
    res.status(500).json({ message: "Add to wishlist failed" });
  }
};

// ✅ REMOVE FROM WISHLIST (THIS WAS MISSING / WRONG)
export const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: req.params.id, // IMPORTANT
    });

    res.json({ message: "Item removed from wishlist" });
  } catch {
    res.status(500).json({ message: "Remove wishlist failed" });
  }
};
