import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Utility to create JWT
const signToken = (userId: string, username: string) => {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '1h' });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ username, password: hashedPassword });

    // Generate JWT (no password in payload!)
    const token = signToken(user._id.toString(), user.username);
    console.log('✅ JWT Token generated:', token); // 👈 add this line


    return res.status(201).json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error('User creation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
