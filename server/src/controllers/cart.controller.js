import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const items = await Cart.find({ user: req.userId })
    .populate("product");
  res.json(items);
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;

  const item = await Cart.findOne({
    user: req.userId,
    product: productId
  });

  if (item) {
    item.quantity += 1;
    await item.save();
    return res.json(item);
  }

  const newItem = await Cart.create({
    user: req.userId,
    product: productId
  });

  res.json(newItem);
};

export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from cart" });
};
