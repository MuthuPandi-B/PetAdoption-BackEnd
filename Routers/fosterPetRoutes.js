import express from 'express';
import { createFosterPet, getFosterPetsByShelter, getFosterPetById, updateFosterPetStatus, assignFosterParent } from '../Controllers/fosterPetController.js';
import { authMiddleware, adminMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createFosterPet);
router.get('/shelter/:shelterId', authMiddleware, getFosterPetsByShelter);
router.get('/:id', authMiddleware, getFosterPetById);
router.put('/status/:id', authMiddleware, updateFosterPetStatus);
router.put('/assign/:id', authMiddleware, assignFosterParent);

export default router;
