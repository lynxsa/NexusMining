import React, { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/currency';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

interface ComplianceRecord {
  id: string;
  title: string;
  type: 'permit' | 'certificate' | 'license' | 'inspection' | 'audit' | 'training';
  category: 'safety' | 'environmental' | 'operational' | 'financial' | 'legal';
  status: 'compliant' | 'non_compliant' | 'pending' | 'expired' | 'warning';
  issueDate: string;
  expiryDate: string;
  issuedBy: string;
  location: string;
  description: string;
  documentId: string;
  lastReviewed: string;
  nextReview: string;
  cost: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  responsiblePerson: string;
}

interface ComplianceAudit {
  id: string;
  title: string;
  auditor: string;
  auditDate: string;
  location: string;
  findings: number;
  nonCompliances: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  type: 'internal' | 'external' | 'regulatory';
  score: number;
  cost: number;
  nextAudit: string;
}

interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  category: 'documentation' | 'training' | 'inspection' | 'remediation';
  estimatedCost: number;
  relatedRecords: string[];
}

export const ComplianceHub: React.FC = () => {
  const { currentCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'audits' | 'tasks' | 'reports'>('overview');

  const complianceRecords: ComplianceRecord[] = [
    {
      id: 'CR001',
      title: 'Mining License - Gold Operations',
      type: 'license',
      category: 'operational',
      status: 'compliant',
      issueDate: '2023-01-15',
      expiryDate: '2026-01-15',
      issuedBy: 'Department of Mineral Resources and Energy',
      location: 'Rustenburg Mining Complex',
      description: 'Primary mining license for gold extraction operations',
      documentId: 'DMRE-GL-2023-001',
      lastReviewed: '2025-07-15',
      nextReview: '2025-10-15',
      cost: 485000,
      riskLevel: 'high',
      responsiblePerson: 'Johan van der Merwe'
    },
    {
      id: 'CR002',
      title: 'Environmental Impact Assessment',
      type: 'permit',
      category: 'environmental',
      status: 'warning',
      issueDate: '2024-03-20',
      expiryDate: '2025-09-20',
      issuedBy: 'Department of Environmental Affairs',
      location: 'Witbank Coal Mine',
      description: 'Environmental compliance assessment for coal mining operations',
      documentId: 'DEA-EIA-2024-047',
      lastReviewed: '2025-07-20',
      nextReview: '2025-08-20',
      cost: 125000,
      riskLevel: 'medium',
      responsiblePerson: 'Dr. Naledi Mokoena'
    },
    {
      id: 'CR003',
      title: 'Safety Management Certificate',
      type: 'certificate',
      category: 'safety',
      status: 'compliant',
      issueDate: '2024-06-01',
      expiryDate: '2025-06-01',
      issuedBy: 'Mine Health and Safety Council',
      location: 'All Operations',
      description: 'Comprehensive safety management system certification',
      documentId: 'MHSC-SMC-2024-098',
      lastReviewed: '2025-06-01',
      nextReview: '2025-12-01',
      cost: 85000,
      riskLevel: 'critical',
      responsiblePerson: 'Sipho Dlamini'
    },
    {
      id: 'CR004',
      title: 'Water Use License',
      type: 'license',
      category: 'environmental',
      status: 'expired',
      issueDate: '2022-04-15',
      expiryDate: '2025-07-15',
      issuedBy: 'Department of Water and Sanitation',
      location: 'Kimberley Diamond Mine',
      description: 'License for water usage in diamond mining operations',
      documentId: 'DWS-WUL-2022-156',
      lastReviewed: '2025-07-10',
      nextReview: '2025-08-15',
      cost: 65000,
      riskLevel: 'high',
      responsiblePerson: 'Maria Santos'
    },
    {
      id: 'CR005',
      title: 'Equipment Safety Inspection',
      type: 'inspection',
      category: 'safety',
      status: 'pending',
      issueDate: '2025-07-01',
      expiryDate: '2025-08-01',
      issuedBy: 'South African Bureau of Standards',
      location: 'Workshop Area - All Equipment',
      description: 'Annual safety inspection of all mining equipment',
      documentId: 'SABS-ESI-2025-234',
      lastReviewed: '2025-07-01',
      nextReview: '2025-07-30',
      cost: 35000,
      riskLevel: 'medium',
      responsiblePerson: 'Pieter van der Merwe'
    }
  ];

  const complianceAudits: ComplianceAudit[] = [
    {
      id: 'CA001',
      title: 'Annual Safety Compliance Audit',
      auditor: 'Ernst & Young Mining Advisory',
      auditDate: '2025-06-15',
      location: 'Rustenburg Operations',
      findings: 12,
      nonCompliances: 3,
      status: 'completed',
      type: 'external',
      score: 87,
      cost: 245000,
      nextAudit: '2026-06-15'
    },
    {
      id: 'CA002',
      title: 'Environmental Compliance Review',
      auditor: 'Green Mining Consultants',
      auditDate: '2025-08-10',
      location: 'Witbank Coal Operations',
      findings: 8,
      nonCompliances: 1,
      status: 'in_progress',
      type: 'external',
      score: 0,
      cost: 185000,
      nextAudit: '2026-02-10'
    },
    {
      id: 'CA003',
      title: 'Internal Operations Audit',
      auditor: 'Internal Audit Team',
      auditDate: '2025-07-20',
      location: 'All Operations',
      findings: 15,
      nonCompliances: 2,
      status: 'scheduled',
      type: 'internal',
      score: 0,
      cost: 45000,
      nextAudit: '2025-10-20'
    }
  ];

  const complianceTasks: ComplianceTask[] = [
    {
      id: 'CT001',
      title: 'Renew Water Use License',
      description: 'Submit renewal application for water use license before expiry',
      assignedTo: 'Maria Santos',
      dueDate: '2025-08-15',
      priority: 'critical',
      status: 'pending',
      category: 'documentation',
      estimatedCost: 85000,
      relatedRecords: ['CR004']
    },
    {
      id: 'CT002',
      title: 'Complete Equipment Safety Training',
      description: 'Conduct mandatory safety training for all equipment operators',
      assignedTo: 'Sipho Dlamini',
      dueDate: '2025-08-30',
      priority: 'high',
      status: 'in_progress',
      category: 'training',
      estimatedCost: 25000,
      relatedRecords: ['CR003', 'CR005']
    },
    {
      id: 'CT003',
      title: 'Environmental Impact Assessment Update',
      description: 'Update EIA documentation based on recent operational changes',
      assignedTo: 'Dr. Naledi Mokoena',
      dueDate: '2025-08-20',
      priority: 'medium',
      status: 'pending',
      category: 'documentation',
      estimatedCost: 65000,
      relatedRecords: ['CR002']
    },
    {
      id: 'CT004',
      title: 'Address Audit Non-Compliance Issues',
      description: 'Remediate issues identified in recent safety compliance audit',
      assignedTo: 'Johan van der Merwe',
      dueDate: '2025-08-05',
      priority: 'high',
      status: 'overdue',
      category: 'remediation',
      estimatedCost: 125000,
      relatedRecords: ['CR001']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'non_compliant': case 'expired': case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'warning': case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending': case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const compliantRecords = complianceRecords.filter(r => r.status === 'compliant').length;
  const expiredRecords = complianceRecords.filter(r => r.status === 'expired').length;
  const warningRecords = complianceRecords.filter(r => r.status === 'warning').length;
  const pendingTasks = complianceTasks.filter(t => t.status === 'pending').length;
  const overdueTasks = complianceTasks.filter(t => t.status === 'overdue').length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliant Records</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{compliantRecords}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">
            {Math.round((compliantRecords / complianceRecords.length) * 100)}% compliance rate
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired/Warnings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{expiredRecords + warningRecords}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">
            Require immediate attention
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingTasks}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Awaiting action
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{overdueTasks}</p>
            </div>
            <XCircleIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">
            Critical attention needed
          </p>
        </div>
      </div>

      {/* Critical Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Critical Compliance Items</h3>
        <div className="space-y-4">
          {complianceRecords.filter(r => r.status === 'expired' || r.riskLevel === 'critical').slice(0, 3).map((record) => (
            <div key={record.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-800 dark:text-red-400">{record.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(record.riskLevel)}`}>
                    {record.riskLevel.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-red-800 dark:text-red-400 mb-2">{record.description}</p>
              <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                <span>📍 {record.location}</span>
                <span>👤 {record.responsiblePerson}</span>
                <span>📅 Expires: {record.expiryDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Audits</h3>
        <div className="space-y-4">
          {complianceAudits.slice(0, 3).map((audit) => (
            <div key={audit.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{audit.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                  {audit.status.replace('_', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Auditor</p>
                  <p className="font-medium text-gray-900 dark:text-white">{audit.auditor}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Findings</p>
                  <p className="font-medium text-gray-900 dark:text-white">{audit.findings}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Non-Compliances</p>
                  <p className="font-medium text-red-600">{audit.nonCompliances}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(audit.cost, currentCurrency.code)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Compliance Tasks</h3>
        <div className="space-y-4">
          {complianceTasks.filter(t => t.status !== 'completed').slice(0, 3).map((task) => (
            <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="font-medium text-gray-900 dark:text-white">{task.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{task.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Est. Cost</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(task.estimatedCost, currentCurrency.code)}</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compliance Hub</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Regulatory compliance management and audit tracking for South African mining operations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${expiredRecords > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-medium ${expiredRecords > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {expiredRecords > 0 ? `${expiredRecords} Critical Issues` : 'All Systems Compliant'}
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            New Record
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: ShieldCheckIcon },
            { key: 'records', name: 'Compliance Records', icon: DocumentTextIcon },
            { key: 'audits', name: 'Audits', icon: DocumentCheckIcon },
            { key: 'tasks', name: 'Tasks', icon: ClockIcon },
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
      {activeTab === 'records' && (
        <div className="space-y-4">
          {complianceRecords.map((record) => (
            <div key={record.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{record.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{record.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getRiskColor(record.riskLevel)}`}>
                    {record.riskLevel.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{record.type}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{record.category}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Issued By</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{record.issuedBy}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expiry Date</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{record.expiryDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(record.cost, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Responsible</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{record.responsiblePerson}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{record.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{record.documentId}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    View Document
                  </button>
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'audits' && (
        <div className="space-y-4">
          {complianceAudits.map((audit) => (
            <div key={audit.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{audit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{audit.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    audit.type === 'external' ? 'bg-blue-100 text-blue-800' :
                    audit.type === 'internal' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {audit.type.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(audit.status)}`}>
                    {audit.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Auditor</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{audit.auditor}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Audit Date</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{audit.auditDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Findings</p>
                  <p className="text-lg font-bold text-blue-600">{audit.findings}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Non-Compliances</p>
                  <p className="text-lg font-bold text-red-600">{audit.nonCompliances}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                  <p className={`text-lg font-bold ${audit.score >= 85 ? 'text-green-600' : audit.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {audit.score > 0 ? `${audit.score}%` : 'Pending'}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(audit.cost, currentCurrency.code)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Next Audit: {audit.nextAudit}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    View Report
                  </button>
                  {audit.status === 'completed' && (
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {complianceTasks.map((task) => (
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
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.assignedTo}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{task.dueDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{task.category}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Est. Cost</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(task.estimatedCost, currentCurrency.code)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Related Records: {task.relatedRecords.length}</span>
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
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compliance Status Report</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive overview of all compliance records and their current status.
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ScaleIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Regulatory Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Summary of regulatory requirements and compliance gaps for South African mining.
              </p>
              <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                View Summary
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <DocumentCheckIcon className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Audit History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Historical audit results, trends, and improvement tracking.
              </p>
              <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm">
                Audit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
