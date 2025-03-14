import React from 'react';

const ColorPicker = ({ label, value, onChange, className = '' }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="color"
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${className}`}
      />
    </div>
  );
};

export default ColorPicker;