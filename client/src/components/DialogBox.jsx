import React from 'react';

export default function DialogBox({ image, message, isVisible }) {
  if (!isVisible) return null;

  return (
<div className="absolute bottom-10 left-10 flex items-center bg-black border-2 border-yellow-500 px-6 py-4 rounded-xl shadow-lg z-50 w-[600px] h-[140px]">
  <img src={image} alt="Speaker" className="w-20 h-20 mr-6 border border-white rounded" />
  <p className="text-white text-lg leading-snug">{message}</p>
</div>

  );
}
