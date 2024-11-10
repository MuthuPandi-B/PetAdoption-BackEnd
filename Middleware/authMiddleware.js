import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No token found or incorrect format");
      return res.status(401).json({ message: "Unauthorized" });
    }
    

    const token = authHeader.split(' ')[1];
    console.log("Extracted token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT_SECRET used for verification:", process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
