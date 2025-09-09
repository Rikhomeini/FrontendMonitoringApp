// File: src/components/common/Button/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
};

export default Button; // ✅ Benar