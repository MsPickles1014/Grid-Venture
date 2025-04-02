import mongoose, { Schema, Document } from 'mongoose';

export interface IMapSession extends Document {
  sessionId: string;
  startLocation: { x: number; y: number };
  grid: string[][];
  cluesFound: { x: number; y: number }[];
  completed: boolean;
  score?: number;
}

const MapSessionSchema = new Schema<IMapSession>({
  sessionId: { type: String, required: true, unique: true },
  startLocation: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  grid: { type: [[String]], required: true },
  cluesFound: [{ x: Number, y: Number }],
  completed: { type: Boolean, default: false },
  score: { type: Number }
});

export const MapSession = mongoose.model<IMapSession>('MapSession', MapSessionSchema);
