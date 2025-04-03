import express from 'express';
import { createUser, loginUser } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/register
router.post('/register', createUser);

// POST /api/auth/login
router.post('/login', loginUser);

export default router;
