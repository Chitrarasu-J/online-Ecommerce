import React from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import "./Home.css";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div className="home">
      <HeroSection />

      <h2 className="heading">Featured Templates</h2>

      <div className="products-container">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
