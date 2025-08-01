import React, { useState } from 'react';
import {
  WrenchScrewdriverIcon,
  TruckIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/currency';

interface InventoryItem {
  id: string;
  name: string;
  category: 'parts' | 'tools' | 'consumables' | 'safety';
  sku: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
}

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  assignedTo: string;
  equipment: string;
  estimatedHours: number;
  actualHours: number;
  requiredParts: string[];
  createdDate: string;
  dueDate: string;
  completedDate?: string;
}

interface Supplier {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'emergency';
  rating: number;
  deliveryTime: number;
  onTimeDelivery: number;
  qualityScore: number;
  totalOrders: number;
  contact: string;
  location: string;
}

export const WorkshopOps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'workorders' | 'suppliers' | 'analytics'>('dashboard');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { currentCurrency } = useCurrency();

  const inventory: InventoryItem[] = [
    {
      id: 'INV001',
      name: 'Hydraulic Pump Assembly - CAT 390F',
      category: 'parts',
      sku: 'HP-CAT-390F-ZA',
      quantity: 3,
      minStock: 2,
      maxStock: 8,
      unitPrice: 485000, // ZAR
      location: 'Johannesburg Warehouse A-12',
      supplier: 'Barloworld Equipment',
      lastRestocked: '2025-07-15',
      status: 'in-stock'
    },
    {
      id: 'INV002',
      name: 'Heavy Duty Drill Bits - Atlas Copco Set',
      category: 'tools',
      sku: 'DB-AC-HD-50ZA',
      quantity: 1,
      minStock: 3,
      maxStock: 12,
      unitPrice: 12500, // ZAR
      location: 'Rustenburg Tool Room B',
      supplier: 'African Mining Supplies',
      lastRestocked: '2025-07-08',
      status: 'low-stock'
    },
    {
      id: 'INV003',
      name: 'Engine Oil - Castrol Industrial Grade 208L',
      category: 'consumables',
      sku: 'EO-CASTROL-208L-ZA',
      quantity: 0,
      minStock: 5,
      maxStock: 20,
      unitPrice: 3200, // ZAR
      location: 'Welkom Storage C-3',
      supplier: 'Shell South Africa',
      lastRestocked: '2024-12-20',
      status: 'out-of-stock'
    },
    {
      id: 'INV004',
      name: 'Safety Harness - MSA Heavy Duty',
      category: 'safety',
      sku: 'SH-MSA-HD-XL-ZA',
      quantity: 8,
      minStock: 10,
      maxStock: 25,
      unitPrice: 2850, // ZAR
      location: 'Kimberley Safety Equipment Room',
      supplier: 'SafeGuard Equipment SA',
      lastRestocked: '2025-07-12',
      status: 'low-stock'
    },
    {
      id: 'INV005',
      name: 'Bearing Assembly Kit - SKF Mining Grade',
      category: 'parts',
      sku: 'BA-SKF-MINING-ZA',
      quantity: 15,
      minStock: 8,
      maxStock: 30,
      unitPrice: 8750, // ZAR
      location: 'Witbank Bay B-5',
      supplier: 'SKF South Africa',
      lastRestocked: '2025-07-18',
      status: 'in-stock'
    }
  ];

  const workOrders: WorkOrder[] = [
    {
      id: 'WO001',
      title: 'CAT 793F Haul Truck Hydraulic System Repair',
      description: 'Replace faulty hydraulic pump and inspect system for leaks on primary haul truck',
      priority: 'critical',
      status: 'in-progress',
      assignedTo: 'Thabo Mthembu',
      equipment: 'CAT 793F Haul Truck #ZA-03',
      estimatedHours: 8,
      actualHours: 5.5,
      requiredParts: ['Hydraulic Pump Assembly', 'Hydraulic Hoses', 'Seals Kit'],
      createdDate: '2025-07-20',
      dueDate: '2025-08-02',
    },
    {
      id: 'WO002',
      title: 'Komatsu 980E Preventive Maintenance',
      description: 'Scheduled 500-hour maintenance including oil change and comprehensive inspection',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Sarah van der Merwe',
      equipment: 'Komatsu 980E #ZA-07',
      estimatedHours: 6,
      actualHours: 0,
      requiredParts: ['Engine Oil - Castrol', 'Air Filter', 'Oil Filter'],
      createdDate: '2025-07-19',
      dueDate: '2025-08-05',
    },
    {
      id: 'WO003',
      title: 'Conveyor Belt Replacement - Processing Plant',
      description: 'Replace worn conveyor belt section in gold processing plant',
      priority: 'high',
      status: 'completed',
      assignedTo: 'Johannes Kruger',
      equipment: 'Conveyor System B - Witbank Plant',
      estimatedHours: 12,
      actualHours: 10,
      requiredParts: ['Conveyor Belt Section', 'Belt Clamps', 'Industrial Lubricant'],
      createdDate: '2025-07-15',
      dueDate: '2025-07-18',
      completedDate: '2025-07-17'
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: 'SUP001',
      name: 'Barloworld Equipment',
      type: 'primary',
      rating: 4.8,
      deliveryTime: 3,
      onTimeDelivery: 95,
      qualityScore: 97,
      totalOrders: 142,
      contact: 'orders@barloworld.com',
      location: 'Johannesburg, Gauteng'
    },
    {
      id: 'SUP002',
      name: 'African Mining Supplies',
      type: 'primary',
      rating: 4.6,
      deliveryTime: 5,
      onTimeDelivery: 88,
      qualityScore: 94,
      totalOrders: 89,
      contact: 'orders@africanmining.co.za',
      location: 'Durban, KwaZulu-Natal'
    },
    {
      id: 'SUP003',
      name: 'SafeGuard Equipment SA',
      type: 'secondary',
      rating: 4.4,
      deliveryTime: 7,
      onTimeDelivery: 92,
      qualityScore: 96,
      totalOrders: 67,
      contact: 'sales@safeguard.co.za',
      location: 'Cape Town, Western Cape'
    },
    {
      id: 'SUP004',
      name: 'Bell Equipment',
      type: 'primary',
      rating: 4.7,
      deliveryTime: 4,
      onTimeDelivery: 93,
      qualityScore: 95,
      totalOrders: 98,
      contact: 'parts@bellequipment.com',
      location: 'Richards Bay, KwaZulu-Natal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low-stock': case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'out-of-stock': case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'on-order': case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'on-hold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrencyValue = (amount: number) => {
    return formatCurrency(amount, currentCurrency.code);
  };

  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length;
  const activeWorkOrders = workOrders.filter(wo => wo.status === 'in-progress' || wo.status === 'pending').length;
  const criticalWorkOrders = workOrders.filter(wo => wo.priority === 'critical').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrencyValue(totalInventoryValue)}</p>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
              <p className="text-3xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Work Orders</p>
              <p className="text-3xl font-bold text-blue-600">{activeWorkOrders}</p>
            </div>
            <WrenchScrewdriverIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Work Orders</p>
              <p className="text-3xl font-bold text-red-600">{criticalWorkOrders}</p>
            </div>
            <BoltIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Work Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Work Orders</h3>
        <div className="space-y-3">
          {workOrders.slice(0, 3).map((workOrder) => (
            <div key={workOrder.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(workOrder.priority)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{workOrder.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{workOrder.equipment}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Assigned: {workOrder.assignedTo}</span>
                    <span>Due: {workOrder.dueDate}</span>
                    <span>Est: {workOrder.estimatedHours}h</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
                    {workOrder.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                    {workOrder.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Alerts</h3>
        <div className="space-y-3">
          {inventory.filter(item => item.status !== 'in-stock').map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {item.sku} | Location: {item.location}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Qty: {item.quantity} (Min: {item.minStock})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.sku}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Unit Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrencyValue(item.unitPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Supplier:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.supplier}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Stock Level</span>
                  <span>{item.quantity}/{item.maxStock}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.quantity <= item.minStock ? 'bg-red-500' :
                      item.quantity <= item.minStock * 1.5 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((item.quantity / item.maxStock) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">WorkshopOps</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive supply chain management and workshop operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            New Work Order
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Add Inventory
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
            { key: 'inventory', name: 'Inventory', icon: CubeIcon },
            { key: 'workorders', name: 'Work Orders', icon: WrenchScrewdriverIcon },
            { key: 'suppliers', name: 'Suppliers', icon: TruckIcon },
            { key: 'analytics', name: 'Analytics', icon: ChartBarIcon }
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
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'inventory' && renderInventory()}
      {activeTab === 'workorders' && (
        <div className="space-y-4">
          {workOrders.map((workOrder) => (
            <div key={workOrder.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{workOrder.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{workOrder.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
                    {workOrder.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                    {workOrder.priority}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Equipment</p>
                  <p className="font-medium text-gray-900 dark:text-white">{workOrder.equipment}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="font-medium text-gray-900 dark:text-white">{workOrder.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{workOrder.dueDate}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress: </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {workOrder.actualHours}/{workOrder.estimatedHours} hours
                  </span>
                </div>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{supplier.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{supplier.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  supplier.type === 'primary' ? 'bg-blue-100 text-blue-800' :
                  supplier.type === 'secondary' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {supplier.type}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="font-medium text-gray-900 dark:text-white">{supplier.rating}/5.0</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Delivery Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{supplier.deliveryTime} days</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">On-Time Delivery</p>
                  <p className="font-medium text-gray-900 dark:text-white">{supplier.onTimeDelivery}%</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Quality Score</p>
                  <p className="font-medium text-gray-900 dark:text-white">{supplier.qualityScore}%</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {supplier.totalOrders} total orders
                </span>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workshop Analytics</h3>
          <p className="text-gray-600 dark:text-gray-400">Detailed analytics dashboard coming soon...</p>
        </div>
      )}

      {/* Inventory Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedItem.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">SKU: {selectedItem.sku}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedItem.quantity}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unit Price</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrencyValue(selectedItem.unitPrice)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Stock Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Minimum Stock</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedItem.minStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Maximum Stock</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedItem.maxStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedItem.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Last Restocked</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedItem.lastRestocked}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Supplier Information</h3>
                  <p className="text-gray-900 dark:text-white">{selectedItem.supplier}</p>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Reorder Stock
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    Update Quantity
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
