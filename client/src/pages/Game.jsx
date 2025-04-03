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
predefinedGrid[7][9] = 'key'; // Correctly places the key



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
const [storeOpen, setStoreOpen] = useState(false);
const [purchasedItems, setPurchasedItems] = useState([]);





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
    const { x: newX, y: newY } = getBoundedPosition(playerPos.x + dx, playerPos.y + dy);
  
    // ✅ Always animate and face direction — even if not walkable
    setPlayerDirection(getDirection(dx, dy));
    animatePlayer();
  
    // ✅ Only update position and visibility if move is valid
    if (isWalkable(newX, newY, npc)) {
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
            newPoints += 1;
          }
        }
      }
  
      setExploredTiles(newExplored);
      setExplorerPoints((prev) => prev + newPoints);
      setPlayerPos({ x: newX, y: newY });
    }
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
  // 🚫 Interact with chest BEFORE having the key
else if (isNextTo(10, 13) && !hasKey) {
  setObstacleDialog("A locked chest!!!... of course... Why is there *always* a locked chest in a cave?");
  setTimeout(() => setObstacleDialog(''), 4000);
}

  else if (isNextTo(10, 13) && hasKey) {
    setHasKey(false);
    setHasHatchet(true);
    updateTile(10, 13, 'unlockedChest');
    setSystemDialog("You unlocked the chest and found a hatchet!");
setTimeout(() => setSystemDialog(''), 3000);

  }

  // 🚫 Interact with the log BEFORE having the hatchet
  else if (isNextTo(4, 4) && !hasHatchet) {
    setObstacleDialog("This log is blocking the way and looks solid... maybe something sharp could cut through?");
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
    setObstacleDialog("It appears that a rockslide recently occurred and now a giant boulder blocks the path, You'll need something sturdy to clear the way.");
    setTimeout(() => setObstacleDialog(''), 4000);
  }

  // ✅ Clear the rockslide with pickaxe
  else if (isNextTo(11, 9) && hasPickaxe) {
    updateTile(11, 9, 'path');
    setPlayerPos((prev) => ({ ...prev }));
    setSystemDialog("You cleared the giant boulder with your pickaxe!");
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
    npcUnlocked &&                     
    !deadEndTriggered && 
    playerPos.x === 10 &&
    playerPos.y === 16
  ) {
    setDeadEndTriggered(true);
    setSystemDialog(".....I bet you're feeling pretty silly right about now, you have reached... a DEAD END!! hahaha!!");
    setTimeout(() => setSystemDialog(''), 5000);
  }
}, [playerPos, npcUnlocked, deadEndTriggered]);

const purchaseItem = (itemName, cost) => {
  if (explorerPoints >= cost) {
    setExplorerPoints((prev) => prev - cost);
    setPurchasedItems((prev) => [...prev, itemName]);
    setSystemDialog(`You purchased: ${itemName}`);
    setTimeout(() => setSystemDialog(''), 3000);
  } else {
    setSystemDialog("Not enough points!");
    setTimeout(() => setSystemDialog(''), 3000);
  }
};

const handleReset = () => {
  setGrid(predefinedGrid.map((row) => [...row])); 
  setPlayerPos({ x: 3, y: 16 }); // start position
  setNpcPos({ x: 12, y: 16 });   // NPC reset
  setNpcUnlocked(false);
  setNpcInteractionTriggered(false);
  setHasKey(false);
  setHasHatchet(false);
  setHasPickaxe(false);
  setDeadEndTriggered(false);
  setExploredTiles(new Set()); // CLEAR explored tiles
  setStoreOpen(false);
setPurchasedItems([]);

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
    {/* Store Button */}
<button
  onClick={() => setStoreOpen(!storeOpen)}
  className="absolute top-4 left-28 bg-purple-700 hover:bg-purple-900 text-white text-xs font-medium px-2 py-0.5 rounded shadow z-50"
>
  Store
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

{storeOpen && (
  <div className="absolute top-16 left-4 bg-gray-800 border border-purple-400 text-white p-4 rounded shadow-lg z-40 w-52">
    <h2 className="text-sm font-bold mb-2">Explorer Store 🛍️</h2>
    <ul className="text-xs space-y-2">
      <li className="flex justify-between items-center">
        Fancy Hat (10 pts)
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-1 py-0.5 rounded text-xs"
          onClick={() => purchaseItem("Fancy Hat", 10)}
        >
          Buy
        </button>
      </li>
      <li className="flex justify-between items-center">
        Cool Boots (15 pts)
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-1 py-0.5 rounded text-xs"
          onClick={() => purchaseItem("Cool Boots", 15)}
        >
          Buy
        </button>
      </li>
      <li className="flex justify-between items-center">
        Mystery Box (25 pts)
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-1 py-0.5 rounded text-xs"
          onClick={() => purchaseItem("Mystery Box", 25)}
        >
          Buy
        </button>
      </li>
    </ul>
    <div className="text-[10px] italic text-gray-400 mt-2">
      Points: {explorerPoints}
    </div>
  </div>
)}


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
