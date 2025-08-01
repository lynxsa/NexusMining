import React, { useState } from 'react';
import {
  BoltIcon,
  ChartBarIcon,
  BeakerIcon,
  SunIcon,
  TruckIcon,
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface EnergyMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  target: number;
  category: 'consumption' | 'generation' | 'efficiency' | 'emissions';
}

interface ESGGoal {
  id: string;
  title: string;
  description: string;
  category: 'environmental' | 'social' | 'governance';
  progress: number;
  target: string;
  deadline: string;
  status: 'on-track' | 'behind' | 'completed' | 'at-risk';
}

interface SustainabilityProject {
  id: string;
  name: string;
  type: 'renewable' | 'efficiency' | 'reduction' | 'restoration';
  status: 'active' | 'planned' | 'completed';
  investment: number;
  savings: number;
  co2Reduction: number;
  completion: number;
}

export const EnergyESGHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'environment' | 'social' | 'governance' | 'projects'>('overview');

  const energyMetrics: EnergyMetric[] = [
    {
      id: 'total-consumption',
      name: 'Total Energy Consumption',
      value: 2847,
      unit: 'MWh',
      trend: 'down',
      trendPercent: 12.5,
      target: 2500,
      category: 'consumption'
    },
    {
      id: 'renewable-energy',
      name: 'Renewable Energy',
      value: 34.2,
      unit: '%',
      trend: 'up',
      trendPercent: 8.3,
      target: 50,
      category: 'generation'
    },
    {
      id: 'energy-efficiency',
      name: 'Energy Efficiency',
      value: 78.5,
      unit: '%',
      trend: 'up',
      trendPercent: 5.2,
      target: 85,
      category: 'efficiency'
    },
    {
      id: 'carbon-emissions',
      name: 'Carbon Emissions',
      value: 1842,
      unit: 'tCO2e',
      trend: 'down',
      trendPercent: 15.7,
      target: 1500,
      category: 'emissions'
    }
  ];

  const esgGoals: ESGGoal[] = [
    {
      id: 'carbon-neutral',
      title: 'Carbon Neutral Operations',
      description: 'Achieve net-zero carbon emissions across all mining operations',
      category: 'environmental',
      progress: 34,
      target: '100% Carbon Neutral',
      deadline: '2030',
      status: 'on-track'
    },
    {
      id: 'renewable-energy-goal',
      title: 'Renewable Energy Transition',
      description: 'Transition to 80% renewable energy sources',
      category: 'environmental',
      progress: 42,
      target: '80% Renewable',
      deadline: '2028',
      status: 'on-track'
    },
    {
      id: 'community-investment',
      title: 'Community Investment Program',
      description: 'Invest 2% of annual revenue in local community development',
      category: 'social',
      progress: 67,
      target: '2% Revenue Investment',
      deadline: '2025',
      status: 'on-track'
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation Initiative',
      description: 'Reduce water consumption by 40% through recycling and efficiency',
      category: 'environmental',
      progress: 58,
      target: '40% Reduction',
      deadline: '2026',
      status: 'behind'
    },
    {
      id: 'safety-improvement',
      title: 'Zero Harm Safety Culture',
      description: 'Achieve zero workplace accidents and injuries',
      category: 'social',
      progress: 89,
      target: 'Zero Incidents',
      deadline: '2024',
      status: 'on-track'
    },
    {
      id: 'governance-transparency',
      title: 'ESG Reporting Framework',
      description: 'Implement comprehensive ESG reporting aligned with global standards',
      category: 'governance',
      progress: 73,
      target: 'Full Compliance',
      deadline: '2024',
      status: 'on-track'
    }
  ];

  const projects: SustainabilityProject[] = [
    {
      id: 'solar-farm',
      name: 'On-site Solar Farm',
      type: 'renewable',
      status: 'active',
      investment: 2500000,
      savings: 450000,
      co2Reduction: 1250,
      completion: 67
    },
    {
      id: 'led-upgrade',
      name: 'LED Lighting Upgrade',
      type: 'efficiency',
      status: 'completed',
      investment: 150000,
      savings: 85000,
      co2Reduction: 120,
      completion: 100
    },
    {
      id: 'electric-fleet',
      name: 'Electric Vehicle Fleet',
      type: 'reduction',
      status: 'planned',
      investment: 1800000,
      savings: 320000,
      co2Reduction: 890,
      completion: 0
    },
    {
      id: 'habitat-restoration',
      name: 'Wildlife Habitat Restoration',
      type: 'restoration',
      status: 'active',
      investment: 750000,
      savings: 0,
      co2Reduction: 450,
      completion: 42
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'behind': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'at-risk': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental': return <GlobeAltIcon className="w-5 h-5 text-green-600" />;
      case 'social': return <BuildingOffice2Icon className="w-5 h-5 text-blue-600" />;
      case 'governance': return <ChartBarIcon className="w-5 h-5 text-purple-600" />;
      default: return <BoltIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {energyMetrics.map((metric) => (
          <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{metric.unit}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-sm ${
                metric.trend === 'up' && metric.category === 'emissions' ? 'text-red-600' :
                metric.trend === 'up' ? 'text-green-600' :
                metric.trend === 'down' && metric.category === 'emissions' ? 'text-green-600' :
                'text-red-600'
              }`}>
                {metric.trendPercent > 0 ? '+' : ''}{metric.trendPercent}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Target: {metric.target} {metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ESG Goals Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ESG Goals Progress</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {esgGoals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(goal.category)}
                  <h4 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Target: {goal.target}</span>
                  <span>Due: {goal.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Projects */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sustainability Projects</h3>
        <div className="space-y-4">
          {projects.filter(p => p.status !== 'planned').map((project) => (
            <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.completion}%
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Investment</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(project.investment)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Annual Savings</p>
                  <p className="font-medium text-green-600">{formatCurrency(project.savings)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">CO₂ Reduction</p>
                  <p className="font-medium text-blue-600">{project.co2Reduction} tCO₂e</p>
                </div>
              </div>
              {project.status === 'active' && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEnvironmental = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environmental Metrics</h3>
        
        {/* Carbon Footprint */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Carbon Footprint Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TruckIcon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">Transportation</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">487</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">tCO₂e</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BoltIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-900 dark:text-white">Energy</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">892</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">tCO₂e</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BeakerIcon className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Operations</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">463</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">tCO₂e</span>
            </div>
          </div>
        </div>

        {/* Environmental Goals */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Environmental Goals</h4>
          <div className="space-y-3">
            {esgGoals.filter(g => g.category === 'environmental').map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{goal.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{goal.target} by {goal.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{goal.progress}%</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Energy & ESG Hub</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive sustainability metrics and environmental, social, and governance reporting
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <GlobeAltIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Carbon Neutral by 2030</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', name: 'Overview', icon: ChartBarIcon },
            { key: 'energy', name: 'Energy', icon: BoltIcon },
            { key: 'environment', name: 'Environment', icon: GlobeAltIcon },
            { key: 'social', name: 'Social', icon: BuildingOffice2Icon },
            { key: 'governance', name: 'Governance', icon: ExclamationTriangleIcon },
            { key: 'projects', name: 'Projects', icon: SunIcon }
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
      {activeTab === 'energy' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Detailed energy dashboard coming soon...</p>
        </div>
      )}
      {activeTab === 'environment' && renderEnvironmental()}
      {activeTab === 'social' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Impact</h3>
          <div className="space-y-4">
            {esgGoals.filter(g => g.category === 'social').map((goal) => (
              <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{goal.progress}%</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Due: {goal.deadline}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'governance' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Governance & Compliance</h3>
          <div className="space-y-4">
            {esgGoals.filter(g => g.category === 'governance').map((goal) => (
              <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{goal.progress}%</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Due: {goal.deadline}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    project.type === 'renewable' ? 'bg-green-100 text-green-800' :
                    project.type === 'efficiency' ? 'bg-blue-100 text-blue-800' :
                    project.type === 'reduction' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {project.type}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investment</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(project.investment)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(project.savings)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Reduction</p>
                  <p className="text-lg font-bold text-blue-600">{project.co2Reduction} tCO₂e</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{project.completion}%</p>
                </div>
              </div>

              {project.status !== 'completed' && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${project.completion}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
