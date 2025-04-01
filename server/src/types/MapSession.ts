
export interface MapSession {
    sessionId: string;
    userId?: string;
    startLocation: { x: number; y: number };
    grid: string[][];
    cluesFound: { x: number; y: number }[];
    completed: boolean;
    score?: number;
  }
  