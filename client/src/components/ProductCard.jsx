import { useNavigate } from "react-router-dom";
import axios from "../api/axiosClient";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addToCart = async (e) => {
    e.stopPropagation(); // ❗ prevent page navigation

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
    } catch {
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async (e) => {
    e.stopPropagation(); // ❗ prevent page navigation

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
    } catch {
      alert("Failed to add to wishlist");
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* ❗ IMAGE & DESIGN UNCHANGED */}
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>
      <p className="price">₹{product.price}</p>

      <div className="card-actions">
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
