import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

export default mongoose.model("User", userSchema);
