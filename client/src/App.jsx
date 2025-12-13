import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common components
import Navbar from "./components/Navbar";
import ChatBotButton from "./components/ChatBotButton";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Router>
      {/* Navbar stays on all pages */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Static */}
        <Route path="/about" element={<About />} />

        {/* Product */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* User features */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {/* Floating chatbot */}
      <ChatBotButton />
    </Router>
  );
}

export default App;
