import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexus-theme');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });

  const toggleTheme = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem('nexus-theme', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'dark bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
