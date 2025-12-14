import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Pro Template Studio</h1>
        <p>
          Crafting digital excellence through modern, high-performance website templates.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>🚀 Our Mission: Crafting Digital Excellence</h2>
        <p>
          At <strong>Pro Template Studio</strong>, our mission is simple: to democratize
          world-class web design. We believe that securing a professional,
          high-performing online presence shouldn’t be expensive or complicated.
        </p>
        <p>
          We provide meticulously designed, developer-friendly templates for
          diverse needs — from high-conversion e-commerce stores and sleek
          portfolios to niche websites like modern temples and dynamic restaurant
          experiences.
        </p>
      </section>

      {/* Story */}
      <section className="about-section">
        <h2>📖 The Pro Template Studio Story</h2>
        <p>
          Pro Template Studio was founded by experienced web developers and
          creative designers who identified a major gap in the template market:
          generic, bloated themes that fail to meet real-world business needs.
        </p>
        <p>
          We built a marketplace where <strong>quality, speed, and niche specialization</strong>
          come first. Every template goes through rigorous quality checks to ensure:
        </p>

        <ul className="about-list">
          <li>🎨 Modern design aligned with the latest UI/UX trends</li>
          <li>⚡ Optimal performance with fast load times & SEO-friendly code</li>
          <li>📱 Full responsiveness across all devices</li>
          <li>🧩 Easy customization & developer-friendly structure</li>
        </ul>
      </section>

      {/* Difference */}
      <section className="about-section highlight">
        <h2>✨ Why Choose Pro Template Studio?</h2>
        <p>
          We don’t just sell templates — we deliver <strong>specialized digital solutions</strong>.
          Our templates are crafted with real users, real businesses, and real
          performance in mind.
        </p>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>🌐 Join Our Digital Community</h2>
        <p>
          Ready to take your online project from concept to launch?
          Whether you’re a freelancer, business owner, or designer —
          Pro Template Studio has the perfect foundation for you.
        </p>

        <div className="about-buttons">
          <button onClick={() => navigate("/")}>
            Explore Our Templates
          </button>

          <button
            className="secondary"
            onClick={() => alert("Template submission coming soon!")}
          >
            Are You a Designer? Submit Your Template
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;
