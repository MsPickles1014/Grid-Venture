import React, { useState, useEffect } from 'react';

// Add default props to prevent crashes if props are missing
Npc.defaultProps = {
  npcPos: { x: 0, y: 0 }, // Safe default position
  unlocked: false,
  onUnlock: () => console.log('Default onUnlock triggered'),
  triggerInteraction: false,
};

export default function Npc({ npcPos, unlocked, onUnlock, triggerInteraction }) {
  const [npcInteractions, setNpcInteractions] = useState(0);
  const [npcDialog, setNpcDialog] = useState('');

  // 🚩 Moved outside to avoid re-creation on every render
  const npcMessages = [
    "YOU SHALL NOT PASS!!",
    "I'm thuper therial, you don’t want to go down thith way….",
    "You REALLY want to go down this path?! …FINE! have it your way…",
  ];

  // Handle NPC interaction when triggered by 'E' key
  useEffect(() => {
    // 🚩 Prevent firing if no interaction triggered
    if (!triggerInteraction || unlocked) return;

    const handleNpcInteraction = () => {
      console.log(npcInteractions)
      setNpcDialog(npcMessages[npcInteractions]);
      if (npcInteractions < 2) {
        // Show next dialog in sequence
        setNpcInteractions((prev) => prev + 1);
      } else {
        // Unlock after 3 interactions
        // setNpcDialog(npcMessages[2]);
        setTimeout(() => onUnlock(), 500); // 🚩 Slight delay for better feedback
      }
    };

    handleNpcInteraction();
  }, [triggerInteraction, unlocked]); // ✅ Clean dependency array


const alertClick = (e) =>{
  e.preventDefault()
  alert(`npc pos: ${JSON.stringify(npcPos)}`)
}

  return (
    <>
      {/* NPC Icon */}
      <svg
        className="w-8 h-8 absolute transition-all duration-100 ease-out"
        viewBox="0 0 24 24"
        fill="red"
        onClick = {alertClick}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>

      {/* NPC Dialog */}
      {npcDialog && (
  <div className="bg-gray-800 text-white p-4 rounded-lg absolute top-[-120px] left-10 w-80 z-50 transition-all duration-300 shadow-lg">
    {npcDialog}
  </div>
)}
    </>
  );
}

















