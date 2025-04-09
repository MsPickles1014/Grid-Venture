import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/api/authRoutes';

import connectToDB from './config/connection';
import { mapRouter } from './routes/api/mapRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('../client/dist'));
// Middleware
// app.use(cors({
//   origin: [
//     'http://localhost:5173', // Dev client
//     'https://main.dsqz7c4wzmthj.amplifyapp.com/', // :triangular_flag_on_post: Replace with your real Amplify frontend URL
//   ],
//   credentials: true,
// }));
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

app.use('/api/auth', authRouter);
console.log('✅ /api/auth routes mounted');

app.use('/api/game', mapRouter);
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
