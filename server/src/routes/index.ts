// src/routes/index.ts
import { Router } from 'express';
import { authRouter } from './api/authRoutes';

import { mapRouter } from './api/mapRoutes';


const router = Router();

// Mount your actual route paths
router.use('/api/auth', authRouter);
router.use('/api/game', mapRouter);

export default router;
