import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:5000/api/products";

        // ✅ if category is NOT "all", filter by category
        if (name !== "all") {
          url = `http://localhost:5000/api/products/category/${name}`;
        }

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load templates", err);
      }
    };

    fetchProducts();
  }, [name]);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
        {name === "all" ? "All Templates" : `${name} Templates`}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <p>No templates available.</p>
        )}
      </div>
    </div>
  );
}

export default Category;
