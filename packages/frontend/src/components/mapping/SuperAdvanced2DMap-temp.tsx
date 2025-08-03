import { useState, useEffect } from 'react';

// Define interfaces to match the original component
interface EnhancedMiningAsset {
  id: string;
  name: string;
  type: 'truck' | 'excavator' | 'drill' | 'conveyor' | 'processing' | 'crusher' | 'loader' | 'dozer';
  latitude: number;
  longitude: number;
  altitude: number;
  status: 'operational' | 'maintenance' | 'critical' | 'offline' | 'standby' | 'emergency';
  telemetry: Record<string, unknown>;
  zone?: string;
  operator?: string;
  shift?: 'day' | 'night';
  priority: 'low' | 'medium' | 'high' | 'critical';
  ai_insights?: {
    efficiency_score: number;
    predictive_maintenance: string;
    optimization_suggestions: string[];
  };
  safety_zone?: {
    radius: number;
    alert_level: 'safe' | 'caution' | 'danger';
    restricted_access: boolean;
  };
}

interface SuperAdvanced2DMapProps {
  assets: EnhancedMiningAsset[];
  onAssetClick: (asset: EnhancedMiningAsset | null) => void;
  enableRouteOptimization: boolean;
  enableSafetyZones: boolean;
  enableWeatherOverlay?: boolean;
  viewMode: string;
  zoomLevel: string;
}

// Temporary 2D Map component without react-leaflet dependency
export default function SuperAdvanced2DMap(props: SuperAdvanced2DMapProps) {
  const [mapData, setMapData] = useState({
    miningAssets: props.assets.length > 0 ? props.assets : [
      { 
        id: '1', 
        name: 'Haul Truck Alpha-1', 
        type: 'truck' as const, 
        latitude: -25.746, 
        longitude: 28.188, 
        altitude: 1550,
        status: 'operational' as const, 
        telemetry: { efficiency: 92, lastMaintenance: '2025-01-15', nextMaintenance: '2025-03-15' },
        zone: 'Zone A',
        operator: 'John Doe',
        shift: 'day' as const,
        priority: 'medium' as const,
        ai_insights: {
          efficiency_score: 92,
          predictive_maintenance: 'Good condition',
          optimization_suggestions: ['Route optimization available']
        },
        safety_zone: {
          radius: 50,
          alert_level: 'safe' as const,
          restricted_access: false
        }
      },
      { 
        id: '2', 
        name: 'Excavator Beta-2', 
        type: 'excavator' as const, 
        latitude: -25.748, 
        longitude: 28.190, 
        altitude: 1545,
        status: 'maintenance' as const, 
        telemetry: { efficiency: 87, lastMaintenance: '2025-01-10', nextMaintenance: '2025-02-10' },
        zone: 'Zone B',
        operator: 'Jane Smith',
        shift: 'day' as const,
        priority: 'high' as const,
        ai_insights: {
          efficiency_score: 87,
          predictive_maintenance: 'Maintenance required',
          optimization_suggestions: ['Schedule maintenance window']
        },
        safety_zone: {
          radius: 75,
          alert_level: 'caution' as const,
          restricted_access: true
        }
      },
      { 
        id: '3', 
        name: 'Drill Gamma-3', 
        type: 'drill' as const, 
        latitude: -25.744, 
        longitude: 28.185, 
        altitude: 1552,
        status: 'operational' as const, 
        telemetry: { efficiency: 94, lastMaintenance: '2025-01-20', nextMaintenance: '2025-03-20' },
        zone: 'Zone C',
        operator: 'Mike Johnson',
        shift: 'night' as const,
        priority: 'low' as const,
        ai_insights: {
          efficiency_score: 94,
          predictive_maintenance: 'Excellent condition',
          optimization_suggestions: ['Operating at peak efficiency']
        },
        safety_zone: {
          radius: 60,
          alert_level: 'safe' as const,
          restricted_access: false
        }
      }
    ] as EnhancedMiningAsset[],
    routes: [] as Array<{id: string; path: [number, number][]; type: string}>,
    alerts: [
      { id: 1, type: 'warning', message: 'High dust levels detected in Sector 7' }
    ] as Array<{id: number; type: string; message: string}>
  });

  useEffect(() => {
    // Use provided assets if available
    if (props.assets.length > 0) {
      setMapData(prev => ({ ...prev, miningAssets: props.assets }));
    }
  }, [props.assets]);

  return (
    <div className="h-full w-full bg-slate-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-4 border-b border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">🗺️ Mining Operations Map</h2>
            <p className="text-sm text-slate-300">Real-time asset tracking and route optimization</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              📡 Live Tracking
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              🛰️ GPS Active
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-full bg-gradient-to-br from-green-900/20 to-blue-900/20">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/10 via-yellow-700/10 to-brown-800/10">
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Terrain patterns */}
              <defs>
                <pattern id="terrain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#4ade80" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#terrain)"/>
              
              {/* Mining roads */}
              <path d="M50 100 Q200 80 350 120" stroke="#6b7280" strokeWidth="3" fill="none" opacity="0.6"/>
              <path d="M80 150 Q250 130 380 170" stroke="#6b7280" strokeWidth="2" fill="none" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Asset Markers */}
        <div className="absolute inset-0 p-8">
          {mapData.miningAssets.map((asset, index) => (
            <div
              key={asset.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
              style={{
                left: `${30 + index * 25}%`,
                top: `${40 + index * 15}%`,
              }}
              onClick={() => props.onAssetClick(asset)}
            >
              {/* Asset Marker */}
              <div className={`relative p-3 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 ${
                asset.status === 'operational' 
                  ? 'bg-green-500/80 border-2 border-green-300' 
                  : 'bg-yellow-500/80 border-2 border-yellow-300'
              }`}>
                <div className="text-white text-lg">
                  {asset.name.includes('Truck') ? '🚛' : asset.name.includes('Excavator') ? '⛏️' : '🔧'}
                </div>
                
                {/* Pulse Animation */}
                <div className={`absolute inset-0 rounded-full animate-ping ${
                  asset.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
                } opacity-30`}></div>
              </div>

              {/* Asset Details Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-slate-800/95 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-slate-600 min-w-48">
                  <h4 className="font-semibold text-blue-300">{asset.name}</h4>
                  <div className="space-y-1 text-sm mt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Status:</span>
                      <span className={asset.status === 'operational' ? 'text-green-400' : 'text-yellow-400'}>
                        {asset.status === 'operational' ? '✅ Operational' : '⚠️ Maintenance'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Efficiency:</span>
                      <span className="text-blue-400">{(asset.telemetry as {efficiency?: number})?.efficiency || asset.ai_insights?.efficiency_score || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Coordinates:</span>
                      <span className="text-gray-400">{asset.latitude}, {asset.longitude}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend and Controls */}
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
          <h3 className="text-white font-semibold mb-3">🎯 Asset Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400">Operational Equipment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400">Maintenance Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-400">Critical Alert</span>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
          <h3 className="text-white font-semibold mb-3">📊 Live Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Active Assets:</span>
              <span className="text-blue-400">{mapData.miningAssets.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Operational:</span>
              <span className="text-green-400">
                {mapData.miningAssets.filter(a => a.status === 'operational').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Maintenance:</span>
              <span className="text-yellow-400">
                {mapData.miningAssets.filter(a => a.status === 'maintenance').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Avg Efficiency:</span>
              <span className="text-blue-400">
                {Math.round(mapData.miningAssets.reduce((acc, a) => acc + ((a.telemetry as {efficiency?: number})?.efficiency || a.ai_insights?.efficiency_score || 0), 0) / mapData.miningAssets.length)}%
              </span>
            </div>
          </div>
        </div>

        {/* Loading Indicator for Full Map */}
        <div className="absolute bottom-4 right-4 bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Loading full interactive map...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
