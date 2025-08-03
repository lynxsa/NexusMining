import React, { useState, useEffect, useMemo } from 'react';
import { SuperAdvancedCesiumGlobe } from './components/cesium/SuperAdvancedCesiumGlobe';
import SuperAdvanced2DMap from './components/mapping/SuperAdvanced2DMap-temp';

// Enhanced Mining Asset Interface
interface EnhancedMiningAsset {
  id: string;
  name: string;
  type: 'truck' | 'excavator' | 'drill' | 'conveyor' | 'processing' | 'crusher' | 'loader' | 'dozer';
  latitude: number;
  longitude: number;
  altitude: number;
  status: 'operational' | 'maintenance' | 'critical' | 'offline' | 'standby' | 'emergency';
  telemetry: {
    speed?: number;
    fuel?: number;
    temperature?: number;
    vibration?: number;
    productivity?: number;
    powerConsumption?: number;
    operatingHours?: number;
    lastMaintenance?: string;
  };
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

// Real-time KPI Data Interface
interface KPIData {
  label: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  status: 'good' | 'warning' | 'critical';
  icon: string;
}

// Real-time KPI Data Interface
interface RealTimeData {
  timestamp: string;
  productionRate: number;
  efficiency: number;
  energyConsumption: number;
  safetyScore: number;
  activeEquipment: number;
  maintenanceDue: number;
  environmentalImpact: number;
  costPerTon: number;
}

const UltraAdvancedNexusApp: React.FC = () => {
  console.log('🏭 UltraAdvancedNexusApp component starting...');
  
  const [currentView, setCurrentView] = useState<'dashboard' | '3d' | '2d' | 'analytics' | 'assets' | 'safety'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<EnhancedMiningAsset | null>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    timestamp: new Date().toISOString(),
    productionRate: 2847,
    efficiency: 89,
    energyConsumption: 945,
    safetyScore: 97,
    activeEquipment: 156,
    maintenanceDue: 23,
    environmentalImpact: 78,
    costPerTon: 45.32
  });
  const [alertsCount] = useState({ critical: 3, warning: 12, info: 8 });

  // Simulated real-time data updates
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        productionRate: Math.floor(Math.random() * 1000) + 2500,
        efficiency: Math.floor(Math.random() * 15) + 85,
        energyConsumption: Math.floor(Math.random() * 200) + 800,
        safetyScore: Math.floor(Math.random() * 5) + 95,
        timestamp: new Date().toLocaleTimeString()
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sample KPI data
  const kpiData: KPIData[] = useMemo(() => [
    {
      label: 'Production Rate',
      value: realTimeData.productionRate || 2847,
      unit: 'tons/hr',
      trend: 'up',
      change: '+12.5%',
      status: 'good',
      icon: '⛏️'
    },
    {
      label: 'Operational Efficiency',
      value: realTimeData.efficiency || 89,
      unit: '%',
      trend: 'up',
      change: '+3.2%',
      status: 'good',
      icon: '📊'
    },
    {
      label: 'Energy Consumption',
      value: realTimeData.energyConsumption || 945,
      unit: 'kWh',
      trend: 'down',
      change: '-5.8%',
      status: 'good',
      icon: '⚡'
    },
    {
      label: 'Safety Score',
      value: realTimeData.safetyScore || 97,
      unit: '%',
      trend: 'stable',
      change: '0.0%',
      status: 'good',
      icon: '🛡️'
    },
    {
      label: 'Active Equipment',
      value: 156,
      unit: 'units',
      trend: 'up',
      change: '+2',
      status: 'good',
      icon: '🚛'
    },
    {
      label: 'Maintenance Due',
      value: 23,
      unit: 'items',
      trend: 'down',
      change: '-5',
      status: 'warning',
      icon: '🔧'
    },
    {
      label: 'Environmental Impact',
      value: 78,
      unit: '%',
      trend: 'up',
      change: '+1.2%',
      status: 'good',
      icon: '🌱'
    },
    {
      label: 'Cost per Ton',
      value: 45.32,
      unit: 'USD',
      trend: 'down',
      change: '-2.1%',
      status: 'good',
      icon: '💰'
    }
  ], [realTimeData]);

  // Sample mining assets
  const miningAssets: EnhancedMiningAsset[] = [
    {
      id: 'truck-001',
      name: 'Haul Truck Alpha-1',
      type: 'truck',
      latitude: -26.2041,
      longitude: 28.0473,
      altitude: 1753,
      status: 'operational',
      telemetry: {
        speed: 35,
        fuel: 78,
        temperature: 85,
        vibration: 2.3,
        productivity: 92,
        powerConsumption: 450,
        operatingHours: 8.5,
        lastMaintenance: '2025-01-15'
      },
      zone: 'Pit-A',
      operator: 'John Maverick',
      shift: 'day',
      priority: 'high',
      ai_insights: {
        efficiency_score: 89,
        predictive_maintenance: 'Oil change recommended in 15 hours',
        optimization_suggestions: ['Optimize route to reduce fuel consumption', 'Schedule maintenance window']
      }
    },
    {
      id: 'excavator-002',
      name: 'Excavator Beta-2',
      type: 'excavator',
      latitude: -26.2055,
      longitude: 28.0461,
      altitude: 1745,
      status: 'operational',
      telemetry: {
        speed: 0,
        fuel: 65,
        temperature: 92,
        vibration: 3.1,
        productivity: 87,
        powerConsumption: 380,
        operatingHours: 12.2,
        lastMaintenance: '2025-01-10'
      },
      zone: 'Pit-A',
      operator: 'Sarah Chen',
      shift: 'day',
      priority: 'critical',
      ai_insights: {
        efficiency_score: 84,
        predictive_maintenance: 'Hydraulic system check needed',
        optimization_suggestions: ['Reduce idle time', 'Calibrate boom controls']
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-4 border-4 border-cyan-400 rounded-full animate-spin border-b-transparent animation-delay-150"></div>
            <div className="absolute inset-8 border-4 border-green-400 rounded-full animate-spin border-l-transparent animation-delay-300"></div>
            <div className="absolute inset-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏭</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            🏭 Nexus Mining
          </h1>
          <p className="text-slate-300 text-xl mb-2">Advanced Mining Intelligence Platform</p>
          <p className="text-slate-400 text-sm">Loading AssetTrack AI • HazardVision • Digital Twin • SmartOps...</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-150"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce animation-delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Real-time Alerts */}
      <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-red-400">🚨 Active Alerts</h3>
          <div className="flex space-x-4 text-sm">
            <span className="text-red-400">{alertsCount.critical} Critical</span>
            <span className="text-yellow-400">{alertsCount.warning} Warning</span>
            <span className="text-blue-400">{alertsCount.info} Info</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-900/30 p-3 rounded border border-red-500/50">
            <p className="text-red-300 font-medium">Excavator Beta-2: High vibration detected</p>
            <p className="text-red-400 text-xs">Zone: Pit-A • 2 min ago</p>
          </div>
          <div className="bg-yellow-900/30 p-3 rounded border border-yellow-500/50">
            <p className="text-yellow-300 font-medium">Haul Truck Alpha-1: Maintenance due soon</p>
            <p className="text-yellow-400 text-xs">Zone: Pit-A • 15 min ago</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded border border-blue-500/50">
            <p className="text-blue-300 font-medium">Weather alert: High winds expected</p>
            <p className="text-blue-400 text-xs">All zones • 1 hr ago</p>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                kpi.trend === 'up' ? 'bg-green-900/50 text-green-400' :
                kpi.trend === 'down' ? 'bg-red-900/50 text-red-400' :
                'bg-gray-900/50 text-gray-400'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-slate-300 text-sm font-medium mb-1">{kpi.label}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              {kpi.unit && <span className="text-slate-400 text-sm">{kpi.unit}</span>}
            </div>
            <div className={`w-full h-2 rounded-full mt-2 ${
              kpi.status === 'good' ? 'bg-green-900' :
              kpi.status === 'warning' ? 'bg-yellow-900' :
              'bg-red-900'
            }`}>
              <div className={`h-full rounded-full ${
                kpi.status === 'good' ? 'bg-green-500' :
                kpi.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} style={{ width: `${Math.min(100, Number(kpi.value))}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">🚛 Equipment Status</h3>
          <div className="space-y-4">
            {miningAssets.map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
                   onClick={() => setSelectedAsset(asset)}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    asset.status === 'operational' ? 'bg-green-500' :
                    asset.status === 'maintenance' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-white">{asset.name}</p>
                    <p className="text-sm text-slate-400">{asset.operator} • {asset.zone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-400">{asset.telemetry.productivity}% efficiency</p>
                  <p className="text-xs text-slate-400">{asset.telemetry.operatingHours}h runtime</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-400">📊 Production Analytics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/30">
              <h4 className="font-medium text-blue-300 mb-2">Today's Production</h4>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">24,567 tons</span>
                <span className="text-green-400 text-sm">+8.2% vs target</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-300 mb-2">Energy Efficiency</h4>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">92.4%</span>
                <span className="text-green-400 text-sm">Best this month</span>
              </div>
              <div className="w-full bg-green-900/50 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
              <h4 className="font-medium text-purple-300 mb-2">AI Optimization</h4>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">15.3%</span>
                <span className="text-purple-400 text-sm">Cost reduction</span>
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-2 mt-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cyan-400">📡 Real-time Data Feed</h3>
          <span className="text-xs text-slate-400">Last update: {realTimeData.timestamp || 'Loading...'}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">ThingsBoard IoT Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Connected • 156 devices</span>
            </div>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">ThibaAlert Mobile</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-sm">Active • 23 field reports</span>
            </div>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">HazardVision AI</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm">Monitoring • 12 cameras</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-slate-900 text-white flex flex-col">
      {/* Enhanced Header */}
      <div className="h-16 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border-b border-slate-600 flex items-center px-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🏭</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Nexus Mining
            </h1>
            <p className="text-xs text-slate-400">Advanced Operations Platform</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          {/* Navigation */}
          <nav className="flex space-x-2">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: '3d', label: '🌍 3D View', icon: '🌍' },
              { id: '2d', label: '🗺️ 2D Map', icon: '🗺️' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'assets', label: '🚛 Assets', icon: '🚛' },
              { id: 'safety', label: '🛡️ Safety', icon: '🛡️' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as 'dashboard' | '3d' | '2d' | 'analytics' | 'assets' | 'safety')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.icon}</span>
              </button>
            ))}
          </nav>
          
          {/* System Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 hidden lg:inline">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === '3d' && (
          <div className="h-full">
            <SuperAdvancedCesiumGlobe
              assets={miningAssets}
              onAssetClick={setSelectedAsset}
              enableTerrainAnalysis={true}
              enableWeatherOverlay={true}
              enableHeatmaps={true}
              enable3DBuildings={true}
              viewMode="satellite"
              zoomLevel="site"
            />
          </div>
        )}
        {currentView === '2d' && (
          <div className="h-full">
            <SuperAdvanced2DMap
              assets={miningAssets}
              onAssetClick={(asset) => setSelectedAsset(asset)}
              enableRouteOptimization={true}
              enableSafetyZones={true}
              viewMode="satellite"
              zoomLevel="10"
            />
          </div>
        )}
        {currentView === 'analytics' && (
          <div className="p-6">
            <div className="text-center py-20">
              <span className="text-6xl">📈</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Advanced Analytics</h2>
              <p className="text-slate-400">Deep insights and predictive analytics dashboard</p>
            </div>
          </div>
        )}
        {currentView === 'assets' && (
          <div className="p-6">
            <div className="text-center py-20">
              <span className="text-6xl">🚛</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Asset Management</h2>
              <p className="text-slate-400">Comprehensive equipment tracking and maintenance</p>
            </div>
          </div>
        )}
        {currentView === 'safety' && (
          <div className="p-6">
            <div className="text-center py-20">
              <span className="text-6xl">🛡️</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Safety Dashboard</h2>
              <p className="text-slate-400">HazardVision™ and ThibaAlert integration</p>
            </div>
          </div>
        )}
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedAsset(null)}>
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-600" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedAsset.name}</h3>
              <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className={`font-medium ${
                  selectedAsset.status === 'operational' ? 'text-green-400' :
                  selectedAsset.status === 'maintenance' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>{selectedAsset.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operator:</span>
                <span className="text-white">{selectedAsset.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Zone:</span>
                <span className="text-white">{selectedAsset.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Efficiency:</span>
                <span className="text-blue-400">{selectedAsset.telemetry.productivity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fuel Level:</span>
                <span className="text-green-400">{selectedAsset.telemetry.fuel}%</span>
              </div>
              {selectedAsset.ai_insights && (
                <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">🤖 AI Insights</h4>
                  <p className="text-xs text-slate-300">{selectedAsset.ai_insights.predictive_maintenance}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraAdvancedNexusApp;
