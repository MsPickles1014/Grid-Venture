import React from 'react';

export default function DialogBox({ image, message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 left-4 flex items-start bg-black bg-opacity-80 p-3 rounded-xl shadow-xl w-[300px] z-50 border border-yellow-500">
      <img
        src={image}
        alt="Speaker"
        className="w-16 h-16 object-cover rounded mr-3 border border-white"
      />
      <div className="text-white text-sm leading-tight">{message}</div>
    </div>
  );
}
