// src/Game.jsx
import React, { useState, useEffect } from 'react';
import TerrainGrid from '../components/TerrainGrid';

const predefinedGrid = [
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock'],
  ['tree', 'tree', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'tree', 'path', 'path', 'path', 'path', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'secret', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'tree', 'tree', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'tree', 'tree', 'log', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'path', 'path', 'path', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'path', 'rock', 'rock', 'path', 'tree', 'tree', 'tree', 'rock', 'rock', 'path', 'tree', 'tree', 'rock', 'cave', 'cave', 'cave', 'cave', 'rock'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'rock', 'key', 'rock', 'path', 'tree', 'tree', 'rock', 'rock', 'rock', 'rock', 'cave', 'rock'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'rock', 'rock', 'rock'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'path', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'rock', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'tree'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'cave', 'cave', 'cave', 'rock', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'path', 'rock', 'cave', 'cave', 'rock', 'rock', 'cave', 'rock', 'rock', 'rock', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'path', 'rock', 'rock', 'cave', 'cave', 'cave', 'cave', 'cave', 'cave', 'rock', 'tree', 'path', 'path', 'path', 'path', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'path', 'path', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'tree', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'tree', 'path', 'secret', 'secret', 'secret', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'tree', 'path', 'tree', 'tree', 'secret', 'tree', 'tree', 'path', 'path', 'path', 'path', 'path', 'tree', 'tree', 'path', 'tree', 'path', 'tree'],
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'secret', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'path', 'path', 'path', 'tree'],
  ['tree', 'tree', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'secret', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'path', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
];
// Manually place locked chest
predefinedGrid[13][10] = 'lockedChest';
predefinedGrid[9][11] = 'rockslide';   // y: 9, x: 11
predefinedGrid[7][18] = 'pickaxe';     // y: 7, x: 18
// s


// Main Game Component
export default function Game() {
  const [grid, setGrid] = useState(predefinedGrid);
  const [playerPos, setPlayerPos] = useState({ x: 3, y: 16 });
  const [npcPos, setNpcPos] = useState({ x: 12, y: 16 });
  const [npcUnlocked, setNpcUnlocked] = useState(false);
  const [playerFrame, setPlayerFrame] = useState(0);
  const [playerDirection, setPlayerDirection] = useState('down');
  const [npcInteractionTriggered, setNpcInteractionTriggered] = useState(false);
  const [hasKey, setHasKey] = useState(false);
const [hasHatchet, setHasHatchet] = useState(false);
const [deadEndTriggered, setDeadEndTriggered] = useState(false);
const [hasPickaxe, setHasPickaxe] = useState(false);
const [exploredTiles, setExploredTiles] = useState(new Set());
const [inventoryOpen, setInventoryOpen] = useState(false);
const [obstacleDialog, setObstacleDialog] = useState('');
const [systemDialog, setSystemDialog] = useState('');
const [explorerPoints, setExplorerPoints] = useState(0);




  // Prevent out-of-bounds movement
  const getBoundedPosition = (x, y) => ({
    x: Math.max(0, Math.min(grid[0].length - 1, x)),
    y: Math.max(0, Math.min(grid.length - 1, y)),
  });

  // Check if tile is walkable
  const isWalkable = (x, y, npc) => {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
      // console.log("iswalkable 1st")
      return false
      
    };

    if (x === npc.x && y === npc.y) {
      // console.log("iswalkable 3rd")
      return false
    };
    return grid[y][x] === 'path' || 
          grid[y][x] === 'cave' || 
          grid[y][x] === 'key' ||
          grid[y][x] === 'pickaxe' ||
          grid[y][x] === 'secret'
  };

  // Check if player is next to NPC
  const isNextToNpc = () => {
    const dx = Math.abs(playerPos.x - npcPos.x);
    const dy = Math.abs(playerPos.y - npcPos.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  const isNextTo = (x, y) => {
    const dx = Math.abs(playerPos.x - x);
    const dy = Math.abs(playerPos.y - y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  // Move player with bounds check
  const movePlayer = (dx, dy, npc) => {
    setPlayerPos((prev) => {
      const { x: newX, y: newY } = getBoundedPosition(prev.x + dx, prev.y + dy);
      if (isWalkable(newX, newY, npc)) {
        setPlayerDirection(getDirection(dx, dy));
        animatePlayer();
  
        // 👁️ Visibility radius logic
        const currentTile = grid[newY][newX];
        const radius = currentTile === 'cave' ? 1 : 2;

        const newExplored = new Set(exploredTiles);
let newPoints = 0;

for (let dx = -radius; dx <= radius; dx++) {
  for (let dy = -radius; dy <= radius; dy++) {
    const ex = newX + dx;
    const ey = newY + dy;
    const key = `${ex},${ey}`;
    if (
      ex >= 0 &&
      ex < grid[0].length &&
      ey >= 0 &&
      ey < grid.length &&
      !newExplored.has(key)
    ) {
      newExplored.add(key);
      newPoints += 1; // Award 1 point per new tile
    }
  }
}

setExploredTiles(newExplored);
setExplorerPoints((prev) => prev + newPoints);





        // const newExplored = new Set(exploredTiles);
        // for (let dx = -radius; dx <= radius; dx++) {
        //   for (let dy = -radius; dy <= radius; dy++) {
        //     const ex = newX + dx;
        //     const ey = newY + dy;
        //     if (ex >= 0 && ex < grid[0].length && ey >= 0 && ey < grid.length) {
        //       newExplored.add(`${ex},${ey}`);
        //     }
        //   }
        // }
        // setExploredTiles(newExplored);
  
        return { x: newX, y: newY };
      }
      return prev;
    });
  };
  
  // Determine direction for animation
  const getDirection = (dx, dy) => {
    if (dx === -1) return 'left';
    if (dx === 1) return 'right';
    if (dy === -1) return 'up';
    if (dy === 1) return 'down';
    return 'down';
  };

  // Animate player movement
  const animatePlayer = () => {
    setPlayerFrame((prev) => (prev + 1) % 4);
  };

  // Update a tile's type (e.g. clearing log, picking up key, etc.)
const updateTile = (x, y, newType) => {
  setGrid((prev) => {
    const newGrid = prev.map((row) => [...row]);
    newGrid[y][x] = newType;
    return newGrid;
  });
};

const handleInteraction = () => {
  // Interact with NPC
  if (isNextToNpc() && !npcInteractionTriggered) {
    setNpcInteractionTriggered(true);
    setTimeout(() => setNpcInteractionTriggered(false), 200);
  }

  // Pick up the key
  else if (playerPos.x === 9 && playerPos.y === 7 && !hasKey) {
    setHasKey(true);
    updateTile(9, 7, 'cave');
    setSystemDialog("You picked up an iron key!");
    setTimeout(() => setSystemDialog(''), 3000);
    
  }

  // Unlock the chest
  else if (isNextTo(10, 13) && hasKey) {
    setHasKey(false);
    setHasHatchet(true);
    updateTile(10, 13, 'cave');
    setSystemDialog("You unlocked the chest and found a hatchet!");
setTimeout(() => setSystemDialog(''), 3000);

  }

  // 🚫 Interact with the log BEFORE having the hatchet
  else if (isNextTo(4, 4) && !hasHatchet) {
    setObstacleDialog("This tree looks solid... maybe something sharp could cut through?");
    setTimeout(() => setObstacleDialog(''), 3000);
  }

  // ✅ Chop the log with hatchet
  else if (isNextTo(4, 4) && hasHatchet) {
    updateTile(4, 4, 'path');
    setPlayerPos((prev) => ({ ...prev }));
    setSystemDialog("You chopped the log and cleared the way!");
setTimeout(() => setSystemDialog(''), 3000);

  }

  // Pick up the pickaxe
  else if (playerPos.x === 18 && playerPos.y === 7 && !hasPickaxe) {
    setHasPickaxe(true);
    updateTile(18, 7, 'cave');
    setSystemDialog("You picked up a pickaxe!");
    setTimeout(() => setSystemDialog(''), 3000);
  }

  // 🚫 Interact with the rockslide BEFORE having the pickaxe
  else if (isNextTo(11, 9) && !hasPickaxe) {
    setObstacleDialog("A heavy rockslide blocks the way. You'll need something sturdy to clear this.");
    setTimeout(() => setObstacleDialog(''), 3000);
  }

  // ✅ Clear the rockslide with pickaxe
  else if (isNextTo(11, 9) && hasPickaxe) {
    updateTile(11, 9, 'path');
    setPlayerPos((prev) => ({ ...prev }));
    setSystemDialog("You cleared the rockslide with your pickaxe!");
    setTimeout(() => setSystemDialog(''), 3000);
  }
};


  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
          movePlayer(0, -1, npcPos);
          break;
        case 'a':
          movePlayer(-1, 0, npcPos);
          break;
        case 's':
          movePlayer(0, 1, npcPos);
          break;
        case 'd':
          movePlayer(1, 0, npcPos);
          break;
        case 'e':
          handleInteraction();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [npcPos, playerPos]);

  // Tile trigger for the DEAD END message
useEffect(() => {
  if (
    npcUnlocked &&                     // Only after NPC has moved
    !deadEndTriggered &&               // Only fire once
    playerPos.x === 10 &&
    playerPos.y === 16
  ) {
    setDeadEndTriggered(true);
    setSystemDialog(".....I bet you're feeling pretty silly right about now, you have reached... a DEAD END!! hahaha!!");
    setTimeout(() => setSystemDialog(''), 5000);
  }
}, [playerPos, npcUnlocked, deadEndTriggered]);

const handleReset = () => {
  setGrid(predefinedGrid.map((row) => [...row])); // deep clone
  setPlayerPos({ x: 3, y: 16 }); // start position
  setNpcPos({ x: 12, y: 16 });   // NPC reset
  setNpcUnlocked(false);
  setNpcInteractionTriggered(false);
  setHasKey(false);
  setHasHatchet(false);
  setHasPickaxe(false);
  setDeadEndTriggered(false);
  setExploredTiles(new Set()); // CLEAR explored tiles
};

return (
  <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 space-y-6">
    <h1 className="text-3xl font-bold">Grid-Venture</h1>

    {/* Reset Button */}
    <button
      onClick={handleReset}
      className="absolute top-4 left-4 bg-green-600 hover:bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded shadow z-50"
    >
      Reset Game
    </button>

    {/* Inventory Button */}
    <button
      onClick={() => setInventoryOpen(!inventoryOpen)}
      className="absolute top-4 right-4 bg-blue-600 hover:bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded shadow z-50"
    >
      Inventory
    </button>

    {/* Explorer Points Display */}
<div className="absolute top-4 right-24 bg-black border border-yellow-500 text-yellow-400 text-xs px-2 py-0.5 rounded shadow z-50">
  🧭 Explorer: {explorerPoints}
</div>


    {/* Terrain Grid */}
    <TerrainGrid
      grid={grid}
      playerPos={playerPos}
      playerFrame={playerFrame}
      playerDirection={playerDirection}
      npcPos={npcPos}
      npcUnlocked={npcUnlocked}
      npcInteractionTriggered={npcInteractionTriggered}
      setNpcUnlocked={setNpcUnlocked}
      setNpcPos={setNpcPos}
      exploredTiles={exploredTiles}
    />

    {/* Inventory Popup */}
    {inventoryOpen && (
      <div className="absolute top-16 right-4 bg-gray-800 border border-white text-white p-4 rounded shadow-lg z-40 w-48">
        <h2 className="text-sm font-bold mb-2">Inventory</h2>
        <ul className="text-xs space-y-1">
          {hasKey && <li>🔑 Key</li>}

          {hasHatchet && (
            <li>
              🪓 Hatchet
              <p className="italic text-[10px] text-gray-300 mt-0.5">
                – Looks rusted, sharp, and no Tetanus vaccine anywhere in this world!
              </p>
            </li>
          )}

          {hasPickaxe && (
            <li>
              ⛏️ Pickaxe
              <p className="italic text-[10px] text-gray-300 mt-0.5">
                – Just an old pickaxe... don’t get excited. It's not a "Diamond Pickaxe".... What do you think this is, Minecraft?!
              </p>
            </li>
          )}

          {!hasKey && !hasHatchet && !hasPickaxe && <li>(Empty)</li>}
        </ul>
      </div>
    )}

    {/* Obstacle Dialog Popup */}
    {obstacleDialog && (
      <div className="absolute bottom-8 bg-gray-900 text-white border border-white px-4 py-2 rounded shadow z-50">
        {obstacleDialog}
      </div>
    )}

    {/* System Dialog Popup */}
    {systemDialog && (
      <div className="absolute bottom-20 bg-gray-900 text-white border border-blue-400 px-4 py-2 rounded shadow z-50">
        {systemDialog}
      </div>
    )}
  </div>  
);
}
