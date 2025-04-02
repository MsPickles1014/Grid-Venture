// src/components/Player.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
export default function Player({ frame, direction }) {
  return (
    <svg
  className="w-full h-full block"
  viewBox="0 0 24 24"
  fill="blue"
>
  <rect x="2" y="2" width="20" height="20" />
</svg>

  );
}



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
