// import jwt from "jsonwebtoken";
// import User from "../Models/userSchema.js";
// import dotenv from "dotenv";
// dotenv.config();

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       console.log("No token found or incorrect format");
//       return res.status(401).json({ message: "Unauthorized" });
//     }
    

//     const token = authHeader.split(' ')[1];
//     console.log("Extracted token:", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("JWT_SECRET used for verification:", process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.userId).select("-password");

//     if (!req.user) {
//       console.log("User not found");
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  //const token = req.header("Authorization"); // 1st method
  const token = req.headers.authorization?.split(" ")[1]; // split(' ') [1] => bearer token

  if (!token) {
    return res.status(401).json({ message: "Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware for admin functionalites

export const adminMiddleware = async(req, res, next) => {

  if(req.user.role !== "shelter"){
    return res.status(403).json({message: "Access Denied"});
  }
  next();
};