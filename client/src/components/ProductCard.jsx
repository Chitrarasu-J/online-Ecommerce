import { useNavigate } from "react-router-dom";
import axios from "../api/axiosClient";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent card click

    if (!token) {
      navigate("/login"); // 🔥 direct redirect (NO popup)
      return;
    }

    try {
      await axios.post(
        "/cart",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ✅ silent success (no alert)
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // prevent card click

    if (!token) {
      navigate("/login"); // 🔥 direct redirect (NO popup)
      return;
    }

    try {
      await axios.post(
        "/wishlist",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ✅ silent success
    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* IMAGE & UI — UNCHANGED */}
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>
      <p className="price">₹{product.price}</p>

      <div className="card-actions">
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="wish-btn" onClick={handleAddToWishlist}>
          ❤️
        </button>
      </div>
    </div>
  );
}
