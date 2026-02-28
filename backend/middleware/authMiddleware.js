import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect Middleware
export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];

      // // 👇 ADD THESE DEBUG LINES
      // console.log("=== AUTH MIDDLEWARE DEBUG ===");
      // console.log("Token received:", token ? token.substring(0, 30) + "..." : "NULL");
      // console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
      // console.log("JWT_SECRET value:", process.env.JWT_SECRET);
      // console.log("=============================");
      // // 👆 END DEBUG LINES

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user;
      next();
    } else {
      console.log("❌ No authorization header found"); // ADD THIS
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.log("❌ JWT Error:", error.message); // MODIFY THIS
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// Admin Middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else return res.status(403).json({ message: "Access denied. Admin only." });
};

export default protect;