// src/config/connection.ts
import mongoose from 'mongoose';

const connectToDB = async (): Promise<typeof mongoose.connection> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/geoExplorer');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default connectToDB;
