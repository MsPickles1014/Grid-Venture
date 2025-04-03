import express, { RequestHandler } from 'express';
import { createUser, loginUser } from '../controllers/authControllers';

const router = express.Router();
console.log('✅ authRoutes file loaded');

router.post('/register', (req, res, next) => {
    console.log('📥 POST /register hit');
    next();
  }, createUser);
router.post('/login', loginUser);


export default router;


