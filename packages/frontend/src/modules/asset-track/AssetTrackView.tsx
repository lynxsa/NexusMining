import React, { useState, useEffect } from 'react';
import {
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { useCurrency } from '../../contexts/CurrencyContext';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  uptime: number;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  predictedFailure?: string;
  temperature?: number;
  vibration?: number;
  pressure?: number;
  aiScore: number;
  maintenanceHistory: number;
  costSavings: number;
}

export const AssetTrackView: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [realTimeData, setRealTimeData] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { currentCurrency } = useCurrency();

  // Simulate real-time data updates
  useEffect(() => {
    if (!realTimeData) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app, this would fetch live data from IoT sensors
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [realTimeData]);

  // Enhanced assets with AI predictive data
  const assets: Asset[] = [
    {
      id: 'HT-247',
      name: 'Haul Truck #247',
      type: 'Heavy Vehicle',
      status: 'maintenance',
      uptime: 87.5,
      location: 'Pit A - Level 3',
      lastMaintenance: '2025-07-28',
      nextMaintenance: '2025-08-15',
      predictedFailure: '2025-08-12',
      temperature: 95,
      vibration: 12.5,
      pressure: 35,
      aiScore: 76,
      maintenanceHistory: 8,
      costSavings: 45000
    },
    {
      id: 'EX-102',
      name: 'Excavator #102',
      type: 'Excavator',
      status: 'operational',
      uptime: 95.2,
      location: 'Pit B - Level 1',
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2025-08-10',
      temperature: 45,
      vibration: 3.2,
      pressure: 25,
      aiScore: 92,
      maintenanceHistory: 3,
      costSavings: 32000
    },
    {
      id: 'DR-089',
      name: 'Drill Rig #089',
      type: 'Drilling Equipment',
      status: 'critical',
      uptime: 65.8,
      location: 'Pit C - Level 2',
      lastMaintenance: '2025-07-10',
      nextMaintenance: '2025-08-05',
      predictedFailure: '2025-08-03',
      temperature: 72,
      vibration: 8.1,
      pressure: 45,
      aiScore: 45,
      maintenanceHistory: 12,
      costSavings: 28000
    },
    {
      id: 'CB-1200',
      name: 'Conveyor Belt #1200',
      type: 'Processing Equipment',
      status: 'operational',
      uptime: 98.1,
      location: 'Processing Plant A',
      lastMaintenance: '2025-07-20',
      nextMaintenance: '2025-09-01',
      temperature: 38,
      vibration: 2.1,
      pressure: 15,
      aiScore: 88,
      maintenanceHistory: 2,
      costSavings: 18000
    },
    {
      id: 'BC-450',
      name: 'Ball Mill Crusher #450',
      type: 'Processing Equipment',
      status: 'operational',
      uptime: 92.7,
      location: 'Processing Plant B',
      lastMaintenance: '2025-07-25',
      nextMaintenance: '2025-08-20',
      temperature: 85,
      vibration: 6.8,
      pressure: 55,
      aiScore: 78,
      maintenanceHistory: 5,
      costSavings: 52000
    },
    {
      id: 'PMP-678',
      name: 'Water Pump #678',
      type: 'Infrastructure',
      status: 'offline',
      uptime: 0,
      location: 'Dewatering Station 1',
      lastMaintenance: '2025-07-30',
      nextMaintenance: '2025-08-02',
      predictedFailure: 'Immediate',
      temperature: 0,
      vibration: 0,
      pressure: 0,
      aiScore: 15,
      maintenanceHistory: 15,
      costSavings: 8000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'offline': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircleIcon;
      case 'maintenance': return WrenchScrewdriverIcon;
      case 'critical': return ExclamationTriangleIcon;
      case 'offline': return ClockIcon;
      default: return ClockIcon;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AssetTrack AI
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Equipment health monitoring with predictive maintenance
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Live Data • Updated {lastUpdate.toLocaleTimeString('en-ZA')}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CpuChipIcon className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                AI Predictions Active
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setRealTimeData(!realTimeData)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              realTimeData 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <BoltIcon className="h-4 w-4 mr-1 inline" />
            Real-time {realTimeData ? 'ON' : 'OFF'}
          </button>
          <button className="btn-primary">
            <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </button>
          <button className="btn-secondary">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
            </div>
            <CubeIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Operational</p>
              <p className="text-2xl font-bold text-green-600">189</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">45</p>
            </div>
            <WrenchScrewdriverIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-600">13</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Predictive Insights
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              <CpuChipIcon className="h-3 w-3 mr-1" />
              AI-Powered
            </span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">
                    High Failure Risk Detected
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                    Haul Truck HT-247 shows 89% probability of hydraulic failure within 48 hours. 
                    Immediate maintenance recommended.
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-xs text-red-700 dark:text-red-300">
                    <span>Predicted Cost Saving: {currentCurrency.symbol}{(45000 * currentCurrency.rate).toLocaleString()}</span>
                    <span>Confidence: 89%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-3">
                <ArrowTrendingUpIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    Optimization Opportunity
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                    Conveyor Belt CB-1200 efficiency can be improved by 12% with belt tension adjustment.
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-xs text-yellow-700 dark:text-yellow-300">
                    <span>Potential Monthly Savings: {currentCurrency.symbol}{(18000 * currentCurrency.rate).toLocaleString()}</span>
                    <span>Implementation: 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cost Savings This Month
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {currentCurrency.symbol}{(156000 * currentCurrency.rate).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Prevented Costs
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Prevented Failures</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">8 incidents</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Downtime Avoided</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">47 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance Optimized</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">15 tasks</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  23% ROI Improvement
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  vs. Traditional Maintenance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Assets
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, type, or location..."
                className="input-field w-64"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Statuses</option>
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="critical">Critical</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="card p-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Equipment Status ({filteredAssets.length} assets)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  AI Prediction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAssets.map((asset) => {
                const StatusIcon = getStatusIcon(asset.status);
                return (
                  <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CubeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {asset.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {asset.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {asset.uptime}%
                        </div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className={`h-2 rounded-full ${
                              asset.uptime >= 90 ? 'bg-green-600' : 
                              asset.uptime >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${asset.uptime}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {asset.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {asset.nextMaintenance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {asset.predictedFailure ? (
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                          Risk: {asset.predictedFailure}
                        </span>
                      ) : (
                        <span className="text-sm text-green-600 dark:text-green-400">
                          No issues predicted
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                        View Details
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">
                        Maintain
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
