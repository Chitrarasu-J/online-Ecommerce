import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

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
            placeholder="Set Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login now</Link>
        </p>
      </div>
    </div>
  );
}
