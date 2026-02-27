import express from 'express';
import {registerUser, login, getAllUsers, getProfile, updateProfile, deleteProfile} from '../controllers/authController.js';
import {protect, adminOnly} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/', protect, adminOnly, getAllUsers);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/:id', protect, deleteProfile);

export default router;