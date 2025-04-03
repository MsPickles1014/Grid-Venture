// src/components/Player.jsx
import React from 'react';

export default function Player({ frame, direction }) {
  // Select correct sprite based on direction and animation frame
  const getSprite = () => {
    switch (direction) {
      case 'up':
        return '/assets/characters/char_back.png';
      case 'down':
        return '/assets/characters/char_front.png';
      case 'left':
        return frame % 2 === 0
          ? '/assets/characters/char_standing_left.png'
          : '/assets/characters/char_walking_left.png';
      case 'right':
        return frame % 2 === 0
          ? '/assets/characters/char_standing_right.png'
          : '/assets/characters/char_walking_right.png';
      default:
        return '/assets/characters/char_front.png';
    }
  };

  return (
    <img
      src={getSprite()}
      alt="Player"
      className="w-full h-full object-contain pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}