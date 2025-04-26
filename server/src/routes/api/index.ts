// server/src/routes/api/index.ts
import express from 'express';
import { authRouter } from './authRoutes'; // ✅ make sure this matches your actual export

const router = express.Router();

// Mount the /auth routes
router.use('/auth', authRouter);

export default router;
