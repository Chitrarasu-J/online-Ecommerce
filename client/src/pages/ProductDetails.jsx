import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";
import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to load product", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

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
                alert("Added to cart");
              } catch {
                alert("Please login first");
              }
            }}
          >
            Add to Cart
          </button>

          <button
            className="wish-btn"
            onClick={async () => {
              try {
                await addToWishlist(product._id);
                alert("Added to wishlist");
              } catch {
                alert("Please login first");
              }
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
