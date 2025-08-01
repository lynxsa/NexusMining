import React from 'react';
import { 
  ExclamationTriangleIcon, 
  ShieldCheckIcon,
  BoltIcon,
  CubeIcon 
} from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  module: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Equipment Failure Predicted',
    message: 'Haul Truck HT-003 showing vibration anomaly. Maintenance required within 48 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    module: 'AssetTrack AI'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Safety Zone Violation',
    message: 'Worker detected in restricted blast zone. HazardVision alert triggered.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    module: 'HazardVision™'
  },
  {
    id: '3',
    type: 'info',
    title: 'Energy Optimization',
    message: 'Solar array producing 85% capacity. Grid switching recommended for cost savings.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    module: 'Energy & ESG Hub'
  }
];

export const AlertsPanel: React.FC = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ShieldCheckIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <BoltIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Real-Time Alerts
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Live
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border ${getAlertBgColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      <CubeIcon className="h-3 w-3 mr-1" />
                      {alert.module}
                    </span>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View All Alerts (12)
          </button>
        </div>
      </div>
    </div>
  );
};
