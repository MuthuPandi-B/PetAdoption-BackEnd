import express from 'express';
import { createReview, getReviews, reportReview } from '../Controllers/reviewController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create/:petId', authMiddleware, createReview);
router.get('/list', getReviews);
router.patch('/report/:id', authMiddleware, reportReview);

export default router;
