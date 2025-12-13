import axios from "../api/axiosClient";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const token = localStorage.getItem("token");

  const addToCart = async () => {
    if (!token) {
      alert("Please login to add to cart");
      return;
    }

    try {
      await axios.post(
        "/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    if (!token) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      await axios.post(
        "/wishlist",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist");
    } catch (err) {
      alert("Failed to add to wishlist");
    }
  };

  return (
    <div className="product-card">
      {/* ⛔ DO NOT CHANGE MARKUP */}
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>
      <p className="price">₹{product.price}</p>

      <div className="card-actions">
        {/* SAME BUTTONS – JUST CONNECTED */}
        <button className="cart-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <button className="wish-btn" onClick={addToWishlist}>
          ❤️
        </button>
      </div>
    </div>
  );
}
