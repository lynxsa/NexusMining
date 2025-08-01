import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Simple theme context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const SimpleThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Export context for use in hooks
export { ThemeContext };
