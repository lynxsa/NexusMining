import React, { useState } from 'react';
import {
  CubeIcon,
  CameraIcon,
  EyeIcon,
  ChartBarIcon,
  MapIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface ScanSession {
  id: string;
  name: string;
  location: string;
  type: 'lidar' | 'photogrammetry' | 'drone' | 'ground';
  status: 'active' | 'completed' | 'processing' | 'scheduled';
  startTime: string;
  duration: number;
  progress: number;
  volume: number;
  accuracy: number;
  operator: string;
}

interface VolumeCalculation {
  id: string;
  name: string;
  location: string;
  scanDate: string;
  volume: number;
  previousVolume?: number;
  change: number;
  accuracy: number;
  type: 'stockpile' | 'pit' | 'waste_dump';
}

export const IntelliScan3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scanning' | 'volumes' | 'analysis'>('overview');

  const scanSessions: ScanSession[] = [
    {
      id: 'SCAN001',
      name: 'Witbank Pit A - Level 3 Survey',
      location: 'Witbank Complex - Pit A',
      type: 'lidar',
      status: 'active',
      startTime: '2025-08-01 06:30',
      duration: 120,
      progress: 67,
      volume: 485000,
      accuracy: 98.5,
      operator: 'Sipho Ndlovu'
    },
    {
      id: 'SCAN002',
      name: 'Gold Stockpile Volume Check',
      location: 'Rustenburg Processing Plant',
      type: 'drone',
      status: 'completed',
      startTime: '2025-07-31 14:15',
      duration: 45,
      progress: 100,
      volume: 125000,
      accuracy: 97.2,
      operator: 'Maria Santos'
    },
    {
      id: 'SCAN003',
      name: 'Coal Waste Dump Assessment',
      location: 'Welkom Site - Dump Area C',
      type: 'photogrammetry',
      status: 'processing',
      startTime: '2025-07-31 10:00',
      duration: 90,
      progress: 85,
      volume: 720000,
      accuracy: 96.8,
      operator: 'Johan van Wyk'
    },
    {
      id: 'SCAN004',
      name: 'Diamond Mine Survey',
      location: 'Kimberley Open Pit',
      type: 'ground',
      status: 'scheduled',
      startTime: '2025-08-02 07:00',
      duration: 180,
      progress: 0,
      volume: 0,
      accuracy: 0,
      operator: 'Thandi Mthembu'
    }
  ];

  const volumeCalculations: VolumeCalculation[] = [
    {
      id: 'VOL001',
      name: 'Coal Stockpile A',
      location: 'Witbank Complex',
      scanDate: '2025-07-31',
      volume: 95000,
      previousVolume: 87500,
      change: 7500,
      accuracy: 98.5,
      type: 'stockpile'
    },
    {
      id: 'VOL002',
      name: 'Gold Ore Pit B',
      location: 'Rustenburg Mine',
      scanDate: '2025-07-30',
      volume: 1250000,
      previousVolume: 1285000,
      change: -35000,
      accuracy: 97.8,
      type: 'pit'
    },
    {
      id: 'VOL003',
      name: 'Waste Dump Area C',
      location: 'Welkom Operations',
      scanDate: '2025-07-29',
      volume: 820000,
      previousVolume: 795000,
      change: 25000,
      accuracy: 96.2,
      type: 'waste_dump'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'scheduled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lidar': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'drone': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'photogrammetry': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ground': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const activeScannings = scanSessions.filter(s => s.status === 'active').length;
  const completedScannings = scanSessions.filter(s => s.status === 'completed').length;
  const avgAccuracy = (scanSessions.filter(s => s.accuracy > 0).reduce((sum, scan) => sum + scan.accuracy, 0) / scanSessions.filter(s => s.accuracy > 0).length).toFixed(1);
  const totalVolume = volumeCalculations.reduce((sum, vol) => sum + vol.volume, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Scans</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeScannings}</p>
            </div>
            <EyeIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Real-time scanning
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Today</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedScannings}</p>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">+2 from yesterday</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Accuracy</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgAccuracy}%</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+0.3% this week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Volume</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{(totalVolume / 1000000).toFixed(1)}M</p>
            </div>
            <MapIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            m³ tracked
          </p>
        </div>
      </div>

      {/* Active Scans */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Scan Sessions</h3>
        <div className="space-y-4">
          {scanSessions.filter(s => s.status === 'active' || s.status === 'processing').map((scan) => (
            <div key={scan.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{scan.name}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(scan.type)}`}>
                    {scan.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scan.status)}`}>
                    {scan.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{scan.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Operator</p>
                  <p className="font-medium text-gray-900 dark:text-white">{scan.operator}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{scan.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="font-medium text-gray-900 dark:text-white">{scan.progress}%</p>
                </div>
              </div>
              {scan.progress > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${scan.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Volume Calculations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Volume Calculations</h3>
        <div className="space-y-4">
          {volumeCalculations.slice(0, 3).map((volume) => (
            <div key={volume.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{volume.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  volume.type === 'stockpile' ? 'bg-green-100 text-green-800' :
                  volume.type === 'pit' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {volume.type.replace('_', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Current Volume</p>
                  <p className="font-medium text-gray-900 dark:text-white">{volume.volume.toLocaleString()} m³</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Change</p>
                  <p className={`font-medium ${volume.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {volume.change > 0 ? '+' : ''}{volume.change.toLocaleString()} m³
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Accuracy</p>
                  <p className="font-medium text-gray-900 dark:text-white">{volume.accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Scan Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{volume.scanDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IntelliScan 3D</h1>
          <p className="text-gray-600 dark:text-gray-400">
            3D scanning & volume analysis with LiDAR, photogrammetry, and drone technology
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">{activeScannings} Active Scans</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            New Scan
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: ChartBarIcon },
            { key: 'scanning', name: 'Active Scans', icon: EyeIcon },
            { key: 'volumes', name: 'Volume Analysis', icon: CubeIcon },
            { key: 'analysis', name: 'Analysis Tools', icon: Cog6ToothIcon }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'scanning' && (
        <div className="space-y-4">
          {scanSessions.map((scan) => (
            <div key={scan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{scan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{scan.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(scan.type)}`}>
                    {scan.type.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(scan.status)}`}>
                    {scan.status}
                  </span>
                  {scan.status === 'active' && (
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg">
                      <PauseIcon className="w-4 h-4" />
                    </button>
                  )}
                  {scan.status === 'scheduled' && (
                    <button className="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 rounded-lg">
                      <PlayIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Start Time</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{scan.startTime}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{scan.duration} min</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{scan.progress}%</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Volume</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{scan.volume.toLocaleString()} m³</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                  <p className="text-sm font-bold text-green-600">{scan.accuracy}%</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Operator</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{scan.operator}</p>
                </div>
              </div>

              {scan.progress > 0 && scan.status !== 'completed' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Scanning Progress</span>
                    <span>{scan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        scan.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${scan.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {activeTab === 'volumes' && (
        <div className="space-y-4">
          {volumeCalculations.map((volume) => (
            <div key={volume.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{volume.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{volume.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    volume.type === 'stockpile' ? 'bg-green-100 text-green-800' :
                    volume.type === 'pit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {volume.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <button className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Volume</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{volume.volume.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">m³</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Previous Volume</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{volume.previousVolume?.toLocaleString() || 'N/A'}</p>
                  <p className="text-sm text-gray-500">m³</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Net Change</p>
                  <p className={`text-2xl font-bold ${volume.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {volume.change > 0 ? '+' : ''}{volume.change.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">m³</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                  <p className="text-2xl font-bold text-green-600">{volume.accuracy}</p>
                  <p className="text-sm text-gray-500">%</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Scan Date</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{volume.scanDate}</p>
                  <p className="text-sm text-gray-500">Latest</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'analysis' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analysis Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <CameraIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Point Cloud Viewer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Interactive 3D point cloud visualization and analysis tools.
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Launch Viewer
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ChartBarIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Volume Trends</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Historical volume analysis and trend forecasting.
              </p>
              <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                View Trends
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <MapIcon className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Site Comparison</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Compare multiple scan sessions and detect changes.
              </p>
              <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm">
                Compare Scans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
