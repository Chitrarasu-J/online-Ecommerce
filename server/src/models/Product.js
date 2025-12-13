import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,   // store INR price (₹)
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  image: {
    type: String,
    required: true,   // URL (you can use Cloudinary later)
  },

  previewUrl: {
    type: String,     // demo URL of template
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
