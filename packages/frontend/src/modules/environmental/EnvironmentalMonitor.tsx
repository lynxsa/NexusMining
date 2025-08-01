import React, { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/currency';
import {
  GlobeAltIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  SignalIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface EnvironmentalReading {
  id: string;
  sensorId: string;
  location: string;
  type: 'air_quality' | 'water_quality' | 'noise' | 'dust' | 'vibration' | 'temperature' | 'humidity';
  parameter: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  coordinates: { lat: number; lng: number };
}

interface EnvironmentalIncident {
  id: string;
  title: string;
  type: 'spill' | 'emission' | 'contamination' | 'noise_violation' | 'dust_exceedance' | 'wildlife';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'open' | 'investigating' | 'remediation' | 'closed';
  estimatedCost: number;
  actions: string[];
}

interface ComplianceMetric {
  id: string;
  name: string;
  currentValue: number;
  limit: number;
  unit: string;
  compliance: number;
  period: string;
  trend: 'improving' | 'declining' | 'stable';
  lastUpdated: string;
}

export const EnvironmentalMonitor: React.FC = () => {
  const { currentCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'incidents' | 'compliance' | 'reports'>('overview');

  const environmentalReadings: EnvironmentalReading[] = [
    {
      id: 'ER001',
      sensorId: 'AQ-001',
      location: 'Rustenburg Processing Plant',
      type: 'air_quality',
      parameter: 'PM2.5',
      value: 35,
      unit: 'μg/m³',
      threshold: 40,
      status: 'normal',
      timestamp: '2025-08-01 09:30',
      trend: 'stable',
      coordinates: { lat: -25.7478, lng: 27.2294 }
    },
    {
      id: 'ER002',
      sensorId: 'WQ-012',
      location: 'Witbank Tailings Dam',
      type: 'water_quality',
      parameter: 'pH',
      value: 8.2,
      unit: 'pH',
      threshold: 8.5,
      status: 'warning',
      timestamp: '2025-08-01 09:25',
      trend: 'up',
      coordinates: { lat: -25.8738, lng: 29.2321 }
    },
    {
      id: 'ER003',
      sensorId: 'NM-005',
      location: 'Kimberley Diamond Mine',
      type: 'noise',
      parameter: 'Sound Level',
      value: 82,
      unit: 'dB',
      threshold: 85,
      status: 'normal',
      timestamp: '2025-08-01 09:20',
      trend: 'down',
      coordinates: { lat: -28.7282, lng: 24.7499 }
    },
    {
      id: 'ER004',
      sensorId: 'DM-008',
      location: 'Coal Mining Area - Welkom',
      type: 'dust',
      parameter: 'TSP',
      value: 95,
      unit: 'μg/m³',
      threshold: 90,
      status: 'critical',
      timestamp: '2025-08-01 09:15',
      trend: 'up',
      coordinates: { lat: -27.9770, lng: 26.7137 }
    },
    {
      id: 'ER005',
      sensorId: 'VM-003',
      location: 'Underground Level 3 - Shaft A',
      type: 'vibration',
      parameter: 'Peak Particle Velocity',
      value: 12.5,
      unit: 'mm/s',
      threshold: 15.0,
      status: 'normal',
      timestamp: '2025-08-01 09:10',
      trend: 'stable',
      coordinates: { lat: -26.2041, lng: 28.0473 }
    },
    {
      id: 'ER006',
      sensorId: 'TH-015',
      location: 'Equipment Storage Area',
      type: 'temperature',
      parameter: 'Ambient Temperature',
      value: 28.5,
      unit: '°C',
      threshold: 35.0,
      status: 'normal',
      timestamp: '2025-08-01 09:05',
      trend: 'up',
      coordinates: { lat: -25.7461, lng: 28.1881 }
    }
  ];

  const environmentalIncidents: EnvironmentalIncident[] = [
    {
      id: 'EI001',
      title: 'Diesel Fuel Spill - Equipment Refueling Area',
      type: 'spill',
      severity: 'medium',
      location: 'Rustenburg Mining Complex - Refueling Station',
      description: 'Approximately 200L diesel fuel spill during equipment refueling. Containment measures activated.',
      reportedBy: 'Sipho Dlamini',
      reportedAt: '2025-08-01 07:45',
      status: 'remediation',
      estimatedCost: 85000,
      actions: ['Spill containment', 'Soil sampling', 'Cleanup crew deployed', 'Regulatory notification']
    },
    {
      id: 'EI002',
      title: 'Dust Level Exceedance - Coal Processing',
      type: 'dust_exceedance',
      severity: 'high',
      location: 'Witbank Coal Processing Plant',
      description: 'Dust levels exceeded regulatory limits during coal crushing operations. Operations temporarily suspended.',
      reportedBy: 'Maria Santos',
      reportedAt: '2025-08-01 06:30',
      status: 'investigating',
      estimatedCost: 125000,
      actions: ['Operations suspended', 'Dust suppression systems activated', 'Equipment inspection', 'Air quality monitoring increased']
    },
    {
      id: 'EI003',
      title: 'Noise Complaint - Nearby Community',
      type: 'noise_violation',
      severity: 'low',
      location: 'Kimberley Diamond Mine - Perimeter',
      description: 'Community noise complaint regarding night shift operations. Noise levels within legal limits but resident concerns raised.',
      reportedBy: 'Community Liaison Officer',
      reportedAt: '2025-07-31 22:15',
      status: 'closed',
      estimatedCost: 15000,
      actions: ['Noise level verification', 'Community meeting scheduled', 'Sound barriers evaluated', 'Operating procedures reviewed']
    }
  ];

  const complianceMetrics: ComplianceMetric[] = [
    {
      id: 'CM001',
      name: 'Air Quality Index',
      currentValue: 45,
      limit: 50,
      unit: 'AQI',
      compliance: 90,
      period: 'Monthly',
      trend: 'improving',
      lastUpdated: '2025-08-01 09:00'
    },
    {
      id: 'CM002',
      name: 'Water Discharge Quality',
      currentValue: 7.8,
      limit: 8.5,
      unit: 'pH',
      compliance: 92,
      period: 'Weekly',
      trend: 'stable',
      lastUpdated: '2025-08-01 08:30'
    },
    {
      id: 'CM003',
      name: 'Noise Levels',
      currentValue: 78,
      limit: 85,
      unit: 'dB',
      compliance: 88,
      period: 'Daily',
      trend: 'improving',
      lastUpdated: '2025-08-01 09:15'
    },
    {
      id: 'CM004',
      name: 'Particulate Matter',
      currentValue: 42,
      limit: 50,
      unit: 'μg/m³',
      compliance: 84,
      period: 'Daily',
      trend: 'declining',
      lastUpdated: '2025-08-01 09:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'closed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': case 'investigating': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'offline': case 'remediation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const normalReadings = environmentalReadings.filter(r => r.status === 'normal').length;
  const warningReadings = environmentalReadings.filter(r => r.status === 'warning').length;
  const criticalReadings = environmentalReadings.filter(r => r.status === 'critical').length;
  const openIncidents = environmentalIncidents.filter(i => i.status === 'open' || i.status === 'investigating').length;
  const avgCompliance = Math.round(complianceMetrics.reduce((sum, metric) => sum + metric.compliance, 0) / complianceMetrics.length);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Normal Readings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{normalReadings}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">
            {Math.round((normalReadings / environmentalReadings.length) * 100)}% of sensors
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Warnings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{warningReadings}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">
            Require monitoring
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Issues</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{criticalReadings}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">
            Immediate action needed
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Incidents</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{openIncidents}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Under investigation
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Compliance</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgCompliance}%</p>
            </div>
            <GlobeAltIcon className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">
            Environmental standards
          </p>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalReadings > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Critical Environmental Alerts</h3>
          <div className="space-y-4">
            {environmentalReadings.filter(r => r.status === 'critical').map((reading) => (
              <div key={reading.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-800 dark:text-red-400">{reading.parameter} - {reading.location}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reading.status)}`}>
                    CRITICAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-red-600 dark:text-red-400">Current Value</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{reading.value} {reading.unit}</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400">Threshold</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{reading.threshold} {reading.unit}</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400">Last Updated</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{reading.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environmental Compliance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceMetrics.map((metric) => (
            <div key={metric.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h4>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'improving' && <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />}
                  {metric.trend === 'declining' && <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />}
                  {metric.trend === 'stable' && <div className="w-4 h-1 bg-gray-400 rounded"></div>}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Current</span>
                  <span className="font-medium text-gray-900 dark:text-white">{metric.currentValue} {metric.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Limit</span>
                  <span className="font-medium text-gray-900 dark:text-white">{metric.limit} {metric.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Compliance</span>
                  <span className={`font-medium ${metric.compliance >= 90 ? 'text-green-600' : metric.compliance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {metric.compliance}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.compliance >= 90 ? 'bg-green-500' : 
                      metric.compliance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.compliance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Environmental Incidents</h3>
        <div className="space-y-4">
          {environmentalIncidents.slice(0, 3).map((incident) => (
            <div key={incident.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{incident.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{incident.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{incident.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Reported By</p>
                  <p className="font-medium text-gray-900 dark:text-white">{incident.reportedBy}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Est. Cost</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(incident.estimatedCost, currentCurrency.code)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Actions</p>
                  <p className="font-medium text-gray-900 dark:text-white">{incident.actions.length} taken</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Environmental Monitor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time environmental monitoring and compliance tracking for mining operations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${criticalReadings > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-medium ${criticalReadings > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {criticalReadings > 0 ? `${criticalReadings} Critical Alerts` : 'All Systems Normal'}
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Sensor
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: GlobeAltIcon },
            { key: 'monitoring', name: 'Live Monitoring', icon: SignalIcon },
            { key: 'incidents', name: 'Incidents', icon: ExclamationTriangleIcon },
            { key: 'compliance', name: 'Compliance', icon: ChartBarIcon },
            { key: 'reports', name: 'Reports', icon: DocumentTextIcon }
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
      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {environmentalReadings.map((reading) => (
            <div key={reading.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    reading.status === 'normal' ? 'bg-green-500' :
                    reading.status === 'warning' ? 'bg-yellow-500' :
                    reading.status === 'critical' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{reading.parameter}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{reading.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reading.status)}`}>
                  {reading.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reading.value} {reading.unit}
                  </span>
                  <div className="flex items-center space-x-1">
                    {reading.trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4 text-red-600" />}
                    {reading.trend === 'down' && <ArrowTrendingDownIcon className="w-4 h-4 text-green-600" />}
                    {reading.trend === 'stable' && <div className="w-4 h-1 bg-gray-400 rounded"></div>}
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{reading.trend}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Threshold: {reading.threshold} {reading.unit}</span>
                    <span>{Math.round((reading.value / reading.threshold) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        reading.value <= reading.threshold * 0.8 ? 'bg-green-500' :
                        reading.value <= reading.threshold ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((reading.value / reading.threshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Sensor ID</p>
                    <p className="font-medium text-gray-900 dark:text-white">{reading.sensorId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium text-gray-900 dark:text-white">{reading.timestamp}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    View History
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          {environmentalIncidents.map((incident) => (
            <div key={incident.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{incident.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{incident.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">{incident.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{incident.type.replace('_', ' ')}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reported By</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{incident.reportedBy}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reported At</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{incident.reportedAt}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Est. Cost</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(incident.estimatedCost, currentCurrency.code)}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Actions Taken:</p>
                <div className="flex flex-wrap gap-2">
                  {incident.actions.map((action, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                  View Details
                </button>
                {incident.status !== 'closed' && (
                  <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                    Update Status
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceMetrics.map((metric) => (
              <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                  <div className="flex items-center space-x-1">
                    {metric.trend === 'improving' && <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />}
                    {metric.trend === 'declining' && <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />}
                    {metric.trend === 'stable' && <div className="w-5 h-2 bg-gray-400 rounded"></div>}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.currentValue} {metric.unit}
                      </span>
                      <span className={`text-lg font-semibold ${
                        metric.compliance >= 90 ? 'text-green-600' : 
                        metric.compliance >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {metric.compliance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          metric.compliance >= 90 ? 'bg-green-500' : 
                          metric.compliance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.compliance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Limit</p>
                      <p className="font-medium text-gray-900 dark:text-white">{metric.limit} {metric.unit}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Period</p>
                      <p className="font-medium text-gray-900 dark:text-white">{metric.period}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated: {metric.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environmental Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <GlobeAltIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Environmental Impact Report</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive environmental impact assessment and monitoring data analysis.
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ChartBarIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compliance Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Regulatory compliance status and environmental performance metrics.
              </p>
              <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                View Summary
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Incident Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Environmental incidents, root cause analysis, and remediation tracking.
              </p>
              <button className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                Incident Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
