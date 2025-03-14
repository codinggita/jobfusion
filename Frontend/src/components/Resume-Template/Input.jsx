import React from 'react';

const Input = ({ value, onChange, placeholder, className = '', onBlur, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      className={`w-full p-2 border rounded ${className}`}
      {...props}
    />
  );
};

export default Input;