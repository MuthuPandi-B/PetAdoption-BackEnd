import express from "express";
import { createPet, editPet, deletePet,getPets } from "../Controllers/petController.js";
import { adminMiddleware, authMiddleware } from "../Middleware/authMiddleware.js";
import { loginUser } from "../Controllers/authController.js";



const router = express.Router();
router.post("/login", loginUser);
router.post("/create", authMiddleware,adminMiddleware, createPet);
router.put("/edit/:id", authMiddleware,adminMiddleware, editPet);
router.delete("/delete/:id",authMiddleware, adminMiddleware, deletePet);
router.get("/get", getPets);
router.get("/get/:id", getPets);
export default router;