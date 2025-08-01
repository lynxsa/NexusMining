import React, { useState } from 'react';
import { 
  EyeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  VideoCameraIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface HazardAlert {
  id: string;
  timestamp: string;
  type: 'ppe_violation' | 'unsafe_behavior' | 'proximity_alert' | 'unauthorized_access' | 'fall_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  camera: string;
  description: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'false_positive';
  confidence: number;
  assignedTo?: string;
}

export const HazardVisionView: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const alerts: HazardAlert[] = [
    {
      id: 'HV-001',
      timestamp: '2025-01-07 14:35:22',
      type: 'ppe_violation',
      severity: 'high',
      location: 'Pit A - Entry Point',
      camera: 'CAM-A-001',
      description: 'Worker detected without hard hat',
      status: 'active',
      confidence: 94.5,
      assignedTo: 'Safety Officer Johnson'
    },
    {
      id: 'HV-002',
      timestamp: '2025-01-07 14:28:15',
      type: 'proximity_alert',
      severity: 'critical',
      location: 'Pit B - Blast Zone',
      camera: 'CAM-B-003',
      description: 'Personnel detected in restricted blast area',
      status: 'acknowledged',
      confidence: 98.2,
      assignedTo: 'Site Supervisor Chen'
    },
    {
      id: 'HV-003',
      timestamp: '2025-01-07 14:22:41',
      type: 'unsafe_behavior',
      severity: 'medium',
      location: 'Loading Zone 2',
      camera: 'CAM-L-005',
      description: 'Worker in vehicle blind spot',
      status: 'resolved',
      confidence: 87.3,
      assignedTo: 'Safety Officer Martinez'
    },
    {
      id: 'HV-004',
      timestamp: '2025-01-07 14:15:33',
      type: 'fall_risk',
      severity: 'high',
      location: 'Platform Level 3',
      camera: 'CAM-P-012',
      description: 'Worker near unguarded edge',
      status: 'active',
      confidence: 91.7,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'false_positive': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return ExclamationTriangleIcon;
      case 'acknowledged': return ClockIcon;
      case 'resolved': return CheckCircleIcon;
      case 'false_positive': return XCircleIcon;
      default: return ClockIcon;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ppe_violation': return 'PPE Violation';
      case 'unsafe_behavior': return 'Unsafe Behavior';
      case 'proximity_alert': return 'Proximity Alert';
      case 'unauthorized_access': return 'Unauthorized Access';
      case 'fall_risk': return 'Fall Risk';
      default: return type;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    return matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            HazardVision
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            AI-powered computer vision safety monitoring system
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <VideoCameraIcon className="h-4 w-4 mr-2" />
            View Cameras
          </button>
          <button className="btn-primary">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            Create Alert
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cameras Online</p>
              <p className="text-2xl font-bold text-green-600">47/50</p>
            </div>
            <VideoCameraIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Detection Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">94.2%</p>
            </div>
            <EyeIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3m</p>
            </div>
            <ClockIcon className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Severity
              </label>
              <select
                id="severity-filter"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="input-field"
              >
                <option value="all">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
                <option value="false_positive">False Positive</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </div>
      </div>

      {/* Real-time Alert Feed */}
      <div className="card p-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Real-time Safety Alerts
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAlerts.map((alert) => {
            const StatusIcon = getStatusIcon(alert.status);
            return (
              <div key={alert.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {getTypeLabel(alert.type)}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {alert.timestamp}
                        </span>
                        <span className="flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {alert.location}
                        </span>
                        <span className="flex items-center">
                          <VideoCameraIcon className="h-3 w-3 mr-1" />
                          {alert.camera}
                        </span>
                        <span>
                          Confidence: {alert.confidence}%
                        </span>
                        {alert.assignedTo && (
                          <span>
                            Assigned to: {alert.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary btn-sm">
                      View Video
                    </button>
                    {alert.status === 'active' && (
                      <button className="btn-primary btn-sm">
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
