import React, { useState } from 'react';
import { 
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhotoIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface MobileReport {
  id: string;
  timestamp: string;
  reporter: string;
  type: 'safety_incident' | 'equipment_issue' | 'environmental_concern' | 'near_miss' | 'maintenance_request';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  status: 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';
  hasPhotos: boolean;
  hasAudio: boolean;
  assignedTo?: string;
  estimatedResolution?: string;
}

export const ThibaAlertView: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const reports: MobileReport[] = [
    {
      id: 'TA-001',
      timestamp: '2025-01-07 15:42:18',
      reporter: 'Mike Johnson',
      type: 'safety_incident',
      priority: 'high',
      title: 'Slip and Fall at Loading Bay',
      description: 'Worker slipped on wet surface near loading bay entrance. Minor injuries sustained.',
      location: 'Loading Bay A - Entrance',
      status: 'investigating',
      hasPhotos: true,
      hasAudio: false,
      assignedTo: 'Safety Team',
      estimatedResolution: '2025-01-08'
    },
    {
      id: 'TA-002',
      timestamp: '2025-01-07 14:28:33',
      reporter: 'Sarah Chen',
      type: 'equipment_issue',
      priority: 'critical',
      title: 'Conveyor Belt Malfunction',
      description: 'Belt stopped unexpectedly, loud grinding noise heard before shutdown.',
      location: 'Processing Plant - Line 2',
      status: 'under_review',
      hasPhotos: true,
      hasAudio: true,
      assignedTo: 'Maintenance Team',
      estimatedResolution: '2025-01-07'
    },
    {
      id: 'TA-003',
      timestamp: '2025-01-07 13:15:44',
      reporter: 'David Rodriguez',
      type: 'near_miss',
      priority: 'medium',
      title: 'Vehicle Close Call',
      description: 'Two haul trucks nearly collided at intersection due to poor visibility.',
      location: 'Pit A - Main Road Intersection',
      status: 'resolved',
      hasPhotos: false,
      hasAudio: true,
      assignedTo: 'Operations Team',
    },
    {
      id: 'TA-004',
      timestamp: '2025-01-07 11:52:17',
      reporter: 'Lisa Wang',
      type: 'environmental_concern',
      priority: 'high',
      title: 'Dust Control Issue',
      description: 'Excessive dust generation observed in crushing area, affecting air quality.',
      location: 'Crushing Plant - Area B',
      status: 'submitted',
      hasPhotos: true,
      hasAudio: false,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'safety_incident': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'equipment_issue': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'environmental_concern': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'near_miss': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'maintenance_request': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'under_review': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'investigating': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'safety_incident': return 'Safety Incident';
      case 'equipment_issue': return 'Equipment Issue';
      case 'environmental_concern': return 'Environmental Concern';
      case 'near_miss': return 'Near Miss';
      case 'maintenance_request': return 'Maintenance Request';
      default: return type;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || report.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesType && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ThibaAlert Mobile Reporting
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Real-time incident reporting from mobile workforce
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
            Download App
          </button>
          <button className="btn-primary">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            Create Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">847</p>
            </div>
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Reports</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
            <ClockIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-green-600">18m</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
            </div>
            <UserCircleIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="safety_incident">Safety Incident</option>
              <option value="equipment_issue">Equipment Issue</option>
              <option value="environmental_concern">Environmental Concern</option>
              <option value="near_miss">Near Miss</option>
              <option value="maintenance_request">Maintenance Request</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="priority-filter"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="input-field"
            >
              <option value="all">All Priorities</option>
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
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="card p-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Reports ({filteredReports.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredReports.map((report) => {
            return (
              <div key={report.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${getPriorityColor(report.priority)}`}>
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.title}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {getTypeLabel(report.type)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority.toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {report.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <UserCircleIcon className="h-3 w-3 mr-1" />
                          {report.reporter}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {report.timestamp}
                        </span>
                        <span className="flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {report.location}
                        </span>
                        {report.hasPhotos && (
                          <span className="flex items-center text-blue-600">
                            <PhotoIcon className="h-3 w-3 mr-1" />
                            Photos
                          </span>
                        )}
                        {report.hasAudio && (
                          <span className="flex items-center text-green-600">
                            🎤 Audio
                          </span>
                        )}
                        {report.assignedTo && (
                          <span>
                            Assigned: {report.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary btn-sm">
                      View Details
                    </button>
                    {report.status === 'submitted' && (
                      <button className="btn-primary btn-sm">
                        Assign
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
