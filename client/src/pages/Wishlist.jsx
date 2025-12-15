import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Wishlist.css";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("/wishlist", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setItems(res.data))
    .catch(() => {});
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems(prev =>
        prev.filter(item => item.product._id !== productId)
      );
    } catch {
      alert("Failed to remove item");
    }
  };

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">My Wishlist</h1>

      {items.length === 0 && <p>Your wishlist is empty</p>}

      <div className="wishlist-container">
        {items.map(item => (
          <div className="wishlist-item" key={item._id}>
            <img
              src={item.product.image}
              alt={item.product.title}
            />

            <div className="wishlist-info">
              <h3>{item.product.title}</h3>
              <p>₹{item.product.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromWishlist(item.product._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
