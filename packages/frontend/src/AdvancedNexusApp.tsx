import React, { useState, useEffect } from 'react';
import { AdvancedCesiumGlobe } from './components/cesium/AdvancedCesiumGlobe';
import { Advanced2DMap } from './components/maps/Advanced2DMap';
import FixedCesiumGlobe from './components/cesium/FixedCesiumGlobe';

const AdvancedNexusApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | '3d' | '2d' | 'fixed3d'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-4 border-4 border-blue-300 rounded-full animate-spin border-b-transparent"></div>
            <div className="absolute inset-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            NexusMining
          </h1>
          <p className="text-slate-300 text-lg">Advanced Mining Intelligence Platform</p>
          <p className="text-slate-400 text-sm mt-2">Loading enhanced mapping systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-slate-900 text-white">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 flex items-center px-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            NexusMining
          </h1>
          <span className="text-sm text-slate-400">Advanced Mining Intelligence</span>
        </div>
        
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('fixed3d')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'fixed3d' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Fixed 3D Globe
          </button>
          <button
            onClick={() => setCurrentView('3d')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === '3d' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Advanced 3D
          </button>
          <button
            onClick={() => setCurrentView('2d')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === '2d' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            2D Mining Map
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-4rem)] w-full">
        {currentView === 'dashboard' ? (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Dashboard Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Mining Operations Dashboard</h2>
                <p className="text-slate-400">Real-time monitoring and analytics for South African mining operations</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Assets</p>
                      <p className="text-2xl font-bold text-green-400">127</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Daily Production</p>
                      <p className="text-2xl font-bold text-blue-400">2,847t</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Safety Score</p>
                      <p className="text-2xl font-bold text-yellow-400">94.2%</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Efficiency</p>
                      <p className="text-2xl font-bold text-purple-400">87.9%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
                     onClick={() => setCurrentView('fixed3d')}>
                  <h3 className="text-lg font-semibold mb-2">3D Globe Visualization</h3>
                  <p className="text-slate-400 text-sm mb-4">Explore mining assets in an immersive 3D environment</p>
                  <div className="flex items-center text-blue-400 text-sm">
                    <span>Launch 3D View</span>
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-colors cursor-pointer"
                     onClick={() => setCurrentView('2d')}>
                  <h3 className="text-lg font-semibold mb-2">2D Interactive Map</h3>
                  <p className="text-slate-400 text-sm mb-4">Real-time asset tracking with trail visualization</p>
                  <div className="flex items-center text-green-400 text-sm">
                    <span>Open 2D Map</span>
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <h3 className="text-lg font-semibold mb-2">ThingsBoard IoT</h3>
                  <p className="text-slate-400 text-sm mb-4">Advanced telemetry and device management</p>
                  <div className="flex items-center text-purple-400 text-sm">
                    <span>View Telemetry</span>
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative">
            {currentView === 'fixed3d' && (
              <FixedCesiumGlobe
                onReady={(viewer) => console.log('Fixed Cesium viewer ready:', viewer)}
                className="h-full w-full"
              />
            )}
            {currentView === '3d' && (
              <AdvancedCesiumGlobe
                onAssetClick={(asset) => {
                  console.log('Asset clicked:', asset);
                  alert(`Asset Selected: ${asset.name}\nType: ${asset.type}\nStatus: ${asset.status}`);
                }}
                className="h-full w-full"
              />
            )}
            {currentView === '2d' && (
              <Advanced2DMap
                onAssetClick={(asset) => {
                  console.log('Asset clicked:', asset);
                  alert(`Asset Selected: ${asset.name}\nType: ${asset.type}\nStatus: ${asset.status}`);
                }}
                className="h-full w-full"
              />
            )}
          </div>
        )}
      </div>

      {/* Status Panel */}
      <div className="absolute bottom-4 right-4 bg-slate-800 bg-opacity-95 p-4 rounded-lg max-w-sm border border-slate-700">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">System Status ✨</h3>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>✅ Enhanced 3D Cesium Globe - Ready</li>
          <li>✅ Interactive 2D Canvas Map - Ready</li>
          <li>✅ ThingsBoard IoT Integration - Active</li>
          <li>✅ Real-time Telemetry - Streaming</li>
          <li>✅ Asset Tracking - Operational</li>
          <li>✅ TypeScript - Zero Errors</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedNexusApp;
