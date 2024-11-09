import express from "express";
import { approveApplication, createApplication, deleteApplication, editApplication, rejectApplication,  } from "../Controllers/applicationController.js";
import { adminMiddleware, authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/create",authMiddleware, createApplication);
router.patch("/approve/:id",authMiddleware ,approveApplication);
router.patch("/reject/:id",authMiddleware,adminMiddleware ,rejectApplication);
router.delete("/delete/:id",authMiddleware, deleteApplication);
router.put("/edit/:id",authMiddleware ,editApplication);
export default router;