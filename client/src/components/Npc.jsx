import React, { useState, useEffect } from 'react';

// ✅ Default props for safety
Npc.defaultProps = {
  npcPos: { x: 0, y: 0 },
  unlocked: false,
  onUnlock: () => console.log('Default onUnlock triggered'),
  triggerInteraction: false,
};

export default function Npc({ npcPos, unlocked, onUnlock, triggerInteraction }) {
  const [npcInteractions, setNpcInteractions] = useState(0);
  const [npcDialog, setNpcDialog] = useState('');

  // 🧠 NPC dialog sequence
  const npcMessages = [
    "YOU SHALL NOT PASS!!",
    "I'm thuper therial, you don’t want to go down thith way….",
    "You REALLY want to go down this path?! …FINE! have it your way…",
  ];

  // 💬 Handle interaction trigger
  useEffect(() => {
    if (!triggerInteraction || unlocked) return;

    const handleNpcInteraction = () => {
      setNpcDialog(npcMessages[npcInteractions]);

      if (npcInteractions < 2) {
        setNpcInteractions((prev) => prev + 1);
      } else {
        setNpcDialog(npcMessages[2]);
        setTimeout(() => {
          onUnlock();
          setTimeout(() => {
            setNpcDialog('');
          }, 2000);
        }, 2700);
      }
    };

    handleNpcInteraction();
  }, [triggerInteraction, unlocked]);

  const alertClick = (e) => {
    e.preventDefault();
    alert(`npc pos: ${JSON.stringify(npcPos)}`);
  };

  return (
    <>
      {/* 🧍 NPC Image */}
      <img
        src="/assets/characters/npc_joker.png"
        alt="NPC Joker"
        onClick={alertClick}
        className="w-full h-full object-contain pointer-events-auto"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* 💬 NPC Dialog */}
      {npcDialog && (
        <div className="bg-gray-800 text-white p-4 rounded-lg absolute top-[-120px] left-10 w-80 z-50 transition-all duration-300 shadow-lg">
          {npcDialog}
        </div>
      )}
    </>
  );
}



// import React, { useState, useEffect } from 'react';

// // Add default props to prevent crashes if props are missing
// Npc.defaultProps = {
//   npcPos: { x: 0, y: 0 }, // Safe default position
//   unlocked: false,
//   onUnlock: () => console.log('Default onUnlock triggered'),
//   triggerInteraction: false,
// };

// export default function Npc({ npcPos, unlocked, onUnlock, triggerInteraction }) {
//   const [npcInteractions, setNpcInteractions] = useState(0);
//   const [npcDialog, setNpcDialog] = useState('');

//   // Moved outside to avoid re-creation on every render
//   const npcMessages = [
//     "YOU SHALL NOT PASS!!",
//     "I'm thuper therial, you don’t want to go down thith way….",
//     "You REALLY want to go down this path?! …FINE! have it your way…",
//   ];

//   // Handle NPC interaction when triggered by 'E' key
//   useEffect(() => {
//     // Prevent firing if no interaction triggered
//     if (!triggerInteraction || unlocked) return;

//     const handleNpcInteraction = () => {
//       console.log(npcInteractions)
//       setNpcDialog(npcMessages[npcInteractions]);

//       if (npcInteractions < 2) {
//         setNpcInteractions((prev) => prev + 1);
//       } else {
//         // Show final dialog first
//         setNpcDialog(npcMessages[2]);
      
//         // Then unlock and clear after delay
//         setTimeout(() => {
//           onUnlock();
      
//           // Let the dialog linger for 2 more seconds
//           setTimeout(() => {
//             setNpcDialog('');
//           }, 2000);
//         }, 2700);
//       }
//     };

//     handleNpcInteraction();
//   }, [triggerInteraction, unlocked]); // Clean dependency array


// const alertClick = (e) =>{
//   e.preventDefault()
//   alert(`npc pos: ${JSON.stringify(npcPos)}`)
// }

//   return (
//     <>
//       {/* NPC Icon */}
//       <svg
//   className="w-full h-full block"
//   viewBox="0 0 24 24"
//   fill="red"
//   onClick={alertClick}
// >
//   <rect x="2" y="2" width="20" height="20" />
// </svg>


//       {/* NPC Dialog */}
//       {npcDialog && (
//   <div className="bg-gray-800 text-white p-4 rounded-lg absolute top-[-120px] left-10 w-80 z-50 transition-all duration-300 shadow-lg">
//     {npcDialog}
//   </div>
// )}
//     </>
//   );
// }