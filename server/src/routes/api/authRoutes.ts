// src/routes/api/authRoutes.ts
import express from 'express';
import { createUser, loginUser } from '../../controllers/authControllers';

const router = express.Router();

// Optional: log once when route is loaded
console.log('✅ authRoutes file loaded');

// Register route
router.post('/register', createUser);

// Login route
router.post('/login', loginUser);

export { router as authRouter };


