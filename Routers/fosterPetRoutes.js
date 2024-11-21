// import express from 'express';
// import { createFosterPet, getFosterPetsByShelter, getFosterPetById, updateFosterPetStatus, assignFosterParent } from '../Controllers/fosterPetController.js';
// import { authMiddleware, adminMiddleware } from '../Middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/create', authMiddleware, createFosterPet);
// router.get('/shelter/:shelterId', authMiddleware, getFosterPetsByShelter);
// router.get('/:id', authMiddleware, getFosterPetById);
// router.put('/status/:id', authMiddleware, updateFosterPetStatus);
// router.put('/assign/:id', authMiddleware, assignFosterParent);

// export default router;
// import express from 'express';
// import { createFosterPet, getFosterPetsByShelter, getPendingFosterPets, requestToFoster, updateFosterNotes, requestReturn, acceptFosterRequest } from '../controllers/fosterPetController.js';
// import { authMiddleware, adminMiddleware } from '../Middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/create', authMiddleware, adminMiddleware, createFosterPet);
// router.get('/shelter', authMiddleware, adminMiddleware, getFosterPetsByShelter);
// router.get('/pending', authMiddleware, getPendingFosterPets);
// router.post('/request/:id', authMiddleware, requestToFoster);
// router.put('/note/:id', authMiddleware, updateFosterNotes);
// router.post('/return/:id', authMiddleware, requestReturn);
// router.post('/accept/:id', authMiddleware, adminMiddleware, acceptFosterRequest);

// export default router;
import express from 'express';
import { createFosterPet, getFosterPetsByShelter, getPendingFosterPets, requestToFoster, updateFosterNotes, requestReturn, acceptFosterRequest, getFosterPetsForFoster } from '../controllers/fosterPetController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, adminMiddleware, createFosterPet);
router.get('/shelter', authMiddleware, adminMiddleware, getFosterPetsByShelter);
router.get('/pending', authMiddleware, getPendingFosterPets);
router.get('/foster', authMiddleware, getFosterPetsForFoster); // Added this route
router.post('/request/:id', authMiddleware, requestToFoster);
router.put('/note/:id', authMiddleware, updateFosterNotes);
router.post('/return/:id', authMiddleware, requestReturn);
router.post('/accept/:id', authMiddleware, adminMiddleware, acceptFosterRequest);

export default router;
