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



// // src/components/Player.jsx
// import React from 'react';
// // eslint-disable-next-line no-unused-vars
// export default function Player({ frame, direction }) {
//   return (
//     <svg
//   className="w-full h-full block"
//   viewBox="0 0 24 24"
//   fill="blue"
// >
//   <rect x="2" y="2" width="20" height="20" />
// </svg>

//   );
// }



// // src/components/Player.jsx
// import React from 'react';

// export default function Player({ frame, direction }) {
//   const tileSize = 32;
//   const directionRow = {
//     down: 0,
//     left: 1,
//     right: 2,
//     up: 3,
//   }[direction];

//   return (
//     <div
//       className="w-8 h-8 absolute transition-all duration-100 ease-out"
//       style={{
//         backgroundImage: "url('/assets/player-sprite.png')",
//         backgroundPosition: `-${frame * tileSize}px -${directionRow * tileSize}px`,
//         backgroundSize: 'auto 100%',
//       }}
//     />
//   );
// }
