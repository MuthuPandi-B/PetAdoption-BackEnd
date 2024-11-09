import express from "express";
import { approveApplication, createApplication, deleteApplication, editApplication, rejectApplication,  } from "../Controllers/applicationController.js";

const router = express.Router();
router.post("/create", createApplication);
router.post("/approve/:id", approveApplication);
router.post("/reject/:id", rejectApplication);
router.post("/delete/:id", deleteApplication);
router.patch("/edit/:id", editApplication);
export default router;