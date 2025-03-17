import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ title, children, collapsible = true, className = '' }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`mb-6 ${className}`}>
      <div
        className="flex items-center justify-between pb-2 border-b cursor-pointer"
        onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
      >
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {collapsible && (
          <button className="text-gray-500 hover:text-gray-700">
            {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        )}
      </div>
      <div className={`pt-3 transition-all ${collapsed ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </div>
  );
};

export default Section;