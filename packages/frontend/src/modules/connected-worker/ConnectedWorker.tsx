import React, { useState } from 'react';
import {
  UserGroupIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  SignalIcon,
  BellAlertIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Worker {
  id: string;
  name: string;
  role: string;
  location: string;
  zone: string;
  status: 'safe' | 'alert' | 'emergency' | 'offline';
  heartRate: number;
  batteryLevel: number;
  lastUpdate: string;
  wearableDevices: string[];
  vitals: {
    temperature: number;
    humidity: number;
    gasExposure: number;
    motionDetected: boolean;
  };
}

interface SafetyAlert {
  id: string;
  workerId: string;
  workerName: string;
  type: 'vitals' | 'location' | 'gas' | 'fall' | 'panic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export const ConnectedWorker: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workers' | 'alerts' | 'analytics'>('dashboard');

  const workers: Worker[] = [
    {
      id: 'W001',
      name: 'John Mitchell',
      role: 'Equipment Operator',
      location: 'Pit A - Level 3',
      zone: 'Zone A',
      status: 'safe',
      heartRate: 78,
      batteryLevel: 87,
      lastUpdate: '2 min ago',
      wearableDevices: ['Smart Helmet', 'Vest Monitor', 'Gas Detector'],
      vitals: { temperature: 22, humidity: 45, gasExposure: 2, motionDetected: true }
    },
    {
      id: 'W002',
      name: 'Sarah Chen',
      role: 'Safety Inspector',
      location: 'Processing Plant B',
      zone: 'Zone B',
      status: 'alert',
      heartRate: 95,
      batteryLevel: 62,
      lastUpdate: '1 min ago',
      wearableDevices: ['Smart Watch', 'Air Quality Monitor'],
      vitals: { temperature: 28, humidity: 65, gasExposure: 8, motionDetected: true }
    },
    {
      id: 'W003',
      name: 'Mike Rodriguez',
      role: 'Drill Operator',
      location: 'Pit C - Level 2',
      zone: 'Zone C',
      status: 'emergency',
      heartRate: 125,
      batteryLevel: 34,
      lastUpdate: 'Just now',
      wearableDevices: ['Smart Helmet', 'Emergency Beacon', 'Fall Detector'],
      vitals: { temperature: 35, humidity: 78, gasExposure: 15, motionDetected: false }
    },
    {
      id: 'W004',
      name: 'Lisa Thompson',
      role: 'Maintenance Tech',
      location: 'Workshop A',
      zone: 'Zone D',
      status: 'safe',
      heartRate: 72,
      batteryLevel: 91,
      lastUpdate: '3 min ago',
      wearableDevices: ['Smart Watch', 'Proximity Sensor'],
      vitals: { temperature: 20, humidity: 40, gasExposure: 1, motionDetected: true }
    },
    {
      id: 'W005',
      name: 'David Park',
      role: 'Heavy Equipment Operator',
      location: 'Pit A - Level 1',
      zone: 'Zone A',
      status: 'offline',
      heartRate: 0,
      batteryLevel: 0,
      lastUpdate: '15 min ago',
      wearableDevices: ['Smart Helmet', 'Vest Monitor'],
      vitals: { temperature: 0, humidity: 0, gasExposure: 0, motionDetected: false }
    }
  ];

  const alerts: SafetyAlert[] = [
    {
      id: 'A001',
      workerId: 'W003',
      workerName: 'Mike Rodriguez',
      type: 'vitals',
      severity: 'critical',
      message: 'Elevated heart rate detected (125 BPM) - possible distress',
      timestamp: 'Just now',
      resolved: false
    },
    {
      id: 'A002',
      workerId: 'W002',
      workerName: 'Sarah Chen',
      type: 'gas',
      severity: 'medium',
      message: 'Gas exposure above threshold (8 ppm)',
      timestamp: '2 min ago',
      resolved: false
    },
    {
      id: 'A003',
      workerId: 'W005',
      workerName: 'David Park',
      type: 'location',
      severity: 'high',
      message: 'Worker device offline - last known location: Pit A',
      timestamp: '15 min ago',
      resolved: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'alert': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'emergency': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'alert': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'emergency': return <BellAlertIcon className="w-5 h-5 text-red-500" />;
      case 'offline': return <SignalIcon className="w-5 h-5 text-gray-500" />;
      default: return <UserGroupIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const safeWorkers = workers.filter(w => w.status === 'safe').length;
  const alertWorkers = workers.filter(w => w.status === 'alert').length;
  const emergencyWorkers = workers.filter(w => w.status === 'emergency').length;
  const offlineWorkers = workers.filter(w => w.status === 'offline').length;
  const activeAlerts = alerts.filter(a => !a.resolved).length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Workers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{workers.length}</p>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Safe</p>
              <p className="text-3xl font-bold text-green-600">{safeWorkers}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerts</p>
              <p className="text-3xl font-bold text-yellow-600">{alertWorkers}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Emergency</p>
              <p className="text-3xl font-bold text-red-600">{emergencyWorkers}</p>
            </div>
            <BellAlertIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline</p>
              <p className="text-3xl font-bold text-gray-600">{offlineWorkers}</p>
            </div>
            <SignalIcon className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Safety Alerts</h3>
        <div className="space-y-3">
          {alerts.filter(a => !a.resolved).map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{alert.workerName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                  Respond
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkers = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {workers.map((worker) => (
        <div
          key={worker.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedWorker(worker)}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(worker.status)}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{worker.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{worker.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                {worker.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <span className="font-medium text-gray-900 dark:text-white">{worker.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Heart Rate:</span>
                <span className={`font-medium flex items-center space-x-1 ${
                  worker.heartRate > 100 ? 'text-red-600' : 
                  worker.heartRate > 85 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  <HeartIcon className="w-4 h-4" />
                  <span>{worker.heartRate} BPM</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Battery:</span>
                <span className={`font-medium ${
                  worker.batteryLevel > 50 ? 'text-green-600' : 
                  worker.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {worker.batteryLevel}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                <span className="font-medium text-gray-900 dark:text-white">{worker.lastUpdate}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Wearable Devices:</p>
              <div className="flex flex-wrap gap-1">
                {worker.wearableDevices.map((device, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                    {device}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ConnectedWorker</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time worker safety monitoring and wearable device integration</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">Live Monitoring Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
            { key: 'workers', name: 'Workers', icon: UserGroupIcon },
            { key: 'alerts', name: `Alerts (${activeAlerts})`, icon: BellAlertIcon },
            { key: 'analytics', name: 'Analytics', icon: ChartBarIcon }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'dashboard' | 'workers' | 'alerts' | 'analytics')}
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
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'workers' && renderWorkers()}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-6 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{alert.workerName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.resolved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{alert.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                    View Details
                  </button>
                  {!alert.resolved && (
                    <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Safety Analytics</h3>
          <p className="text-gray-600 dark:text-gray-400">Detailed analytics dashboard coming soon...</p>
        </div>
      )}

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedWorker.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedWorker.role}</p>
                </div>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(selectedWorker.status)}
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {selectedWorker.status}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white mt-1">
                      {selectedWorker.location}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vital Signs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedWorker.heartRate} BPM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Environmental Temp</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedWorker.vitals.temperature}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedWorker.vitals.humidity}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gas Exposure</p>
                      <p className={`text-lg font-bold ${
                        selectedWorker.vitals.gasExposure > 10 ? 'text-red-600' :
                        selectedWorker.vitals.gasExposure > 5 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {selectedWorker.vitals.gasExposure} ppm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Connected Devices</h3>
                  <div className="space-y-2">
                    {selectedWorker.wearableDevices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded">
                        <span className="text-gray-900 dark:text-white">{device}</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
