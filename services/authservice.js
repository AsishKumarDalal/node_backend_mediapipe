// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const cors = require("cors");
const PersonalInfo = require("../models/personalinfo");
const JWT_SECRET = "hono";
const register_service = async (userData) => {
  try {
    const { email, password, ...rest } = userData;
    const existingUser = await PersonalInfo.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new PersonalInfo({
      email,
      password: hashedPassword,
      ...rest,
    });
    const savedUser = await newUser.save();
    // return {
    //   success: true,
    //   message: "User registered successfully",
    //   userId: savedUser._id,
    // };
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      success: true,
      email,
      message: "Login successful",
      token,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Registration failed",
    };
  }
};
const login_service = async (email, password) => {
  try {
    // 1. Find user by email
    const user = await PersonalInfo.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // 3. Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      success: true,
      email,
      message: "Login successful",
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Login failed",
    };
  }
};
// const jwt_check = (token) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return false;
//   const decoded = jwt.verify(token, JWT_SECRET);
//   return true;
// };
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      //   req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
};
module.exports = {
  register_service,
  login_service,
  protect,
};
