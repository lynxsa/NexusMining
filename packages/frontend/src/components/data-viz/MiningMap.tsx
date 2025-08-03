import React, { useState } from 'react';
import { AdvancedCesiumGlobe } from '../cesium/AdvancedCesiumGlobe';
import { Advanced2DMap } from '../maps/Advanced2DMap';

interface MiningAsset {
  id: string;
  name: string;
  type: string;
  status: string;
  telemetry?: Record<string, string | number>;
}

interface MiningMapProps {
  className?: string;
}

export const MiningMap: React.FC<MiningMapProps> = ({ className = "h-full" }) => {
  const [view3D, setView3D] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<MiningAsset | null>(null);

  const handleAssetClick = (asset: MiningAsset) => {
    setSelectedAsset(asset);
    console.log('Asset selected:', asset);
  };

  return (
    <div className={`card p-0 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Advanced Mining Operations Map
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time equipment tracking with IoT integration
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setView3D(true)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view3D 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🌍 3D Globe
            </button>
            <button
              onClick={() => setView3D(false)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                !view3D 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🗺️ 2D Map
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative h-96 lg:h-full">
        {view3D ? (
          <div className="h-full relative">
            <AdvancedCesiumGlobe 
              onAssetClick={handleAssetClick}
              className="h-full"
            />
            {selectedAsset && (
              <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedAsset.name}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`font-medium ${
                      selectedAsset.status === 'operational' ? 'text-green-600' :
                      selectedAsset.status === 'maintenance' ? 'text-yellow-600' :
                      selectedAsset.status === 'critical' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedAsset.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {selectedAsset.type}
                    </span>
                  </div>
                  {selectedAsset.telemetry && (
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Live Telemetry:</div>
                      {Object.entries(selectedAsset.telemetry).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                          <span className="text-gray-900 dark:text-white">
                            {typeof value === 'number' ? value.toFixed(1) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Advanced2DMap 
            onAssetClick={handleAssetClick}
            className="h-full"
          />
        )}
      </div>

      {/* Feature Status Bar */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">Live Tracking</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">IoT Integration</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">3D Visualization</span>
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {view3D ? 'Cesium 3D Globe Active' : '2D Canvas Rendering Active'}
          </div>
        </div>
      </div>
    </div>
  );
};