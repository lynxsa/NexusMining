import React, { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/currency';
import {
  DevicePhoneMobileIcon,
  UserIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  SignalIcon,
  Battery0Icon as BatteryIcon,
  CameraIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface MobileWorker {
  id: string;
  name: string;
  role: string;
  location: string;
  status: 'active' | 'offline' | 'break' | 'emergency';
  lastSeen: string;
  batteryLevel: number;
  signalStrength: number;
  tasksCompleted: number;
  totalTasks: number;
  shift: string;
  zone: string;
  equipment?: string;
}

interface FieldTask {
  id: string;
  title: string;
  type: 'inspection' | 'maintenance' | 'safety' | 'documentation' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  location: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  createdAt: string;
  dueDate: string;
  estimatedTime: number;
  completedAt?: string;
  cost: number;
  photos: number;
  notes?: string;
}

interface EmergencyAlert {
  id: string;
  type: 'accident' | 'equipment_failure' | 'hazard' | 'evacuation' | 'medical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  reporter: string;
  message: string;
  timestamp: string;
  status: 'open' | 'acknowledged' | 'resolved';
  responders: string[];
}

export const FieldOpsMobile: React.FC = () => {
  const { currentCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'workers' | 'tasks' | 'alerts' | 'reports'>('overview');

  const mobileWorkers: MobileWorker[] = [
    {
      id: 'MW001',
      name: 'Themba Mthembu',
      role: 'Mine Supervisor',
      location: 'Underground Level 3',
      status: 'active',
      lastSeen: '2 minutes ago',
      batteryLevel: 87,
      signalStrength: 4,
      tasksCompleted: 8,
      totalTasks: 12,
      shift: 'Day Shift',
      zone: 'Zone A',
      equipment: 'CAT 994K Loader'
    },
    {
      id: 'MW002',
      name: 'Naledi Mokoena',
      role: 'Safety Inspector',
      location: 'Processing Plant',
      status: 'active',
      lastSeen: '5 minutes ago',
      batteryLevel: 92,
      signalStrength: 5,
      tasksCompleted: 15,
      totalTasks: 18,
      shift: 'Day Shift',
      zone: 'Zone B'
    },
    {
      id: 'MW003',
      name: 'Pieter van der Merwe',
      role: 'Equipment Technician',
      location: 'Workshop Area',
      status: 'break',
      lastSeen: '15 minutes ago',
      batteryLevel: 65,
      signalStrength: 3,
      tasksCompleted: 6,
      totalTasks: 10,
      shift: 'Day Shift',
      zone: 'Zone C',
      equipment: 'Maintenance Unit'
    },
    {
      id: 'MW004',
      name: 'Zanele Nkomo',
      role: 'Production Coordinator',
      location: 'Control Room',
      status: 'active',
      lastSeen: '1 minute ago',
      batteryLevel: 78,
      signalStrength: 5,
      tasksCompleted: 11,
      totalTasks: 14,
      shift: 'Day Shift',
      zone: 'Zone D'
    },
    {
      id: 'MW005',
      name: 'Johan Steyn',
      role: 'Drill Operator',
      location: 'Pit Area - Level 2',
      status: 'offline',
      lastSeen: '25 minutes ago',
      batteryLevel: 23,
      signalStrength: 1,
      tasksCompleted: 4,
      totalTasks: 8,
      shift: 'Day Shift',
      zone: 'Zone E',
      equipment: 'Atlas Copco ROC D7'
    }
  ];

  const fieldTasks: FieldTask[] = [
    {
      id: 'FT001',
      title: 'Daily Safety Inspection - Conveyor Belt System',
      type: 'safety',
      priority: 'high',
      assignedTo: 'Naledi Mokoena',
      location: 'Processing Plant - Belt 3',
      description: 'Complete daily safety check of conveyor belt system including guards, emergency stops, and belt condition.',
      status: 'in_progress',
      createdAt: '2025-08-01 06:00',
      dueDate: '2025-08-01 10:00',
      estimatedTime: 45,
      cost: 850,
      photos: 3
    },
    {
      id: 'FT002',
      title: 'Hydraulic System Maintenance',
      type: 'maintenance',
      priority: 'medium',
      assignedTo: 'Pieter van der Merwe',
      location: 'CAT 994K - Unit 003',
      description: 'Replace hydraulic filters and check fluid levels on loader hydraulic system.',
      status: 'pending',
      createdAt: '2025-08-01 07:30',
      dueDate: '2025-08-01 14:00',
      estimatedTime: 90,
      cost: 2150,
      photos: 0
    },
    {
      id: 'FT003',
      title: 'Production Data Collection',
      type: 'documentation',
      priority: 'medium',
      assignedTo: 'Zanele Nkomo',
      location: 'Zone D - Stockpile Area',
      description: 'Collect hourly production data and update digital records.',
      status: 'completed',
      createdAt: '2025-08-01 08:00',
      dueDate: '2025-08-01 09:00',
      estimatedTime: 30,
      completedAt: '2025-08-01 08:45',
      cost: 450,
      photos: 2,
      notes: 'Production target met for this shift.'
    },
    {
      id: 'FT004',
      title: 'Equipment Pre-Start Check',
      type: 'inspection',
      priority: 'high',
      assignedTo: 'Johan Steyn',
      location: 'Drill ROC D7 - Unit 007',
      description: 'Complete pre-operational inspection including engine, hydraulics, and safety systems.',
      status: 'overdue',
      createdAt: '2025-08-01 05:30',
      dueDate: '2025-08-01 06:30',
      estimatedTime: 20,
      cost: 320,
      photos: 0
    },
    {
      id: 'FT005',
      title: 'Environmental Monitoring',
      type: 'inspection',
      priority: 'low',
      assignedTo: 'Themba Mthembu',
      location: 'Underground Level 3',
      description: 'Monitor air quality and dust levels in underground working areas.',
      status: 'pending',
      createdAt: '2025-08-01 09:00',
      dueDate: '2025-08-01 16:00',
      estimatedTime: 60,
      cost: 680,
      photos: 0
    }
  ];

  const emergencyAlerts: EmergencyAlert[] = [
    {
      id: 'EA001',
      type: 'equipment_failure',
      severity: 'high',
      location: 'Processing Plant - Crusher Unit 2',
      reporter: 'Sipho Dlamini',
      message: 'Main crusher bearing overheating - immediate shutdown required',
      timestamp: '2025-08-01 09:15',
      status: 'acknowledged',
      responders: ['Pieter van der Merwe', 'Maintenance Team Alpha']
    },
    {
      id: 'EA002',
      type: 'hazard',
      severity: 'medium',
      location: 'Pit Area - Access Road 2',
      reporter: 'Maria Santos',
      message: 'Loose rocks detected on haul road - potential hazard for vehicles',
      timestamp: '2025-08-01 08:45',
      status: 'open',
      responders: ['Road Maintenance Crew']
    },
    {
      id: 'EA003',
      type: 'medical',
      severity: 'critical',
      location: 'Underground Level 2 - Station B',
      reporter: 'Emergency Response',
      message: 'Worker injury reported - medical assistance dispatched',
      timestamp: '2025-08-01 07:30',
      status: 'resolved',
      responders: ['Medical Team', 'Safety Officer', 'Mine Rescue']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'break': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'emergency': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const activeWorkers = mobileWorkers.filter(w => w.status === 'active').length;
  const totalTasks = fieldTasks.length;
  const completedTasks = fieldTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = fieldTasks.filter(t => t.status === 'overdue').length;
  const openAlerts = emergencyAlerts.filter(a => a.status === 'open').length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Workers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeWorkers}</p>
            </div>
            <UserIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {mobileWorkers.length} total workers
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedTasks}/{totalTasks}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">
            {Math.round((completedTasks / totalTasks) * 100)}% completion rate
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{overdueTasks}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">
            Require immediate attention
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Alerts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{openAlerts}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Emergency notifications
          </p>
        </div>
      </div>

      {/* Active Workers Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mobile Workers Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mobileWorkers.slice(0, 6).map((worker) => (
            <div key={worker.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{worker.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{worker.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                  {worker.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{worker.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BatteryIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{worker.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SignalIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 h-3 rounded ${
                            bar <= worker.signalStrength ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tasks: {worker.tasksCompleted}/{worker.totalTasks}</span>
                  <span>{worker.lastSeen}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Field Tasks</h3>
        <div className="space-y-4">
          {fieldTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Assigned to</p>
                  <p className="font-medium text-gray-900 dark:text-white">{task.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{task.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(task.cost, currentCurrency.code)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{task.dueDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Alerts */}
      {emergencyAlerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Alerts</h3>
          <div className="space-y-4">
            {emergencyAlerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800 dark:text-red-400">{alert.type.replace('_', ' ').toUpperCase()}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-red-800 dark:text-red-400 mb-2">{alert.message}</p>
                <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                  <span>📍 {alert.location}</span>
                  <span>👤 {alert.reporter}</span>
                  <span>🕐 {alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FieldOps Mobile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Mobile workforce management and field operations coordination
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">{activeWorkers} Workers Online</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Dispatch Task
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: DevicePhoneMobileIcon },
            { key: 'workers', name: 'Mobile Workers', icon: UserIcon },
            { key: 'tasks', name: 'Field Tasks', icon: WrenchScrewdriverIcon },
            { key: 'alerts', name: 'Emergency Alerts', icon: ExclamationTriangleIcon },
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
      {activeTab === 'workers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobileWorkers.map((worker) => (
            <div key={worker.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{worker.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{worker.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(worker.status)}`}>
                  {worker.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{worker.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Zone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{worker.zone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Shift</p>
                    <p className="font-medium text-gray-900 dark:text-white">{worker.shift}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Last Seen</p>
                    <p className="font-medium text-gray-900 dark:text-white">{worker.lastSeen}</p>
                  </div>
                </div>

                {worker.equipment && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Equipment</p>
                    <p className="font-medium text-gray-900 dark:text-white">{worker.equipment}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BatteryIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{worker.batteryLevel}%</span>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          worker.batteryLevel > 50 ? 'bg-green-500' : 
                          worker.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${worker.batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SignalIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 h-4 rounded ${
                            bar <= worker.signalStrength ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Task Progress</span>
                    <span className="text-gray-900 dark:text-white">{worker.tasksCompleted}/{worker.totalTasks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(worker.tasksCompleted / worker.totalTasks) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                    Contact
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm">
                    Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {fieldTasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.assignedTo}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.location}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.dueDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Est. Time</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.estimatedTime} min</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(task.cost, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Photos</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.photos}</p>
                </div>
              </div>

              {task.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    <strong>Notes:</strong> {task.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CameraIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{task.photos} photos</span>
                  </div>
                  {task.completedAt && (
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Completed at {task.completedAt}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    View Details
                  </button>
                  {task.status === 'pending' && (
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                      Start Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {emergencyAlerts.map((alert) => (
            <div key={alert.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 border-red-500 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">
                      {alert.type.replace('_', ' ').toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getPriorityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-900 dark:text-white font-medium mb-2">{alert.message}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Reporter</p>
                    <p className="font-medium text-gray-900 dark:text-white">{alert.reporter}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Timestamp</p>
                    <p className="font-medium text-gray-900 dark:text-white">{alert.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Responders</p>
                    <p className="font-medium text-gray-900 dark:text-white">{alert.responders.length} assigned</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Assigned Responders:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {alert.responders.map((responder, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                      {responder}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                    Emergency Call
                  </button>
                  {alert.status === 'open' && (
                    <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm">
                      Acknowledge
                    </button>
                  )}
                  {alert.status === 'acknowledged' && (
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                      Mark Resolved
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm">
                    View Location
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Field Operations Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <DocumentTextIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Daily Activity Report</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive daily field operations summary with worker activity and task completion.
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ClockIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Productivity Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Worker productivity metrics and task completion time analysis.
              </p>
              <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                View Analysis
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Safety Incidents</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Emergency alerts, safety incidents, and response time analysis.
              </p>
              <button className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                Safety Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
