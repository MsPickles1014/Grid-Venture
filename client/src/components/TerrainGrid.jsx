// src/components/TerrainGrid.jsx
import React from 'react';
import Player from './Player';
import Npc from './Npc';

// Terrain tile classes mapped to CSS classes
const terrainClasses = {
  tree: 'bg-green-700',
  rock: 'bg-gray-500',
  path: 'bg-yellow-800',
  cave: 'bg-gray-300',
  log: 'bg-orange-900',
  key: 'bg-blue-300',
  lockedChest: 'bg-yellow-500',
  rockslide: 'bg-gray-800',
  pickaxe: 'bg-red-400',
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
  npcInteractionTriggered,
  setNpcUnlocked,
  setNpcPos,
  exploredTiles,
}) {
  const currentTile = grid[playerPos.y][playerPos.x];
  const radius = currentTile === 'cave' ? 1 : 2;

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
          const isVisible = exploredTiles.has(`${x},${y}`);
          const isNearPlayer =
            Math.abs(playerPos.x - x) <= radius &&
            Math.abs(playerPos.y - y) <= radius;
          const shouldRender = isVisible || isNearPlayer;

          // Show 'rock' if the cave hasn't been explored yet
          const displayTile = !shouldRender
            ? 'black'
            : cell === 'cave' && !exploredTiles.has(`${x},${y}`)
            ? 'rock'
            : cell;

          return (
            <div
              key={`${x}-${y}`}
              className={`relative border border-black ${
                shouldRender ? terrainClasses[displayTile] : 'bg-black'
              }`}
            >
              {/* Render Player */}
              {playerPos.x === x && playerPos.y === y && (
                <Player frame={playerFrame} direction={playerDirection} />
              )}

              {/* Render NPC with bounds check */}
              
              {npcPos.x === x && npcPos.y === y && exploredTiles.has(`${x},${y}`) && (
  <Npc
    npcPos={npcPos}
    unlocked={npcUnlocked}
    onUnlock={() => {
      const newNpcPos = { x: 12, y: 17 };
      if (isWithinBounds(newNpcPos.x, newNpcPos.y, grid)) {
        setNpcUnlocked(true);
        setNpcPos(newNpcPos);
      } else {
        console.error('🚨 New NPC position is out of bounds!');
      }
    }}
    triggerInteraction={npcInteractionTriggered}
  />
)}
            </div>
          );
        })
      )}
    </div>
  );
}