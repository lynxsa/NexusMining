import React, { useState } from 'react';

interface MiningMapProps {
  className?: string;
}

export const MiningMap: React.FC<MiningMapProps> = ({ className = "h-full" }) => {
  const [view3D, setView3D] = useState(true);

  return (
    <div className={`card p-0 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mine Site Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time equipment and asset locations
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView3D(!view3D)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              view3D 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setView3D(!view3D)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              !view3D 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            2D
          </button>
        </div>
      </div>
      
      <div className="relative h-96 lg:h-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        {/* Interactive Mining Site Map */}
        <div className="absolute inset-0">
          {/* Mine Site Background Areas */}
          <div className="absolute top-10 left-10 w-32 h-24 rounded-full bg-amber-200/40 dark:bg-amber-900/20 border-2 border-amber-300/60 dark:border-amber-700/40">
            <div className="absolute top-2 left-2 text-xs font-medium text-amber-800 dark:text-amber-200">
              Pit A
            </div>
          </div>
          <div className="absolute bottom-16 right-20 w-28 h-20 rounded-full bg-amber-200/40 dark:bg-amber-900/20 border-2 border-amber-300/60 dark:border-amber-700/40">
            <div className="absolute top-2 left-2 text-xs font-medium text-amber-800 dark:text-amber-200">
              Pit B
            </div>
          </div>
          
          {/* Processing Plant */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-16 bg-gray-300/60 dark:bg-gray-600/60 rounded border-2 border-gray-400/60 dark:border-gray-500/60">
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300">
              Processing Plant
            </div>
          </div>

          {/* Mining Assets */}
          <div className="absolute top-[60%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg group-hover:scale-110 transition-transform">
                🚛
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Haul Truck HT-247</div>
              <div className="text-gray-300">Operational</div>
            </div>
          </div>

          <div className="absolute top-[40%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg group-hover:scale-110 transition-transform">
                ⚙️
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Excavator EX-112</div>
              <div className="text-gray-300">Maintenance</div>
            </div>
          </div>

          <div className="absolute top-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg group-hover:scale-110 transition-transform">
                🏗️
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Conveyor CB-1200</div>
              <div className="text-gray-300">Operational</div>
            </div>
          </div>

          <div className="absolute top-[70%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg group-hover:scale-110 transition-transform">
                ⚙️
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Drill Rig DR-89</div>
              <div className="text-gray-300">Critical</div>
            </div>
          </div>

          <div className="absolute top-[80%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg group-hover:scale-110 transition-transform">
                🚛
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Loader LD-556</div>
              <div className="text-gray-300">Operational</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Asset Status</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Critical</span>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-xs font-medium text-gray-900 dark:text-white">Live Tracking</div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active:</span>
              <span className="font-medium text-green-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Maintenance:</span>
              <span className="font-medium text-yellow-600">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Critical:</span>
              <span className="font-medium text-red-600">1</span>
            </div>
          </div>
        </div>

        {/* View Mode Indicator */}
        <div className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {view3D ? '3D View Active' : '2D View Active'}
          </span>
        </div>
      </div>
    </div>
  );
};
