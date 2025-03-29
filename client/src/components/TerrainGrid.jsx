// src/components/TerrainGrid.jsx
import React from 'react';

const terrainClasses = {
  tree: 'bg-green-700',
  rock: 'bg-gray-500',
  path: 'bg-yellow-800',
  cave: 'bg-gray-300',
  player: 'bg-purple-600',
};

export default function TerrainGrid({ grid, playerPos }) {
  return (
    <div
      className="grid gap-[1px] border border-white"
      style={{
        gridTemplateColumns: `repeat(20, minmax(0, 1fr))`,
        gridAutoRows: '1fr',
        width: '500px',
        height: '500px',
        display: 'grid',
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const isPlayer = playerPos.x === x && playerPos.y === y;
          const cellClass = isPlayer
            ? terrainClasses.player
            : terrainClasses[cell] || 'bg-red-500';

          return (
            <div
              key={`${x}-${y}`}
              className={`${cellClass} border border-black`}
            />
          );
        })
      )}
    </div>
  );
}


