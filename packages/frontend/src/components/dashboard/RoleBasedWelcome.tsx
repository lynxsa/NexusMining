import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  ShieldCheckIcon, 
  CogIcon, 
  ChartBarIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

export const RoleBasedWelcome: React.FC = () => {
  const { user } = useAuth();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin':
        return CogIcon;
      case 'mining_operator':
        return BeakerIcon;
      case 'safety_officer':
        return ShieldCheckIcon;
      case 'maintenance_tech':
        return WrenchScrewdriverIcon;
      case 'supervisor':
        return UserGroupIcon;
      case 'analyst':
        return ChartBarIcon;
      default:
        return CogIcon;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'purple';
      case 'mining_operator':
        return 'blue';
      case 'safety_officer':
        return 'green';
      case 'maintenance_tech':
        return 'orange';
      case 'supervisor':
        return 'indigo';
      case 'analyst':
        return 'cyan';
      default:
        return 'gray';
    }
  };

  const getRolePriorities = () => {
    switch (user?.role) {
      case 'admin':
        return [
          'System Health Monitoring',
          'User Access Management', 
          'Platform Configuration',
          'Security & Compliance'
        ];
      case 'mining_operator':
        return [
          'Production Monitoring',
          'Equipment Operations',
          'Daily Production Targets',
          'Operational Efficiency'
        ];
      case 'safety_officer':
        return [
          'Safety Incident Management',
          'Hazard Assessment',
          'Compliance Monitoring',
          'Emergency Response'
        ];
      case 'maintenance_tech':
        return [
          'Equipment Maintenance',
          'Work Order Management',
          'Predictive Maintenance',
          'Asset Health Monitoring'
        ];
      case 'supervisor':
        return [
          'Team Management',
          'Workforce Coordination',
          'Daily Operations',
          'Performance Monitoring'
        ];
      case 'analyst':
        return [
          'Data Analysis',
          'Performance Metrics',
          'Trend Analysis',
          'Reporting & Insights'
        ];
      default:
        return ['General Operations'];
    }
  };

  const Icon = getRoleIcon();
  const color = getRoleColor();
  const priorities = getRolePriorities();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon className={`h-8 w-8 ${getIconClasses()}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Priorities
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClasses()}`}>
              {user?.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div className="space-y-2">
            {priorities.map((priority, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getDotClasses()}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{priority}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last login: {user?.lastLogin?.toLocaleDateString('en-ZA')} at {user?.lastLogin?.toLocaleTimeString('en-ZA', { timeStyle: 'short' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  function getColorClasses() {
    switch (color) {
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/20';
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/20';
      case 'green': return 'bg-green-100 dark:bg-green-900/20';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900/20';
      case 'indigo': return 'bg-indigo-100 dark:bg-indigo-900/20';
      case 'cyan': return 'bg-cyan-100 dark:bg-cyan-900/20';
      default: return 'bg-gray-100 dark:bg-gray-900/20';
    }
  }

  function getIconClasses() {
    switch (color) {
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      case 'indigo': return 'text-indigo-600 dark:text-indigo-400';
      case 'cyan': return 'text-cyan-600 dark:text-cyan-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  }

  function getBadgeClasses() {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'indigo': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300';
      case 'cyan': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  }

  function getDotClasses() {
    switch (color) {
      case 'purple': return 'bg-purple-400';
      case 'blue': return 'bg-blue-400';
      case 'green': return 'bg-green-400';
      case 'orange': return 'bg-orange-400';
      case 'indigo': return 'bg-indigo-400';
      case 'cyan': return 'bg-cyan-400';
      default: return 'bg-gray-400';
    }
  }
};
