import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'mining_operator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'safety_officer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'maintenance_tech':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'supervisor':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300';
      case 'analyst':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1 min-w-0 hidden sm:block">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user.name}
        </p>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
          {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
      <button
        onClick={logout}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors duration-200"
        title="Sign Out"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
};
