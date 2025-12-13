import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res) => {
  const items = await Wishlist.find({ user: req.userId })
    .populate("product");
  res.json(items);
};

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const exists = await Wishlist.findOne({
    user: req.userId,
    product: productId
  });

  if (exists)
    return res.json({ message: "Already in wishlist" });

  const item = await Wishlist.create({
    user: req.userId,
    product: productId
  });

  res.json(item);
};

export const removeFromWishlist = async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from wishlist" });
};
