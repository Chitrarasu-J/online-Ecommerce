import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img src={product.image} alt={product.title} className="product-image" />

      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">₹{product.price}</p>

      <button className="view-btn">View Template</button>

    </div>
  );
}

export default ProductCard;
