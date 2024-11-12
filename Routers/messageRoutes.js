import express from 'express';
import { sendMessage, getMessages } from '../Controllers/messageController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/list', authMiddleware, getMessages);

export default router;
