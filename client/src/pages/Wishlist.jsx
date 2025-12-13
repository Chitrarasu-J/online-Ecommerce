import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Wishlist.css"; // your existing CSS

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">My Wishlist</h1>

      <div className="wishlist-container">
        {items.length === 0 && (
          <p>Your wishlist is empty</p>
        )}

        {items.map(item => (
          <div className="wishlist-item" key={item._id}>
            {/* SAME STRUCTURE – DESIGN SAFE */}
            <img
              src={item.product.image}
              alt={item.product.title}
            />

            <div className="wishlist-info">
              <h3>{item.product.title}</h3>
              <p>₹{item.product.price}</p>
            </div>

            <button
              className="remove-wishlist-btn"
              onClick={() => removeFromWishlist(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
