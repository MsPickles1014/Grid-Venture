// src/components/TerrainGrid.jsx
import React from 'react';
import Player from './Player';
import Npc from './Npc';

// Terrain tile classes mapped to images or CSS colors
const terrainClasses = {
  ground: '/assets/tiles/ground.png',
  rockBackground: '/assets/tiles/rock_background.png', 
  rock: '/assets/tiles/left_rock_corner.png',          
  tree: '/assets/tiles/Trees.png',
  path: '/assets/tiles/path.png',
  cave: '/assets/tiles/cave_floor.png',
  log: '/assets/objects/log.png',
  key: '/assets/objects/Key.png',
  lockedChest: '/assets/objects/locked_chest.png',
  unlockedChest: '/assets/objects/unlocked_chest.png',
  rockslide: '/assets/tiles/Rockslide.png',
  pickaxe: '/assets/objects/Pickaxe.png',
  secret: '/assets/tiles/Trees.png',
};


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
        gridTemplateColumns: `repeat(20, 5vw)`, // each tile 5% of viewport width
        gridAutoRows: '5vw',                   // same for height to keep it square
        display: 'grid',
        maxWidth: '100vw',
        maxHeight: '100vh',
        margin: '0 auto',
      }}
      
    >
      {grid.map((row, y) =>
  row.map((cell, x) => {
    const isVisible = exploredTiles.has(`${x},${y}`);
    const isNearPlayer =
      Math.abs(playerPos.x - x) <= radius &&
      Math.abs(playerPos.y - y) <= radius;
    const shouldRender = isVisible || isNearPlayer;

    const caveObjects = ['key', 'pickaxe', 'lockedChest', 'unlockedChest'];
    const playerIsInsideCave = currentTile === 'cave' || caveObjects.includes(currentTile);

    // BASE IMAGE: what the tile looks like *underneath*
    let baseImage = terrainClasses['ground'];

    if (!shouldRender) {
      baseImage = null;
    } else if (cell === 'rock') {
      baseImage = terrainClasses['rockBackground']; // always background
    } else if (cell === 'cave' || caveObjects.includes(cell)) {
      baseImage = playerIsInsideCave
        ? terrainClasses['cave']
        : terrainClasses['rockBackground']; // only show cave floor inside
    }
    

    // FOREGROUND tile image (for trees, rocks, path, etc.)
    const foregroundImage = terrainClasses[cell];

    return (
      <div
        key={`${x}-${y}`}
        className="relative border border-black w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* BASE IMAGE */}
        {shouldRender && baseImage && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${baseImage})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* FOREGROUND OBJECTS (like path, tree, etc.) */}
        {shouldRender &&
          ['rock', 'path', 'tree', 'secret', 'rockslide', 'log'].includes(cell) &&
          foregroundImage?.startsWith('/') && (
            <div
              className="absolute inset-0 z-40"
              style={{
                backgroundImage: `url(${foregroundImage})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
              }}
            />
        )}

{/* CAVE TILE (specifically when cell === 'cave') */}
{shouldRender &&
  cell === 'cave' && (
    <div
      className="absolute inset-0 z-10"
      style={{
        backgroundImage: `url(${playerIsInsideCave ? terrainClasses['cave'] : terrainClasses['rock']})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    />
)}


        {/* OBJECT ITEMS (key, pickaxe, chests) */}
        {shouldRender &&
  caveObjects.includes(cell) &&
  terrainClasses[cell]?.startsWith('/') &&
  (currentTile === 'cave' || grid[y][x] === 'cave') && (
    <div
      className="absolute inset-0 z-20"
      style={{
        backgroundImage: `url(${terrainClasses[cell]})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    />
)}


        {/* Rockslide and Log (non-image types) */}
        {shouldRender && !foregroundImage?.startsWith('/') && (
          <div className={`absolute inset-0 z-10 ${foregroundImage}`} />
        )}

        {/* Player Sprite */}
        {playerPos.x === x && playerPos.y === y && (
  <div
    className={`absolute inset-0 ${
      cell === 'secret' ? 'z-30' : 'z-50'
    } flex items-center justify-center`}
  >
    <Player frame={playerFrame} direction={playerDirection} />
  </div>
)}


        {/* NPC */}
        {npcPos.x === x &&
          npcPos.y === y &&
          exploredTiles.has(`${x},${y}`) && (
            <div className="absolute inset-0 z-40 flex items-center justify-center">
              <Npc
                npcPos={npcPos}
                unlocked={npcUnlocked}
                onUnlock={() => {
                  const newNpcPos = { x: 12, y: 17 };
                  if (isWithinBounds(newNpcPos.x, newNpcPos.y, grid)) {
                    setNpcUnlocked(true);
                    setNpcPos(newNpcPos);
                  } else {
                    console.error(' New NPC position is out of bounds!');
                  }
                }}
                triggerInteraction={npcInteractionTriggered}
              />
            </div>
          )}
      </div>
    );
  })
)}
</div>
);
}

