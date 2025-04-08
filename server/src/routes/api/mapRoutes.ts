// src/routes/api/mapRoutes.ts
import express from 'express';
import { startGameSession } from '../../controllers/mapController';

const router = express.Router();

router.post('/start', startGameSession);

export { router as mapRouter };
