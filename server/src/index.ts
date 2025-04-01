import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './config/connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('GeoMystery Explorer backend is running!');
});

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
