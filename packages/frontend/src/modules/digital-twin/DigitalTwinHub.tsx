import React, { useState } from 'react';
import { MiningMap } from '../../components/data-viz/MiningMap';
import { 
  PlayIcon, 
  StopIcon, 
  ArrowPathIcon,
  CubeIcon,
  BuildingLibraryIcon,
  MapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export const DigitalTwinHub: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState('assets');
  const [isSimulating, setIsSimulating] = useState(false);

  const layers = [
    { id: 'assets', name: 'Equipment', icon: CubeIcon, count: '247' },
    { id: 'infrastructure', name: 'Infrastructure', icon: BuildingLibraryIcon, count: '89' },
    { id: 'geology', name: 'Geology', icon: MapIcon, count: '15' },
    { id: 'safety', name: 'Safety Zones', icon: ShieldCheckIcon, count: '32' },
  ];

  const scenarios = [
    { id: 'evacuation', name: 'Emergency Evacuation', time: '8m 24s', success: '92%' },
    { id: 'blast', name: 'Blast Simulation', time: '2m 15s', success: '98%' },
    { id: 'layout', name: 'Equipment Layout', time: '15m 30s', success: '87%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Digital Twin Hub
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            3D mine visualization with real-time scenario simulation
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isSimulating 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSimulating ? (
              <>
                <StopIcon className="h-4 w-4" />
                <span>Stop Simulation</span>
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4" />
                <span>Start Simulation</span>
              </>
            )}
          </button>
          
          <button className="btn-secondary">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Sync Twin
          </button>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          View Layers
        </h3>
        <div className="flex flex-wrap gap-3">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeLayer === layer.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{layer.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeLayer === layer.id 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {layer.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Viewer - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <MiningMap className="h-[600px]" />
          
          {/* Simulation Status */}
          {isSimulating && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  Emergency evacuation simulation in progress...
                </span>
              </div>
              <div className="mt-2 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Scenario Simulator */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Scenario Simulator
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Scenario
                </label>
                <select className="input-field">
                  <option>Emergency Evacuation</option>
                  <option>Blast Outcome Simulation</option>
                  <option>Equipment Layout Optimization</option>
                  <option>Geological Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Worker Density
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="75"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Type
                </label>
                <select className="input-field">
                  <option>Fire</option>
                  <option>Gas Leak</option>
                  <option>Equipment Failure</option>
                  <option>Structural Collapse</option>
                </select>
              </div>

              <button 
                className="btn-primary w-full"
                onClick={() => setIsSimulating(true)}
                disabled={isSimulating}
              >
                {isSimulating ? 'Simulation Running...' : 'Run Simulation'}
              </button>
            </div>
          </div>

          {/* Previous Results */}
          <div className="card p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Simulations
            </h4>
            
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                      {scenario.name}
                    </h5>
                    <span className={`text-xs px-2 py-1 rounded ${
                      parseInt(scenario.success) >= 90 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {scenario.success}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Duration: {scenario.time}</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
              View All Results →
            </button>
          </div>

          {/* Live Stats */}
          <div className="card p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Live Twin Stats
            </h4>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Sync:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2 min ago</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Data Points:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">1.2M</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy:</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">99.7%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Sensors:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2,847</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
