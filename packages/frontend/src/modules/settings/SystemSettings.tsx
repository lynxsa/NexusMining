import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useCurrency } from '../../contexts/CurrencyContext';
import { 
  CogIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BellIcon,
  PaintBrushIcon,
  KeyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export const SystemSettings: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { currentCurrency, setCurrency, availableCurrencies } = useCurrency();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: KeyIcon, requiresPermission: 'admin_system' },
    { id: 'users', name: 'User Management', icon: UserGroupIcon, requiresPermission: 'admin_users' },
    { id: 'reports', name: 'Reports', icon: ChartBarIcon, requiresPermission: 'admin_reports' },
  ];

  const accessibleTabs = tabs.filter(tab => 
    !tab.requiresPermission || hasPermission(tab.requiresPermission as 'admin_system' | 'admin_users' | 'admin_reports')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
            <CogIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Configure your Nexus Mining platform preferences
            </p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {/* Tabs */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-1">
              {accessibleTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
                  
                  {/* User Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          {user?.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Currency Settings */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Default Currency
                    </label>
                    <select
                      value={currentCurrency.code}
                      onChange={(e) => {
                        const currency = availableCurrencies.find(c => c.code === e.target.value);
                        if (currency) setCurrency(currency);
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {availableCurrencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mining Site */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Mining Site
                    </label>
                    <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Witbank Coal Complex</option>
                      <option>Rustenburg Platinum Mine</option>
                      <option>Kimberley Diamond Operations</option>
                      <option>Welkom Gold Fields</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Switch between light and dark theme
                        </p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          darkMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            darkMode ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Safety Alerts', description: 'Critical safety incidents and hazard warnings' },
                      { name: 'Equipment Alerts', description: 'Predictive maintenance and equipment failures' },
                      { name: 'Production Updates', description: 'Daily production reports and targets' },
                      { name: 'Environmental Monitoring', description: 'Environmental compliance notifications' },
                      { name: 'System Updates', description: 'Platform updates and maintenance notices' },
                    ].map((notification) => (
                      <div key={notification.name} className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings (Admin only) */}
            {activeTab === 'security' && hasPermission('admin_system') && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex">
                        <ShieldCheckIcon className="h-5 w-5 text-yellow-400" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Security Configuration
                          </h4>
                          <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                            Advanced security settings are available for system administrators.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Management (Admin only) */}
            {activeTab === 'users' && hasPermission('admin_users') && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Management</h3>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex">
                      <UserGroupIcon className="h-5 w-5 text-blue-400" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          User Management System
                        </h4>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                          Manage user accounts, roles, and permissions across the platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
