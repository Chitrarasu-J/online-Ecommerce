import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   REGISTER (SIGN UP)
========================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Required fields check
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // 3️⃣ Uppercase letter
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    // 4️⃣ Number
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one number",
      });
    }

    // 5️⃣ Special symbol
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special symbol (@ $ ! % * ? &)",
      });
    }

    // 6️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8️⃣ Save user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 9️⃣ Success response
    return res.status(201).json({
      message: "Registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "1d" }
    );

    // 4️⃣ Success response
    return res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
