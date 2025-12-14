import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">
          Pro Template Studio
        </Link>
      </div>

      {/* CENTER */}
      <ul className="nav-center">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>

        {/* Categories stays SAME visually */}
        <li>
          <Link to="/category/all">Categories</Link>
        </li>
      </ul>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/register">Signup</Link>
        <Link to="/wishlist">Wishes</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}
