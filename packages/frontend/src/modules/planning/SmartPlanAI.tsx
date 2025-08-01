import React, { useState } from 'react';
import {
  TruckIcon,
  ChartBarIcon,
  CpuChipIcon,
  ArrowPathIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface Route {
  id: string;
  name: string;
  distance: number;
  estimatedTime: number;
  fuelConsumption: number;
  load: number;
  efficiency: number;
  status: 'active' | 'optimizing' | 'completed';
  trucks: number;
}

interface BlastPlan {
  id: string;
  name: string;
  location: string;
  plannedDate: string;
  explosiveType: string;
  volume: number;
  safety: number;
  status: 'planned' | 'approved' | 'executed';
  cost: number;
}

export const SmartPlanAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'blasting' | 'optimization'>('overview');

  const routes: Route[] = [
    {
      id: 'RT001',
      name: 'Pit A to Processing Plant',
      distance: 2.8,
      estimatedTime: 12,
      fuelConsumption: 45,
      load: 220,
      efficiency: 94,
      status: 'active',
      trucks: 8
    },
    {
      id: 'RT002',
      name: 'Pit B to Waste Dump',
      distance: 4.2,
      estimatedTime: 18,
      fuelConsumption: 65,
      load: 180,
      efficiency: 87,
      status: 'optimizing',
      trucks: 6
    },
    {
      id: 'RT003',
      name: 'Processing Plant to Port',
      distance: 12.5,
      estimatedTime: 35,
      fuelConsumption: 120,
      load: 150,
      efficiency: 91,
      status: 'active',
      trucks: 4
    }
  ];

  const blastPlans: BlastPlan[] = [
    {
      id: 'BP001',
      name: 'Blast Zone Alpha-7',
      location: 'Witbank Pit A - Level 3',
      plannedDate: '2025-08-15',
      explosiveType: 'ANFO Mix',
      volume: 25000,
      safety: 98,
      status: 'planned',
      cost: 1250000
    },
    {
      id: 'BP002',
      name: 'Blast Zone Beta-3',
      location: 'Rustenburg Pit B - Level 2',
      plannedDate: '2025-08-08',
      explosiveType: 'Emulsion',
      volume: 18500,
      safety: 96,
      status: 'approved',
      cost: 890000
    },
    {
      id: 'BP003',
      name: 'Blast Zone Gamma-1',
      location: 'Kimberley Open Pit',
      plannedDate: '2025-07-28',
      explosiveType: 'ANFO Mix',
      volume: 32000,
      safety: 99,
      status: 'executed',
      cost: 1580000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'optimizing': case 'planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': case 'executed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('ZAR', 'R');
  };

  const totalRoutes = routes.length;
  const activeRoutes = routes.filter(r => r.status === 'active').length;
  const avgEfficiency = (routes.reduce((sum, route) => sum + route.efficiency, 0) / totalRoutes).toFixed(1);
  const totalTrucks = routes.reduce((sum, route) => sum + route.trucks, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Routes</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeRoutes}</p>
            </div>
            <ArrowPathIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {totalRoutes} total routes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Fleet Efficiency</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgEfficiency}%</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+3.2% from last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Trucks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalTrucks}</p>
            </div>
            <TruckIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Across all routes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Optimizations</p>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <CpuChipIcon className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This week
          </p>
        </div>
      </div>

      {/* Active Routes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Haul Routes</h3>
        <div className="space-y-4">
          {routes.filter(r => r.status === 'active').map((route) => (
            <div key={route.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{route.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Distance</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.distance} km</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Avg Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.estimatedTime} min</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Efficiency</p>
                  <p className={`font-medium ${route.efficiency > 90 ? 'text-green-600' : route.efficiency > 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {route.efficiency}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Trucks</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.trucks}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Blasts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Blast Plans</h3>
        <div className="space-y-4">
          {blastPlans.filter(b => b.status !== 'executed').map((blast) => (
            <div key={blast.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{blast.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blast.status)}`}>
                  {blast.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{blast.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Planned Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{blast.plannedDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Volume</p>
                  <p className="font-medium text-gray-900 dark:text-white">{blast.volume.toLocaleString()} m³</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Safety Score</p>
                  <p className={`font-medium ${blast.safety > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {blast.safety}%
                  </p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SmartPlan AI</h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-driven planning & optimization for haul routes and blast planning
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CpuChipIcon className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">AI Engine Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: ChartBarIcon },
            { key: 'routes', name: 'Haul Routes', icon: ArrowPathIcon },
            { key: 'blasting', name: 'Blast Plans', icon: BeakerIcon },
            { key: 'optimization', name: 'AI Optimization', icon: CpuChipIcon }
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
      {activeTab === 'routes' && (
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{route.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.distance} km</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.estimatedTime} min</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Usage</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.fuelConsumption}L</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Load Capacity</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.load}t</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
                  <p className={`text-lg font-bold ${route.efficiency > 90 ? 'text-green-600' : route.efficiency > 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {route.efficiency}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Trucks</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.trucks}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'blasting' && (
        <div className="space-y-4">
          {blastPlans.map((blast) => (
            <div key={blast.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blast.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{blast.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(blast.status)}`}>
                  {blast.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Planned Date</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{blast.plannedDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explosive Type</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{blast.explosiveType}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Volume</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{blast.volume.toLocaleString()} m³</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Safety Score</p>
                  <p className={`text-lg font-bold ${blast.safety > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {blast.safety}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(blast.cost)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'optimization' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Optimization Insights</h3>
          <div className="space-y-4">
            <div className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BoltIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-200">Route Optimization Recommendation</span>
              </div>
              <p className="text-blue-800 dark:text-blue-300">
                AI suggests rerouting 3 trucks from Route RT002 to RT001 for 12% efficiency improvement.
              </p>
            </div>
            <div className="border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900 dark:text-green-200">Fuel Optimization Success</span>
              </div>
              <p className="text-green-800 dark:text-green-300">
                Last week's AI recommendations reduced fuel consumption by 8.5%, saving R45,000.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-900 dark:text-yellow-200">Blast Timing Alert</span>
              </div>
              <p className="text-yellow-800 dark:text-yellow-300">
                Weather conditions may affect Blast Zone Alpha-7. Consider delaying by 2 days for optimal results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
