// src/pages/Game.jsx
import React, { useState } from 'react';
import TerrainGrid from '../components/TerrainGrid';

const gridSize = 20;

// Sample terrain setup
const generateGrid = () => {
  const grid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill('path'));

  // Add some terrain for testing
  grid[2][3] = 'tree';
  grid[5][5] = 'tree';
  grid[4][7] = 'rock';
  grid[10][10] = 'cave';
  grid[0][0] = 'path'; // Make sure start is walkable

  return grid;
};

export default function Game() {
  const [grid] = useState(generateGrid());
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });

  const isWalkable = (x, y) => {
    const terrain = grid[y][x];
    return terrain === 'path' || terrain === 'cave';
  };

  const movePlayer = (dx, dy) => {
    setPlayerPos((prev) => {
      const newX = Math.max(0, Math.min(gridSize - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(gridSize - 1, prev.y + dy));

      // Prevent walking into trees/rocks
      if (!isWalkable(newX, newY)) return prev;

      return { x: newX, y: newY };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 space-y-6">
      <h1 className="text-3xl font-bold">GeoMystery Explorer</h1>

      {/* Grid */}
      <TerrainGrid grid={grid} playerPos={playerPos} />

      {/* Controls */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div></div>
        <button onClick={() => movePlayer(0, -1)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">⬆️</button>
        <div></div>
        <button onClick={() => movePlayer(-1, 0)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">⬅️</button>
        <div></div>
        <button onClick={() => movePlayer(1, 0)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">➡️</button>
        <div></div>
        <button onClick={() => movePlayer(0, 1)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">⬇️</button>
        <div></div>
      </div>
    </div>
  );
}
