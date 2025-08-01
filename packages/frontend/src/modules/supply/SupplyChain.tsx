import React, { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/currency';
import {
  TruckIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Supplier {
  id: string;
  name: string;
  category: 'equipment' | 'materials' | 'services' | 'fuel' | 'parts' | 'safety';
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  totalOrders: number;
  totalValue: number;
  onTimeDelivery: number;
  qualityScore: number;
  status: 'active' | 'pending' | 'suspended' | 'blacklisted';
  contractEnd: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: string[];
  totalValue: number;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  status: 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  approvedBy: string;
  deliveryLocation: string;
  invoiceStatus: 'pending' | 'received' | 'paid';
}

interface Inventory {
  id: string;
  itemName: string;
  category: 'equipment' | 'materials' | 'consumables' | 'safety' | 'maintenance';
  currentStock: number;
  minimumStock: number;
  unit: string;
  unitCost: number;
  totalValue: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

interface Shipment {
  id: string;
  orderId: string;
  supplier: string;
  carrier: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  shipDate: string;
  expectedArrival: string;
  actualArrival?: string;
  status: 'picked_up' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered' | 'delayed';
  items: number;
  value: number;
}

export const SupplyChain: React.FC = () => {
  const { currentCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'suppliers' | 'orders' | 'inventory' | 'shipments' | 'reports'>('overview');

  const suppliers: Supplier[] = [
    {
      id: 'SUP001',
      name: 'Barloworld Equipment',
      category: 'equipment',
      location: 'Johannesburg, South Africa',
      contactPerson: 'Johan Pretorius',
      phone: '+27 11 898 9000',
      email: 'johan.pretorius@barloworld.com',
      rating: 4.8,
      totalOrders: 245,
      totalValue: 48500000,
      onTimeDelivery: 94,
      qualityScore: 96,
      status: 'active',
      contractEnd: '2026-12-31',
      riskLevel: 'low'
    },
    {
      id: 'SUP002',
      name: 'Bell Equipment',
      category: 'equipment',
      location: 'Richards Bay, South Africa',
      contactPerson: 'Sarah Mitchell',
      phone: '+27 35 907 9000',
      email: 'sarah.mitchell@bellequipment.com',
      rating: 4.6,
      totalOrders: 156,
      totalValue: 32400000,
      onTimeDelivery: 91,
      qualityScore: 93,
      status: 'active',
      contractEnd: '2025-08-15',
      riskLevel: 'medium'
    },
    {
      id: 'SUP003',
      name: 'African Mining Supplies',
      category: 'materials',
      location: 'Cape Town, South Africa',
      contactPerson: 'Thabo Mthembu',
      phone: '+27 21 555 7890',
      email: 'thabo.mthembu@ams.co.za',
      rating: 4.3,
      totalOrders: 189,
      totalValue: 15600000,
      onTimeDelivery: 87,
      qualityScore: 89,
      status: 'active',
      contractEnd: '2025-11-30',
      riskLevel: 'medium'
    },
    {
      id: 'SUP004',
      name: 'Sasol Chemicals',
      category: 'materials',
      location: 'Secunda, South Africa',
      contactPerson: 'Dr. Naledi Khumalo',
      phone: '+27 17 610 3000',
      email: 'naledi.khumalo@sasol.com',
      rating: 4.7,
      totalOrders: 98,
      totalValue: 28900000,
      onTimeDelivery: 96,
      qualityScore: 98,
      status: 'active',
      contractEnd: '2026-03-15',
      riskLevel: 'low'
    },
    {
      id: 'SUP005',
      name: 'Industrial Safety Solutions',
      category: 'safety',
      location: 'Durban, South Africa',
      contactPerson: 'Maria Dos Santos',
      phone: '+27 31 303 7500',
      email: 'maria.santos@iss.co.za',
      rating: 4.4,
      totalOrders: 267,
      totalValue: 8750000,
      onTimeDelivery: 92,
      qualityScore: 94,
      status: 'active',
      contractEnd: '2025-10-31',
      riskLevel: 'low'
    }
  ];

  const purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO-2025-001',
      supplier: 'Barloworld Equipment',
      items: ['CAT 994K Loader - Hydraulic Filters', 'Engine Oil - 20L drums x 50'],
      totalValue: 485000,
      orderDate: '2025-07-28',
      expectedDelivery: '2025-08-05',
      status: 'confirmed',
      priority: 'high',
      approvedBy: 'Johan van der Merwe',
      deliveryLocation: 'Rustenburg Mining Complex',
      invoiceStatus: 'pending'
    },
    {
      id: 'PO-2025-002',
      supplier: 'African Mining Supplies',
      items: ['ANFO Explosives - 5000kg', 'Detonators - Grade A x 500', 'Safety Fuse - 2000m'],
      totalValue: 285000,
      orderDate: '2025-07-30',
      expectedDelivery: '2025-08-08',
      status: 'sent',
      priority: 'urgent',
      approvedBy: 'Sipho Dlamini',
      deliveryLocation: 'Witbank Coal Mine',
      invoiceStatus: 'pending'
    },
    {
      id: 'PO-2025-003',
      supplier: 'Industrial Safety Solutions',
      items: ['Hard Hats x 500', 'Safety Boots x 300 pairs', 'High-Vis Vests x 400'],
      totalValue: 125000,
      orderDate: '2025-08-01',
      expectedDelivery: '2025-08-10',
      status: 'draft',
      priority: 'medium',
      approvedBy: 'Dr. Naledi Mokoena',
      deliveryLocation: 'All Sites',
      invoiceStatus: 'pending'
    },
    {
      id: 'PO-2025-004',
      supplier: 'Bell Equipment',
      items: ['Articulated Dump Truck ADT - Tire Set', 'Hydraulic Hoses x 20'],
      totalValue: 650000,
      orderDate: '2025-07-25',
      expectedDelivery: '2025-08-03',
      actualDelivery: '2025-08-01',
      status: 'delivered',
      priority: 'high',
      approvedBy: 'Pieter van der Merwe',
      deliveryLocation: 'Kimberley Diamond Mine',
      invoiceStatus: 'paid'
    }
  ];

  const inventory: Inventory[] = [
    {
      id: 'INV001',
      itemName: 'CAT 994K Hydraulic Filters',
      category: 'maintenance',
      currentStock: 45,
      minimumStock: 20,
      unit: 'units',
      unitCost: 8500,
      totalValue: 382500,
      location: 'Rustenburg Warehouse',
      supplier: 'Barloworld Equipment',
      lastRestocked: '2025-07-15',
      status: 'in_stock'
    },
    {
      id: 'INV002',
      itemName: 'ANFO Explosives',
      category: 'materials',
      currentStock: 2500,
      minimumStock: 3000,
      unit: 'kg',
      unitCost: 45,
      totalValue: 112500,
      location: 'Explosives Storage - Witbank',
      supplier: 'African Mining Supplies',
      lastRestocked: '2025-07-20',
      expiryDate: '2026-07-20',
      status: 'low_stock'
    },
    {
      id: 'INV003',
      itemName: 'Industrial Hard Hats',
      category: 'safety',
      currentStock: 850,
      minimumStock: 200,
      unit: 'units',
      unitCost: 125,
      totalValue: 106250,
      location: 'Safety Equipment Store',
      supplier: 'Industrial Safety Solutions',
      lastRestocked: '2025-06-30',
      status: 'in_stock'
    },
    {
      id: 'INV004',
      itemName: 'Drill Bits - 300mm Tungsten',
      category: 'equipment',
      currentStock: 0,
      minimumStock: 15,
      unit: 'units',
      unitCost: 12500,
      totalValue: 0,
      location: 'Equipment Storage',
      supplier: 'Bell Equipment',
      lastRestocked: '2025-06-15',
      status: 'out_of_stock'
    },
    {
      id: 'INV005',
      itemName: 'Chemical Processing Agent X-45',
      category: 'materials',
      currentStock: 125,
      minimumStock: 100,
      unit: 'drums',
      unitCost: 2850,
      totalValue: 356250,
      location: 'Chemical Storage - Rustenburg',
      supplier: 'Sasol Chemicals',
      lastRestocked: '2025-07-10',
      expiryDate: '2025-08-10',
      status: 'in_stock'
    }
  ];

  const shipments: Shipment[] = [
    {
      id: 'SH-001',
      orderId: 'PO-2025-001',
      supplier: 'Barloworld Equipment',
      carrier: 'Imperial Logistics',
      trackingNumber: 'IL-2025-78945',
      origin: 'Johannesburg',
      destination: 'Rustenburg Mining Complex',
      shipDate: '2025-08-01',
      expectedArrival: '2025-08-03',
      status: 'in_transit',
      items: 70,
      value: 485000
    },
    {
      id: 'SH-002',
      orderId: 'PO-2025-004',
      supplier: 'Bell Equipment',
      carrier: 'Bidvest Logistics',
      trackingNumber: 'BL-2025-56789',
      origin: 'Richards Bay',
      destination: 'Kimberley Diamond Mine',
      shipDate: '2025-07-30',
      expectedArrival: '2025-08-03',
      actualArrival: '2025-08-01',
      status: 'delivered',
      items: 24,
      value: 650000
    },
    {
      id: 'SH-003',
      orderId: 'PO-2025-002',
      supplier: 'African Mining Supplies',
      carrier: 'Dangerous Goods Transport',
      trackingNumber: 'DGT-2025-33214',
      origin: 'Cape Town',
      destination: 'Witbank Coal Mine',
      shipDate: '2025-08-02',
      expectedArrival: '2025-08-08',
      status: 'picked_up',
      items: 3,
      value: 285000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'in_stock': case 'delivered': case 'confirmed': case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low_stock': case 'pending': case 'in_transit': case 'sent': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'out_of_stock': case 'expired': case 'suspended': case 'cancelled': case 'delayed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'draft': case 'picked_up': case 'customs': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'blacklisted': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const pendingOrders = purchaseOrders.filter(o => o.status === 'sent' || o.status === 'confirmed').length;
  const lowStockItems = inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const inTransitShipments = shipments.filter(s => s.status === 'in_transit' || s.status === 'picked_up').length;
  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Suppliers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeSuppliers}</p>
            </div>
            <BuildingStorefrontIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {suppliers.length} total suppliers
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingOrders}</p>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">
            Awaiting delivery
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stock Alerts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{lowStockItems}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">
            Require restocking
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Transit</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{inTransitShipments}</p>
            </div>
            <TruckIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Shipments en route
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalInventoryValue, currentCurrency.code)}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Total stock value
          </p>
        </div>
      </div>

      {/* Critical Stock Alerts */}
      {lowStockItems > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Critical Stock Alerts</h3>
          <div className="space-y-4">
            {inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').map((item) => (
              <div key={item.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-800 dark:text-red-400">{item.itemName}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-red-600 dark:text-red-400">Current Stock</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{item.currentStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400">Minimum Required</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{item.minimumStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400">Location</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{item.location}</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400">Supplier</p>
                    <p className="font-bold text-red-800 dark:text-red-400">{item.supplier}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Suppliers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Suppliers by Value</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.sort((a, b) => b.totalValue - a.totalValue).slice(0, 6).map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{supplier.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(supplier.riskLevel)}`}>
                  {supplier.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Value</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(supplier.totalValue, currentCurrency.code)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Orders</span>
                  <span className="font-medium text-gray-900 dark:text-white">{supplier.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">On-Time Delivery</span>
                  <span className="font-medium text-green-600">{supplier.onTimeDelivery}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating</span>
                  <span className="font-medium text-yellow-600">⭐ {supplier.rating}/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Purchase Orders</h3>
        <div className="space-y-4">
          {purchaseOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{order.id}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                    {order.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Supplier</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.supplier}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Value</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(order.totalValue, currentCurrency.code)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Expected Delivery</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.expectedDelivery}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.deliveryLocation}</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Supply Chain Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive supplier, inventory, and procurement management for mining operations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${lowStockItems > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-medium ${lowStockItems > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {lowStockItems > 0 ? `${lowStockItems} Stock Alerts` : 'All Stock Levels Normal'}
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            New Order
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: ChartBarIcon },
            { key: 'suppliers', name: 'Suppliers', icon: BuildingStorefrontIcon },
            { key: 'orders', name: 'Purchase Orders', icon: ClipboardDocumentListIcon },
            { key: 'inventory', name: 'Inventory', icon: ClockIcon },
            { key: 'shipments', name: 'Shipments', icon: TruckIcon },
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
      {activeTab === 'suppliers' && (
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{supplier.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{supplier.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getRiskColor(supplier.riskLevel)}`}>
                    {supplier.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(supplier.status)}`}>
                    {supplier.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{supplier.category}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="text-sm font-bold text-yellow-600">⭐ {supplier.rating}/5</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{supplier.totalOrders}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(supplier.totalValue, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</p>
                  <p className="text-sm font-bold text-green-600">{supplier.onTimeDelivery}%</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quality Score</p>
                  <p className="text-sm font-bold text-blue-600">{supplier.qualityScore}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>👤 {supplier.contactPerson}</span>
                  <span>📞 {supplier.phone}</span>
                  <span>📧 {supplier.email}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    Contact
                  </button>
                  <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                    New Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {purchaseOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.id}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{order.supplier}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getPriorityColor(order.priority)}`}>
                    {order.priority.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order Date</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.orderDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expected Delivery</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.expectedDelivery}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(order.totalValue, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Approved By</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.approvedBy}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Location</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.deliveryLocation}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Invoice Status</p>
                  <p className={`text-sm font-bold ${
                    order.invoiceStatus === 'paid' ? 'text-green-600' :
                    order.invoiceStatus === 'received' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {order.invoiceStatus}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                  View Details
                </button>
                {order.status === 'draft' && (
                  <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                    Send Order
                  </button>
                )}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-yellow-800 dark:text-yellow-200 rounded text-sm">
                    Track Status
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {inventory.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.itemName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{item.currentStock} {item.unit}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Minimum Stock</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{item.minimumStock} {item.unit}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unit Cost</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(item.unitCost, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(item.totalValue, currentCurrency.code)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Supplier</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{item.supplier}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Restocked</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{item.lastRestocked}</p>
                </div>
              </div>

              {item.expiryDate && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Expiry Date:</strong> {item.expiryDate}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Category: {item.category}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    View History
                  </button>
                  {(item.status === 'low_stock' || item.status === 'out_of_stock') && (
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'shipments' && (
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{shipment.id}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{shipment.supplier}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                  {shipment.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Carrier</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{shipment.carrier}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tracking Number</p>
                  <p className="text-sm font-bold text-blue-600">{shipment.trackingNumber}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Origin</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{shipment.origin}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{shipment.destination}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expected Arrival</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{shipment.expectedArrival}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Value</p>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(shipment.value, currentCurrency.code)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Items: {shipment.items}</span>
                  <span>Order: {shipment.orderId}</span>
                  {shipment.actualArrival && <span>Delivered: {shipment.actualArrival}</span>}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded text-sm">
                    Track Package
                  </button>
                  {shipment.status === 'delivered' && (
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-800 dark:text-green-200 rounded text-sm">
                      Confirm Receipt
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supply Chain Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <BuildingStorefrontIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supplier Performance Report</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive supplier performance analysis including delivery times, quality scores, and cost analysis.
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ChartBarIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Inventory Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Inventory turnover, stock level trends, and optimization recommendations.
              </p>
              <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                View Analysis
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <TruckIcon className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Logistics Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Shipping performance, delivery tracking, and logistics cost analysis.
              </p>
              <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm">
                Logistics Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
