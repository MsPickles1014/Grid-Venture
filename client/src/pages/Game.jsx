// src/Game.jsx
import React, { useState, useEffect } from 'react';
import TerrainGrid from '../components/TerrainGrid';
import predefinedGrid from '../data/predefinedGrid';
import DialogBox from '../components/DialogBox';
import hudImages from '../assets/index';
import images from '../assets'; // 👈 Update this path if needed


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
const [obstacleDialog, ] = useState('');
const [systemDialog, setSystemDialog] = useState('');
const [explorerPoints, setExplorerPoints] = useState(0);
const [storeOpen, setStoreOpen] = useState(false);
const [purchasedItems, setPurchasedItems] = useState([]);
const [dialogActive, setDialogActive] = useState(false);
const [dialogImage, setDialogImage] = useState('');
const [dialogMessages, setDialogMessages] = useState([]);
const [dialogIndex, setDialogIndex] = useState(0);
const [npcDialogStage, setNpcDialogStage] = useState(0);
const [activeDialogType, setActiveDialogType] = useState(null); 
const [gameWon, setGameWon] = useState(false);
const [gameOver, setGameOver] = useState(false);
const [showVictoryPopup, setShowVictoryPopup] = useState(false);


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
  if (isNextToNpc() && !npcUnlocked && !dialogActive) {
    const npcMessages = [
      "YOU SHALL NOT PASS!!",
      "I'm thuper therial, you don’t want to go down thith way….",
      "You REALLY want to go down this path?! …FINE! have it your way…",
    ];
  
    setDialogImage(hudImages.npcJester);
    setDialogMessages([npcMessages[npcDialogStage]]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('npc_joker');
  
    // 🚩 Move this increment HERE instead of inside the key handler
    if (npcDialogStage < 2) {
      setNpcDialogStage((prev) => prev + 1);
    } else {
      setNpcUnlocked(true);
      setNpcPos((prev) => ({ x: prev.x, y: prev.y + 1 }));
    }
    return;
  }

  // Pick up the key
  else if (playerPos.x === 9 && playerPos.y === 7 && !hasKey && !dialogActive) {
    setHasKey(true);
    updateTile(9, 7, 'cave');
    setDialogImage('/assets/objects/Key-HUD.png'); // 🔑 Key face HUD
    setDialogMessages([
      "You picked up a heavy iron key...",
      "It feels cold in your hand, and somehow important."
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('key');
    return;
  }
  

  // Unlock the chest
  // 🚫 Interact with chest BEFORE having the key
  else if (isNextTo(10, 13) && !hasKey && !dialogActive) {
    setDialogImage(hudImages.chestLocked);
    setDialogMessages([
      "The chest is locked tight.",
      "You jiggle the latch a bit...",
      "...but unless you've got a key, it's not opening anytime soon."
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('chest_locked');
    return;
  }
  
  else if (isNextTo(10, 13) && hasKey && !dialogActive) {
    setHasKey(false);
    setHasHatchet(true);
    updateTile(10, 13, 'unlockedChest');
  
    setDialogImage(hudImages.chestUnlocked); // ✅ Show open chest
    setDialogMessages([
      "You slide the key into the lock...",
      "With a loud *click*, it swings open!",
      "Inside you find... a rusted hatchet. Perfect for clearing obstacles!"
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('chest_unlocked');
    return;
  }
  

  // 🚫 Interact with the log BEFORE having the hatchet
  else if (isNextTo(4, 4) && !hasHatchet && !dialogActive) {
    setDialogImage(hudImages.log);
    setDialogMessages([
      "This log is blocking the way...",
      "It looks solid... maybe something sharp could cut through?"
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('log');
    return;
  }
  
  // ✅ Chop the log with hatchet
  else if (isNextTo(4, 4) && hasHatchet && !dialogActive) {
    updateTile(4, 4, 'path');
    setPlayerPos((prev) => ({ ...prev }));
  
    setDialogImage(hudImages.splinterLog);
    setDialogMessages([
      "You raise your hatchet and swing with everything you’ve got...",
      "*THWACK!* Splinters fly everywhere.",
      "The log is no match for you. The path is now clear."
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('log_cleared');
    return;
  }
  
  // Pick up the pickaxe
  else if (playerPos.x === 18 && playerPos.y === 7 && !hasPickaxe && !dialogActive) {
    setHasPickaxe(true);
    updateTile(18, 7, 'cave');
  
    setDialogImage(hudImages.pickaxe);
    setDialogMessages([
      "You pick up an old pickaxe...",
      "It’s seen better days, but it might be just what you need to clear a path."
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('pickaxe');
    return;
  }
  

// ✅ Interact with rockslide WITH pickaxe
else if (isNextTo(11, 9) && hasPickaxe && !dialogActive) {
  updateTile(11, 9, 'path');
  setPlayerPos((prev) => ({ ...prev }));

  setDialogImage(hudImages.rockslide);
  setDialogMessages([
    "You grip your pickaxe and take a deep breath...",
    "*CRACK!* You strike the weak spot with precision.",
    "The boulders tumble away—path cleared!"
  ]);
  setDialogIndex(0);
  setDialogActive(true);
  setActiveDialogType('rockslide_cleared');
  return;
}

// 🚫 Interact with rockslide BEFORE having pickaxe
else if (isNextTo(11, 9) && !hasPickaxe && !dialogActive) {
  setDialogImage(hudImages.rockslide);
  setDialogMessages([
    "The path ahead is completely blocked...",
    "Looks like a landslide took out the trail.",
    "You’ll need something strong to break through..."
  ]);
  setDialogIndex(0);
  setDialogActive(true);
  setActiveDialogType('rockslide_blocked');
  return;
}};


useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    // 🧠 Prevent input if game is over or won
    if (gameOver || gameWon) return;

    switch (key) {
      case 'w':
        if (!dialogActive) movePlayer(0, -1, npcPos);
        break;

      case 'a':
        if (!dialogActive) movePlayer(-1, 0, npcPos);
        break;

      case 's':
        if (!dialogActive) movePlayer(0, 1, npcPos);
        break;

      case 'd':
        if (!dialogActive) movePlayer(1, 0, npcPos);
        break;

      case 'e':
        if (dialogActive) {
          const nextIndex = dialogIndex + 1;

          // 🪓 Chest opens → switch to hatchet image
          if (activeDialogType === 'chest_unlocked' && nextIndex === 2) {
            setDialogImage(hudImages.hatchet);
          }

          // 🪨 Rockslide clears → switch to cleared image
          if (activeDialogType === 'rockslide_cleared' && nextIndex === 2) {
            setDialogImage(hudImages.clearedRockslide);
          }

          if (dialogIndex < dialogMessages.length - 1) {
            setDialogIndex(nextIndex);
          } else {
            setDialogActive(false);
            setDialogImage('');
            setDialogMessages([]);
            setDialogIndex(0);
            setActiveDialogType(null);
          }
        } else {
          handleInteraction();
        }
        break;

      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [
  npcPos,
  playerPos,
  dialogActive,
  dialogIndex,
  dialogMessages,
  activeDialogType,
  gameOver,     
  gameWon       
]);


// 🧟‍♂️ Dead End Dialog
useEffect(() => {
  const isOnDeadEndTile = playerPos.x === 10 && playerPos.y === 16;

  if (
    npcUnlocked &&
    isOnDeadEndTile &&
    !deadEndTriggered &&
    !dialogActive
  ) {
    setDeadEndTriggered(true);
    setDialogImage('/assets/characters/dead_end.png');
    setDialogMessages([
      ".....I bet you're feeling pretty silly right about now...",
      "You have reached...",
      "...a DEAD END!! hahaha!!"
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('dead_end');
  }
}, [playerPos, npcUnlocked, deadEndTriggered, dialogActive]);


// 🎉 Victory Dialog
useEffect(() => {
  const isVictoryTile = playerPos.x === 13 && playerPos.y === 19;

  if (isVictoryTile && !gameWon && !dialogActive) {
    setGameWon(true);
    setDialogImage(images.victory); // ✅ Use the imported image
    setDialogMessages([
      "🎉 Congratulations!",
      "You've completed Grid-Venture!",
      "Thanks for playing, explorer."
    ]);
    setDialogIndex(0);
    setDialogActive(true);
    setActiveDialogType('victory');
    setTimeout(() => {
      setShowVictoryPopup(true);
    }, 1000); // 👈 Give it a delay so dialog finishes first
    
  }
}, [playerPos, gameWon, dialogActive]);




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
setGameWon(false);
setDialogActive(false);
setDialogMessages([]);
setDialogIndex(0);
setActiveDialogType(null);
setShowVictoryPopup(false);

};

return (
  <div className="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">

    {/* HUD Overlay */}
    <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-start pointer-events-none bg-[#2c2b28] bg-opacity-95 shadow-md">

      {/* Left Controls */}
      <div className="space-x-2 pointer-events-auto">
        <button
          onClick={handleReset}
          className="bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-medium px-3 py-3 rounded shadow border border-yellow-900"
        >
          Reset Game
        </button>
        <button
          onClick={() => setStoreOpen(!storeOpen)}
          className="bg-yellow-800 hover:bg-yellow-700 text-yellow-200 text-xs font-medium px-4 py-2 rounded shadow border border-yellow-900"

        >
          Store
        </button>
      </div>

      {/* Title Center */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Grid-Venture</h1>
      </div>

      {/* Right Controls */}
      <div className="flex flex-col items-center pointer-events-auto space-y-2">
  <button
    onClick={() => setInventoryOpen(!inventoryOpen)}
    className="bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-medium px-4 py-3 rounded shadow border border-stone-500"
  >
    Inventory
  </button>
  <div className="bg-black border border-yellow-500 text-yellow-400 text-xs px-3 py-1 rounded shadow text-center">
    🧭 Explorer: {explorerPoints}
  </div>
</div>

    </div>

    {/* Grid Camera Area */}
    <div className="w-full h-full overflow-hidden absolute inset-0 z-0">
      <div
        className="absolute transition-transform duration-300 ease-in-out"
        style={{
          transform: `translate(calc(50vw - ${playerPos.x * 5}vw), calc(50vh - ${playerPos.y * 5}vw))`,
        }}
      >
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
      </div>
    </div>

    {/* Store Popup */}
    {storeOpen && (
      <div className="absolute top-20 left-4 bg-gray-800 border border-purple-400 text-white p-4 rounded shadow-lg z-50 w-52">
        <h2 className="text-sm font-bold mb-2">Explorer Store 🛍️</h2>
        <ul className="text-xs space-y-2">
          {[
            ["Fancy Hat", 10],
            ["Cool Boots", 15],
            ["Mystery Box", 25],
          ].map(([item, cost]) => (
            <li key={item} className="flex justify-between items-center">
              {item} ({cost} pts)
              <button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-1 py-0.5 rounded text-xs"
                onClick={() => purchaseItem(item, cost)}
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
        <div className="text-[10px] italic text-gray-400 mt-2">
          Points: {explorerPoints}
        </div>
      </div>
    )}

    {/* Inventory Popup */}
    {inventoryOpen && (
      <div className="absolute top-20 right-4 bg-gray-800 border border-white text-white p-4 rounded shadow-lg z-50 w-48">
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
                – Just an old pickaxe... not a Diamond one... this ain't Minecraft!
              </p>
            </li>
          )}
          {!hasKey && !hasHatchet && !hasPickaxe && <li>(Empty)</li>}
        </ul>
      </div>
    )}

        {/* Dialog Popups */}
        {obstacleDialog && (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white border border-white px-4 py-2 rounded shadow z-50">
        {obstacleDialog}
      </div>
    )}

    {systemDialog && (
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white border border-blue-400 px-4 py-2 rounded shadow z-50">
        {systemDialog}
      </div>
    )}
    <DialogBox
  image={dialogImage}
  message={dialogMessages[dialogIndex]}
  isVisible={dialogActive}

/>
{showVictoryPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="bg-yellow-50 text-black p-8 rounded-xl shadow-xl max-w-lg text-center border-4 border-yellow-600">
      <h2 className="text-2xl font-bold mb-4">Thank You for Playing!</h2>
      <p className="mb-6 text-sm">
        Thank you for playing <strong>Noela's and Ian's Grid-Venture</strong>!<br />
        We're both incredibly proud of the work that’s gone into this, and we’re not done yet!<br /><br />
        In the meantime... would you care to play again?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
        >
          Yes, let's go again!
        </button>
        <button
          onClick={() => setShowVictoryPopup(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
        >
          Maybe later!
        </button>
      </div>
    </div>
  </div>
)}

</div> );} 