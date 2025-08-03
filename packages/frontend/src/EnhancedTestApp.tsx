import React, { useState } from 'react';
import { AdvancedCesiumGlobe } from './components/cesium/AdvancedCesiumGlobe';
import { Advanced2DMap } from './components/maps/Advanced2DMap';
import FixedCesiumGlobe from './components/cesium/FixedCesiumGlobe';

const EnhancedTestApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'3d' | '2d' | 'fixed3d'>('fixed3d');

  return (
    <div className="h-screen w-full bg-slate-900 text-white">
      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6">
        <h1 className="text-xl font-bold text-blue-400">NexusMining - Enhanced Mapping System</h1>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setCurrentView('fixed3d')}
            className={`px-4 py-2 rounded ${
              currentView === 'fixed3d' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Fixed 3D Globe
          </button>
          <button
            onClick={() => setCurrentView('3d')}
            className={`px-4 py-2 rounded ${
              currentView === '3d' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Advanced 3D Globe
          </button>
          <button
            onClick={() => setCurrentView('2d')}
            className={`px-4 py-2 rounded ${
              currentView === '2d' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            2D Map View
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-4rem)] w-full">
        {currentView === 'fixed3d' ? (
          <div className="h-full w-full">
            <FixedCesiumGlobe
              onReady={(viewer) => {
                console.log('Fixed Cesium viewer ready:', viewer);
              }}
              className="h-full w-full"
            />
          </div>
        ) : currentView === '3d' ? (
          <div className="h-full w-full">
            <AdvancedCesiumGlobe
              onAssetClick={(asset) => {
                console.log('Asset clicked:', asset);
                alert(`Asset Selected: ${asset.name}\nType: ${asset.type}\nStatus: ${asset.status}`);
              }}
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="h-full w-full">
            <Advanced2DMap
              onAssetClick={(asset) => {
                console.log('Asset clicked:', asset);
                alert(`Asset Selected: ${asset.name}\nType: ${asset.type}\nStatus: ${asset.status}`);
              }}
              className="h-full w-full"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 bg-slate-800 bg-opacity-90 p-4 rounded-lg max-w-sm">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">Enhanced Features ✨</h3>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>✅ Fixed 3D Cesium Globe with error handling</li>
          <li>✅ Advanced 3D Cesium Globe with SA mining sites</li>
          <li>✅ Interactive 2D Canvas mapping with real-time trails</li>
          <li>✅ Advanced ThingsBoard integration with retry logic</li>
          <li>✅ Real-time telemetry streaming</li>
          <li>✅ Asset status monitoring</li>
          <li>✅ TypeScript safety enhancements</li>
          <li>✅ Performance optimizations with useCallback</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedTestApp;
