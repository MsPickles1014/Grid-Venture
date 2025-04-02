import { Request, Response } from 'express';
import { MapSession } from '../models/MapSession';
import { v4 as uuidv4 } from 'uuid';

export const startGameSession = async (_req: Request, res: Response) => {
  try {
    const newSession = new MapSession({
      sessionId: uuidv4(),
      startLocation: { x: 10, y: 10 },
      grid: Array(20).fill(Array(20).fill('tree')), // temporary 20x20 grid
      cluesFound: [],
      completed: false,
    });

    await newSession.save();

    res.status(201).json({ message: 'Session started', sessionId: newSession.sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to start game session' });
  }
};
