import React from 'react';

const ColorPicker = ({ label, value, onChange, className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <label className="text-sm font-medium text-gray-700 min-w-20">{label}:</label>
    <div className="relative">
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="w-8 h-8 rounded cursor-pointer border border-gray-300"
      />
    </div>
  </div>
);

export default ColorPicker;