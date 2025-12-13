import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      // ✅ Ensure array & proper order
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* HERO SECTION (unchanged) */}
      <HeroSection />

      <h2 className="heading">Featured Templates</h2>

      <div className="products-container">
        {loading ? (
          <p style={{ color: "#777" }}>Loading templates...</p>
        ) : products.length === 0 ? (
          <p style={{ color: "#777" }}>No templates available</p>
        ) : (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
