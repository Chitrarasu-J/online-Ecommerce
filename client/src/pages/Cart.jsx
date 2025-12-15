import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        axios.get("/cart", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setItems(res.data));
    }, [token]);

    const removeItem = async (productId) => {
        try {
            await axios.delete(`/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // instant UI update
            setItems(prev =>
                prev.filter(item => item.product._id !== productId)
            );
        } catch {
            alert("Failed to remove item");
        }
    };

    const total = items.reduce((sum, item) => {
        const price = Number(item.product?.price || 0);
        const qty = Number(item.quantity || 1);
        return sum + price * qty;
    }, 0);


    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>

            {items.length === 0 && <p>Your cart is empty</p>}

            {items.map(item => (
                <div className="cart-item" key={item._id}>
                    <img src={item.product.image} alt={item.product.title} />

                    <div>
                        <h3>{item.product.title}</h3>
                        <p>₹{item.product.price}</p>
                    </div>

                    <button
                        className="remove-btn"
                        onClick={() => removeItem(item.product._id)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <h2>Total: ₹{total.toFixed(2)}</h2>


            {items.length > 0 && (
                <button
                    className="checkout-btn"
                    onClick={() => navigate("/checkout")}
                >
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
}
