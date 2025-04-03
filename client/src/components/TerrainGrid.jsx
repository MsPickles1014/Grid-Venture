// src/components/TerrainGrid.jsx
import React from 'react';
import Player from './Player';
import Npc from './Npc';

// Terrain tile classes mapped to images or CSS colors
const terrainClasses = {
  ground: '/assets/tiles/ground.png',
  tree: '/assets/tiles/Trees.png',
  rock: '/assets/tiles/left_rock_corner.png',
  path: '/assets/tiles/path.png',
  cave: 'bg-gray-300',
  log: 'bg-orange-900',
  key: 'bg-blue-300',
  lockedChest: 'bg-yellow-500',
  rockslide: 'bg-gray-800',
  pickaxe: 'bg-red-400',
  secret: '/assets/tiles/Trees.png', // 👈 Same image as tree
};

// Check if a position is inside the grid
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

          const rawTile = !shouldRender
            ? 'black'
            : cell === 'cave' && currentTile !== 'cave'
            ? 'rock'
            : cell;

          // 🧱 Choose base image
          let baseImage = terrainClasses['ground'];
          if (rawTile === 'rock' || rawTile === 'cave') {
            baseImage = '/assets/tiles/rock_background.png';
          }

          const foregroundImage = terrainClasses[rawTile];
          const isTreeLike = rawTile === 'tree' || rawTile === 'secret';

          return (
            <div
              key={`${x}-${y}`}
              className="relative border border-black w-full h-full"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Base Image */}
              {shouldRender && baseImage?.startsWith('/') && (
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${baseImage})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {/* Sandwich Player if on secret/tree tile */}
              {playerPos.x === x && playerPos.y === y && isTreeLike && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Player frame={playerFrame} direction={playerDirection} />
                </div>
              )}

              {/* Foreground image (trees, path, rock, etc.) */}
              {shouldRender && foregroundImage?.startsWith('/') && (
                <div
                  className={`absolute inset-0 ${isTreeLike ? 'z-20' : 'z-10'}`}
                  style={{
                    backgroundImage: `url(${foregroundImage})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {/* Solid Color Fallback */}
              {shouldRender && !foregroundImage?.startsWith('/') && (
                <div className={`absolute inset-0 z-10 ${foregroundImage}`} />
              )}

              {/* Default player if not tree/secret sandwich */}
              {playerPos.x === x && playerPos.y === y && !isTreeLike && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
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
                          console.error('🚨 New NPC position is out of bounds!');
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
















// // src/components/TerrainGrid.jsx
// import React from 'react';
// import Player from './Player';
// import Npc from './Npc';

// // Terrain tile classes mapped to images or CSS colors
// const terrainClasses = {
//   ground: '/assets/tiles/ground.png',
//   tree: '/assets/tiles/Trees.png',
//   rock: 'bg-gray-500',
//   path: '/assets/tiles/path.png',
//   cave: 'bg-gray-300',
//   log: 'bg-orange-900',
//   key: 'bg-blue-300',
//   lockedChest: 'bg-yellow-500',
//   rockslide: 'bg-gray-800',
//   pickaxe: 'bg-red-400',
//   secret: '/assets/tiles/Trees.png', // Visually treat "secret" like "tree"
// };

// // Check if a position is inside the grid
// const isWithinBounds = (x, y, grid) => {
//   return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
// };

// export default function TerrainGrid({
//   grid,
//   playerPos,
//   playerFrame,
//   playerDirection,
//   npcPos,
//   npcUnlocked,
//   npcInteractionTriggered,
//   setNpcUnlocked,
//   setNpcPos,
//   exploredTiles,
// }) {
//   const currentTile = grid[playerPos.y][playerPos.x];
//   const radius = currentTile === 'cave' ? 1 : 2;

//   return (
//     <div
//       className="grid gap-[1px] border border-white"
//       style={{
//         gridTemplateColumns: `repeat(20, minmax(0, 1fr))`,
//         gridAutoRows: '1fr',
//         width: '500px',
//         height: '500px',
//         display: 'grid',
//       }}
//     >
//       {grid.map((row, y) =>
//         row.map((cell, x) => {
//           const isVisible = exploredTiles.has(`${x},${y}`);
//           const isNearPlayer =
//             Math.abs(playerPos.x - x) <= radius &&
//             Math.abs(playerPos.y - y) <= radius;
//           const shouldRender = isVisible || isNearPlayer;

//           const displayTile = !shouldRender
//             ? 'black'
//             : cell === 'cave' && !exploredTiles.has(`${x},${y}`)
//             ? 'rock'
//             : cell;

//           const baseImage = terrainClasses['ground'];
//           const foregroundImage = terrainClasses[displayTile];
//           const isTreeLike = displayTile === 'tree' || displayTile === 'secret';

//           return (
//             <div
//               key={`${x}-${y}`}
//               className="relative border border-black w-full h-full"
//               style={{ imageRendering: 'pixelated' }}
//             >
//               {/* Base Ground Layer */}
//               {shouldRender && baseImage?.startsWith('/') && (
//                 <div
//                   className="absolute inset-0 z-0"
//                   style={{
//                     backgroundImage: `url(${baseImage})`,
//                     backgroundSize: '100% 100%',
//                     backgroundPosition: 'center',
//                   }}
//                 />
//               )}

//               {/* Player in middle (only render here if tree-like tile) */}
//               {isTreeLike && playerPos.x === x && playerPos.y === y && (
//                 <div className="absolute inset-0 z-10 flex items-center justify-center">
//                   <Player frame={playerFrame} direction={playerDirection} />
//                 </div>
//               )}

//               {/* Foreground Image Layer */}
//               {shouldRender && foregroundImage?.startsWith('/') && (
//                 <div
//                   className={`absolute inset-0 ${isTreeLike ? 'z-20' : 'z-10'}`}
//                   style={{
//                     backgroundImage: `url(${foregroundImage})`,
//                     backgroundSize: '100% 100%',
//                     backgroundPosition: 'center',
//                   }}
//                 />
//               )}

//               {/* Foreground Solid Color Layer */}
//               {shouldRender && !foregroundImage?.startsWith('/') && (
//                 <div className={`absolute inset-0 z-10 ${foregroundImage}`} />
//               )}

//               {/* Player (normal case when not behind trees) */}
//               {!isTreeLike && playerPos.x === x && playerPos.y === y && (
//                 <div className="absolute inset-0 z-50 flex items-center justify-center">
//                   <Player frame={playerFrame} direction={playerDirection} />
//                 </div>
//               )}

//               {/* NPC always goes on top */}
//               {npcPos.x === x &&
//                 npcPos.y === y &&
//                 exploredTiles.has(`${x},${y}`) && (
//                   <div className="absolute inset-0 z-40 flex items-center justify-center">
//                     <Npc
//                       npcPos={npcPos}
//                       unlocked={npcUnlocked}
//                       onUnlock={() => {
//                         const newNpcPos = { x: 12, y: 17 };
//                         if (isWithinBounds(newNpcPos.x, newNpcPos.y, grid)) {
//                           setNpcUnlocked(true);
//                           setNpcPos(newNpcPos);
//                         } else {
//                           console.error('🚨 New NPC position is out of bounds!');
//                         }
//                       }}
//                       triggerInteraction={npcInteractionTriggered}
//                     />
//                   </div>
//                 )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }