import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'; // ✅ case-sensitive match


import mapRoutes from './routes/mapRoutes';


const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
console.log('✅ /api/auth routes mounted');

app.use('/api/map', mapRoutes);
console.log(app._router.stack.map((r: any) => r.route?.path || r.name).filter(Boolean));


app.get('/', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});
app.get('/test', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});

export default app;
