import React, { useState } from 'react';
import {
  ChartBarIcon,
  CubeIcon,
  TruckIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ProductionData {
  site: string;
  target: number;
  actual: number;
  efficiency: number;
  status: 'ahead' | 'on-track' | 'behind';
}

interface OperationalMetric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

export const SmartOpsInsights: React.FC = () => {
  const [timeRange, setTimeRange] = useState('today');
  
  const productionData: ProductionData[] = [
    { site: 'Gold Mine Alpha', target: 2500, actual: 2650, efficiency: 106, status: 'ahead' },
    { site: 'Platinum Site Beta', target: 1200, actual: 1180, efficiency: 98, status: 'on-track' },
    { site: 'Coal Extraction Gamma', target: 5000, actual: 4750, efficiency: 95, status: 'behind' },
    { site: 'Diamond Mine Delta', target: 800, actual: 820, efficiency: 103, status: 'ahead' },
  ];

  const operationalMetrics: OperationalMetric[] = [
    {
      name: 'Total Production',
      value: '9,400 tons',
      change: 12.5,
      trend: 'up',
      icon: <CubeIcon className="w-6 h-6" />
    },
    {
      name: 'Fleet Utilization',
      value: '87.3%',
      change: 5.2,
      trend: 'up',
      icon: <TruckIcon className="w-6 h-6" />
    },
    {
      name: 'Average Cycle Time',
      value: '14.2 min',
      change: -8.1,
      trend: 'down',
      icon: <ClockIcon className="w-6 h-6" />
    },
    {
      name: 'Operating Cost',
      value: '$142/ton',
      change: -3.4,
      trend: 'down',
      icon: <BanknotesIcon className="w-6 h-6" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'on-track': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'behind': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead': return <CheckCircleIcon className="w-5 h-5" />;
      case 'on-track': return <ClockIcon className="w-5 h-5" />;
      case 'behind': return <ExclamationTriangleIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SmartOps Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time operational analytics and performance monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {operationalMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                {metric.icon}
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className={`text-sm flex items-center mt-1 ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% vs yesterday
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Production Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Production Performance</h2>
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Live Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {productionData.map((site, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(site.status)}`}>
                    {getStatusIcon(site.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{site.site}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Target: {site.target.toLocaleString()} tons
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {site.actual.toLocaleString()} tons
                  </p>
                  <p className={`text-sm font-medium ${
                    site.efficiency >= 100 ? 'text-green-600' : 
                    site.efficiency >= 95 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {site.efficiency}% efficiency
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    site.efficiency >= 100 ? 'bg-green-500' : 
                    site.efficiency >= 95 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(site.efficiency, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Equipment Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Operational</span>
              </div>
              <span className="text-lg font-bold text-green-600">24</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Maintenance</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Critical</span>
              </div>
              <span className="text-lg font-bold text-red-600">2</span>
            </div>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Efficiency Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Energy Efficiency</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Labor Productivity</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">93%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Material Utilization</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">76%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Equipment Effectiveness</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded">
              <ChartBarIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Optimize Haul Truck Routes
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                AI suggests route optimization could improve cycle time by 12% and reduce fuel consumption
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <div className="p-1 bg-yellow-100 dark:bg-yellow-800 rounded">
              <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Schedule Preventive Maintenance
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Drill Rig #089 showing early signs of wear. Schedule maintenance within 48 hours
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <div className="p-1 bg-green-100 dark:bg-green-800 rounded">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Energy Efficiency Improved
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Recent equipment adjustments resulted in 8% energy savings at Processing Plant B
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
