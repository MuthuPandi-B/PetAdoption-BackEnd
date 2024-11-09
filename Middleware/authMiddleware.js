import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js"; // Ensure correct path to user schema
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token Missing" });
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (error) { 
    res.status(401).json({ message: "Invalid token" });
  }
};
    
export const adminMiddleware = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
