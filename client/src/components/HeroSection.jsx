import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-content">

        <h1 className="hero-title">Craft Your Digital Presence</h1>
        <p className="hero-subtitle">
          Explore professionally designed website templates for your next project.
        </p>

        {/* Search Bar */}
        <div className="search-box">
          <input type="text" placeholder="Search templates..." />
          <button>Search</button>
        </div>

      </div>

      {/* Floating Icons */}
      <div className="float-icons">
        <span>💼</span>
        <span>🎨</span>
        <span>📸</span>
      </div>
    </div>
  );
}

export default HeroSection;
