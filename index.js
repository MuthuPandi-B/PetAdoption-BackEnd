import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbconfig.js";
import authRoutes from "./Routers/authRoutes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to pet adoption backend");
});
app.use ("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});