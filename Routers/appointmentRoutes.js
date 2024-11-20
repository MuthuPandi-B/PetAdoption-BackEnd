import express from "express";
import { scheduleAppointment, getAppointmentsByUser, getAllAppointments } from "../Controllers/appointmentController.js";
import { authMiddleware, adminMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/schedule", authMiddleware, scheduleAppointment); // Authenticated users can schedule appointments
router.get("/user", authMiddleware, getAppointmentsByUser); // Authenticated users can view their appointments
router.get("/all", adminMiddleware, getAllAppointments); // Admin can view all appointments

export default router;
