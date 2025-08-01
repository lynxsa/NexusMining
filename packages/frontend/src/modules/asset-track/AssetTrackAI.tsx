import React, { useState } from 'react';
import { 
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CpuChipIcon,
  BoltIcon,
  FireIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

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
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

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

  const filteredAssets = assets.filter(asset => {
    const statusMatch = filterStatus === 'all' || asset.status === filterStatus;
    const searchMatch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <WrenchScrewdriverIcon className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'offline': return <ClockIcon className="w-5 h-5 text-gray-500" />;
      default: return <CubeIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalAssets = assets.length;
  const operationalAssets = assets.filter(a => a.status === 'operational').length;
  const criticalAssets = assets.filter(a => a.status === 'critical').length;
  const avgUptime = (assets.reduce((sum, asset) => sum + asset.uptime, 0) / totalAssets).toFixed(1);
  const totalCostSavings = assets.reduce((sum, asset) => sum + asset.costSavings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AssetTrack AI</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-powered equipment monitoring and predictive maintenance</p>
        </div>
        <div className="flex items-center space-x-2">
          <CpuChipIcon className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">AI Engine Active</span>
        </div>
      </div>

      {/* AI Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalAssets}</p>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {operationalAssets} operational, {criticalAssets} critical
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Uptime</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgUptime}%</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+2.3% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cost Savings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${(totalCostSavings / 1000).toFixed(0)}K</p>
            </div>
            <BoltIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            From predictive maintenance
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Predicted Failures</p>
              <p className="text-3xl font-bold text-red-600">2</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Next 7 days
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search assets by name or ID..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'operational', 'maintenance', 'critical', 'offline'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedAsset(asset)}
          >
            <div className="p-6">
              {/* Asset Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(asset.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{asset.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{asset.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </span>
              </div>

              {/* AI Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Health Score</span>
                  <span className={`text-sm font-bold ${getAIScoreColor(asset.aiScore)}`}>
                    {asset.aiScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      asset.aiScore >= 80 ? 'bg-green-500' : 
                      asset.aiScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${asset.aiScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Telemetry Data */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <FireIcon className="w-4 h-4 mx-auto text-orange-500 mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Temp</p>
                  <p className={`text-sm font-semibold ${
                    (asset.temperature || 0) > 80 ? 'text-red-600' : 
                    (asset.temperature || 0) > 60 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {asset.temperature || 0}°C
                  </p>
                </div>
                <div className="text-center">
                  <BoltIcon className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vibration</p>
                  <p className={`text-sm font-semibold ${
                    (asset.vibration || 0) > 10 ? 'text-red-600' : 
                    (asset.vibration || 0) > 7 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {asset.vibration || 0} Hz
                  </p>
                </div>
                <div className="text-center">
                  <CpuChipIcon className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pressure</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {asset.pressure || 0} PSI
                  </p>
                </div>
              </div>

              {/* Uptime and Location */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{asset.uptime}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{asset.location}</span>
                </div>
                {asset.predictedFailure && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Predicted Issue:</span>
                    <span className="font-semibold text-red-600">{asset.predictedFailure}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                <EyeIcon className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAsset.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAsset.type}</p>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Detailed AI Analysis */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">AI Analysis Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Health Score</p>
                      <p className={`text-lg font-bold ${getAIScoreColor(selectedAsset.aiScore)}`}>
                        {selectedAsset.aiScore}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance Events</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedAsset.maintenanceHistory}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cost Savings (YTD)</p>
                      <p className="text-lg font-bold text-green-600">
                        ${selectedAsset.costSavings.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedAsset.uptime}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Maintenance Schedule */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Maintenance Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Maintenance:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.lastMaintenance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Next Scheduled:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.nextMaintenance}
                      </span>
                    </div>
                    {selectedAsset.predictedFailure && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Predicted Issue:</span>
                        <span className="text-sm font-medium text-red-600">
                          {selectedAsset.predictedFailure}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Schedule Maintenance
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
