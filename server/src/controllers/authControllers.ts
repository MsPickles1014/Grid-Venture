import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Utility to create JWT
const signToken = (userId: string, username: string) => {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '1h' });
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    const token = signToken(user._id.toString(), user.username);
    console.log('✅ JWT Token generated:', token);

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const token = signToken(user._id.toString(), user.username);
    console.log('✅ Login JWT Token generated:', token);

    res.json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
