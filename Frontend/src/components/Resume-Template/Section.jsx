import React from 'react';

const Section = ({ title, children, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      {children}
    </div>
  );
};

export default Section;