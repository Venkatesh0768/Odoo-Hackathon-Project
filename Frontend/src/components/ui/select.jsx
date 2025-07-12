import React from 'react';
import './select.css'; // Optional if you're writing CSS

export const Select = ({ children }) => {
  return <div className="custom-select">{children}</div>;
};

export const SelectTrigger = ({ children }) => {
  return <div className="select-trigger">{children}</div>;
};

export const SelectValue = ({ placeholder }) => {
  return <span className="select-placeholder">{placeholder}</span>;
};

export const SelectContent = ({ children }) => {
  return <div className="select-content">{children}</div>;
};

export const SelectItem = ({ value, children, onClick }) => {
  return (
    <div
      className="select-item"
      onClick={() => onClick?.(value)}
    >
      {children}
    </div>
  );
};
