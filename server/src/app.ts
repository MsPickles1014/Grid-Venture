// server/src/app.ts
import express from 'express';
import cors from 'cors';
// import mapRoutes from './routes/mapRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api', mapRoutes)
app.get('/', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});

export default app;
