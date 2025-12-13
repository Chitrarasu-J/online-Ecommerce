import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Log In to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email ID"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Log In</button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Sign up now</Link>
        </p>
      </div>
    </div>
  );
}
