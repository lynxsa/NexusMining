import React from 'react';

interface SimpleCesiumGlobeProps {
  className?: string;
  onReady?: (viewer: unknown) => void;
}

export const CesiumGlobe: React.FC<SimpleCesiumGlobeProps> = ({ className }) => {
  return (
    <div className="relative w-full h-full">
      {/* Connection Status Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            System Online
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          4 Assets Tracked
        </div>
      </div>

      {/* Asset Status Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Asset Status</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Critical</span>
          </div>
        </div>
      </div>

      <div 
        className={`w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center ${className || ''}`}
        style={{ minHeight: '400px' }}
      >
        <div className="text-center text-white">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2h6v2H7V4zm0 4h6v2H7V8zm0 4h6v2H7v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">3D Mining Operations Map</h3>
            <p className="text-blue-200 mb-6">Real-time equipment tracking and site visualization</p>
          </div>
          
          {/* Mining Sites Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-yellow-300 font-medium">Gold Mine Alpha</div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-blue-200">2 Assets Active</div>
              <div className="text-xs text-blue-300">Depth: 850m</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-300 font-medium">Platinum Beta</div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-sm text-blue-200">1 Maintenance</div>
              <div className="text-xs text-blue-300">Depth: 1,200m</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600 font-medium">Coal Gamma</div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
              <div className="text-sm text-blue-200">1 Critical</div>
              <div className="text-xs text-blue-300">Surface Mine</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-cyan-300 font-medium">Diamond Delta</div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-blue-200">1 Asset Active</div>
              <div className="text-xs text-blue-300">Processing Plant</div>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-3">Equipment Status</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-green-400">Excavator XL-2000</div>
                <div className="text-blue-200">Operational • 45°C</div>
              </div>
              <div>
                <div className="text-yellow-400">Drill Rig DR-5000</div>
                <div className="text-blue-200">Maintenance • 72°C</div>
              </div>
              <div>
                <div className="text-red-400">Haul Truck HT-450</div>
                <div className="text-blue-200">Critical • 95°C</div>
              </div>
              <div>
                <div className="text-green-400">Conveyor CB-1200</div>
                <div className="text-blue-200">Operational • 38°C</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-blue-300">
            Click "3D" button above to enable full CesiumJS visualization
          </div>
        </div>
      </div>
    </div>
  );
};
