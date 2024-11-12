import express from 'express';
import { createAppointment, getAppointments } from '../Controllers/appointmentController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createAppointment);
router.get('/list', authMiddleware, getAppointments);

export default router;
