import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(res.data);
    };
    loadCart();
  }, []);

  const handlePayment = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/payment/checkout",
      { items: cart },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    window.location.href = res.data.url;
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout</h2>

      <h3>Total Amount: ₹{total}</h3>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          background: "#0a1f44",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
