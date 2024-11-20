import express from "express";
import { sendMessage, getConversations } from "../Controllers/messageController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage); // Authenticated users can send messages
router.get("/", authMiddleware, getConversations); // Authenticated users can view their conversations

export default router;
