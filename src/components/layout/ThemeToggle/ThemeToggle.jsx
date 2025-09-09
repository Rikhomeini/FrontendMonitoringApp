import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check local storage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme on component mount and changes
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Also update Bootstrap theme
    document.body.setAttribute('data-bs-theme', theme);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Form.Check
      type="switch"
      id="theme-toggle"
      label={
        <span>
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </span>
      }
      checked={isDark}
      onChange={toggleTheme}
      className="theme-toggle"
    />
  );
};

export default ThemeToggle;