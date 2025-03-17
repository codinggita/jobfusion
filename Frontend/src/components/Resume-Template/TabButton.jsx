import React from 'react';

const TabButton = ({ active, label, icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} ${className}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default TabButton;