import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Wishlist.css";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/wishlist", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setItems(res.data));
  }, []);

  const moveToCart = async (productId, wishlistId) => {
    await axios.post("/cart", { productId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await axios.delete(`/wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.filter(i => i._id !== wishlistId));
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {items.map(item => (
        <div className="wishlist-item" key={item._id}>
          <img src={item.product.image} />
          <div>
            <h3>{item.product.title}</h3>
            <p>₹{item.product.price}</p>
          </div>
          <button onClick={() =>
            moveToCart(item.product._id, item._id)
          }>
            Move to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
