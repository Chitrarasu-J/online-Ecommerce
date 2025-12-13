import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/cart", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setItems(res.data));
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.filter(i => i._id !== id));
  };

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity, 0
  );

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {items.map(item => (
        <div className="cart-item" key={item._id}>
          <img src={item.product.image} />
          <div>
            <h3>{item.product.title}</h3>
            <p>₹{item.product.price}</p>
          </div>
          <button onClick={() => removeItem(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
      <button className="checkout-btn">
        Proceed to Checkout
      </button>
    </div>
  );
}
