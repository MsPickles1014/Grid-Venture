// src/components/TerrainGrid.jsx
import React from 'react';
import Player from './Player';
import Npc from './Npc';

// Terrain tile classes mapped to CSS classes
const terrainClasses = {
  tree: 'bg-green-700', // Impassable tree tile
  rock: 'bg-gray-500', // Obstacle tile (potentially requiring tools)
  path: 'bg-yellow-800', // Walkable path
  cave: 'bg-gray-300', // Walkable cave floor
};

// Function to check if position is within bounds
const isWithinBounds = (x, y, grid) => {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
};

export default function TerrainGrid({
  grid,
  playerPos,
  playerFrame,
  playerDirection,
  npcPos,
  npcUnlocked,
  npcInteractionTriggered, // 🚩 New prop
  setNpcUnlocked, // 🚩 New prop
  setNpcPos, // 🚩 New prop
}) {
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
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`${terrainClasses[cell] || 'bg-red-500'} border border-black relative`}
          >
            {/* Render Player */}
            {playerPos.x === x && playerPos.y === y && (
              <Player frame={playerFrame} direction={playerDirection} />
            )}

            {/* Render NPC with bounds check */}
            {npcPos.x === x && npcPos.y === y && (
              <Npc
                npcPos={npcPos}
                unlocked={npcUnlocked}
                onUnlock={() => {
                  // Check NPC new position within bounds before moving
                  const newNpcPos = { x: 12, y: 17 };
                  if (isWithinBounds(newNpcPos.x, newNpcPos.y, grid)) {
                    setNpcUnlocked(true); // Unlock NPC after 3 interactions
                    console.log("new npc pos: ", newNpcPos )
                    setNpcPos(newNpcPos); // Move NPC to new position
                  } else {
                    console.error('🚨 New NPC position is out of bounds!');
                  }
                }}
                triggerInteraction={npcInteractionTriggered} // Controls interaction
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}