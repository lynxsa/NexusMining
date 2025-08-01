import React from 'react';
import { 
  Bars3Icon, 
  BellIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
              onClick={onMenuClick}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Executive Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Real-time mining operations overview
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    John Supervisor
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mine Operations
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
