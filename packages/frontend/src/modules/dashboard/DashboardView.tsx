import React from 'react';
import { KPICards } from '../../components/data-viz/KPICards';
import { MiningMap } from '../../components/data-viz/MiningMap';
import { RoleBasedWelcome } from '../../components/dashboard/RoleBasedWelcome';
import { useAuth } from '../../hooks/useAuth';
// import { AlertsPanel } from '../../components/dashboard/AlertsPanel';
// import { ProductionChart } from '../../components/dashboard/ProductionChart';
// import { WeatherWidget } from '../../components/dashboard/WeatherWidget';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();

  // Fallback if user is not loaded yet
  const currentUser = user || {
    id: '1',
    name: 'Guest User',
    email: 'guest@nexusmining.co.za',
    role: 'admin' as const,
    department: 'Loading...',
    permissions: [],
    isActive: true,
    lastLogin: new Date()
  };

  const getRoleSpecificGreeting = () => {
    switch (currentUser?.role) {
      case 'admin':
        return 'System Administrator Dashboard';
      case 'mining_operator':
        return 'Mining Operations Control Center';
      case 'safety_officer':
        return 'Safety Management Dashboard';
      case 'maintenance_tech':
        return 'Maintenance Operations Center';
      case 'supervisor':
        return 'Supervisor Overview Dashboard';
      case 'analyst':
        return 'Analytics & Insights Dashboard';
      default:
        return 'Operations Dashboard';
    }
  };

  const getRoleSpecificDescription = () => {
    switch (currentUser?.role) {
      case 'admin':
        return 'Monitor system health, user activity, and overall platform performance.';
      case 'mining_operator':
        return 'Real-time mining operations, equipment status, and production metrics.';
      case 'safety_officer':
        return 'Safety incidents, compliance status, and hazard monitoring.';
      case 'maintenance_tech':
        return 'Equipment maintenance, work orders, and asset health monitoring.';
      case 'supervisor':
        return 'Team performance, daily operations, and workforce management.';
      case 'analyst':
        return 'Data insights, performance analytics, and operational trends.';
      default:
        return "Here's what's happening at your mine site today.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {getRoleSpecificDescription()}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {getRoleSpecificGreeting()}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser?.department}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Role-Based Welcome */}
      <RoleBasedWelcome />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mining Map - Takes 2 columns */}
        <div className="lg:col-span-2">
          <MiningMap />
        </div>

        {/* Coming Soon - Advanced Widgets */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Advanced Features
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time Weather Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Live Production Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>AI-Powered Alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mining Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Status */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Live Mining Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm font-medium">Production Target</span>
              <span className="text-green-600 dark:text-green-400 font-bold">105% Achieved</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium">Equipment Uptime</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">94.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-sm font-medium">Safety Score</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">98.1%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">All 16 modules operational</p>
                <p className="text-xs text-gray-500">System status: Normal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Real-time data streaming</p>
                <p className="text-xs text-gray-500">IoT sensors: Connected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">AI analytics running</p>
                <p className="text-xs text-gray-500">Predictive models: Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Hazard Report</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Report safety incident</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Generate Report</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Daily operations summary</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Schedule Audit</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plan inspection visit</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Equipment maintenance completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Haul truck HT-001 • 2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Production target achieved
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Pit Section A • 4 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Safety inspection scheduled
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Underground Level 3 • 6 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
