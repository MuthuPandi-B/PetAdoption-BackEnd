import express from 'express';
import { sendAdoptionRequest } from '../Controllers/adoptionController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', authMiddleware, sendAdoptionRequest);

export default router;
