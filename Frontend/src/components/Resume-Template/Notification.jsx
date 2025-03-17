import React from 'react';
import { Check } from 'lucide-react';

const Notification = ({ show, message, className = '' }) => (
  <div
    className={`fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg transition-opacity flex items-center gap-2 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}
  >
    <Check size={16} />
    <span>{message}</span>
  </div>
);

export default Notification;