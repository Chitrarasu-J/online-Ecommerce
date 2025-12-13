import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import { addToCart } from "../api/cartApi";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} />

            <div className="details-info">
                <h1>{product.title}</h1>
                <p className="price">₹{product.price}</p>
                <p className="desc">{product.description}</p>

                <div className="btn-group">
                    <button
                        className="cart-btn"
                        onClick={async () => {
                            try {
                                await addToCart(product._id);
                                alert("Added to cart!");
                            } catch (err) {
                                alert("Please login first");
                            }
                        }}
                    >
                        Add to Cart
                    </button>

                    <button className="wish-btn">Add to Wishlist</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
