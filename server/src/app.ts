import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import mapRoutes from './routes/mapRoutes';
// server/src/app.ts
// import mapRoutes from './routes/mapRoutes';

const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/map', mapRoutes);

app.get('/', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});

export default app;
