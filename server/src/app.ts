import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'; // ✅ case-sensitive match
import connectToDB from './config/connection';
import mapRoutes from './routes/mapRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (origin.includes("localhost")) return callback(null, true);

      if (origin.includes("vercel.app")) return callback(null, true);

      if (origin.includes("onrender.com")) return callback(null, true);


      // Otherwise, deny the request
      
      callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Routes

app.use('/api/auth', authRoutes);
console.log('✅ /api/auth routes mounted');

app.use('/api/map', mapRoutes);
// console.log(app._router.stack.map((r: any) => r.route?.path || r.name).filter(Boolean));



// Test routes
app.get('/test', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});

// ✅ Start the server after DB connects
(async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();
export default app;
