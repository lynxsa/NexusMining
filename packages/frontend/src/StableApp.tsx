import React, { useState } from 'react';
import { SimpleThemeProvider } from './SimpleProviders';

// Step 1: Basic stable app with minimal features
const StableNexusApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const handleLogin = (email: string) => {
    // Simple login simulation
    if (email.includes('operator')) {
      setUser({ name: 'Sarah van der Merwe', role: 'Mining Operator' });
    } else if (email.includes('admin')) {
      setUser({ name: 'Thabo Mthembu', role: 'Administrator' });
    } else {
      setUser({ name: 'Demo User', role: 'Operator' });
    }
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  // Login Screen
  if (currentView === 'login' || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-white rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-blue-600">N</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Nexus Mining SA
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Enterprise Mining Management Platform
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Demo Login Accounts
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleLogin('operator@nexusmining.co.za')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium text-gray-900">Mining Operator</div>
                  <div className="text-sm text-gray-500">operator@nexusmining.co.za</div>
                </div>
                <div className="text-2xl">⛏️</div>
              </button>
              
              <button
                onClick={() => handleLogin('admin@nexusmining.co.za')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium text-gray-900">Administrator</div>
                  <div className="text-sm text-gray-500">admin@nexusmining.co.za</div>
                </div>
                <div className="text-2xl">🔧</div>
              </button>
              
              <button
                onClick={() => handleLogin('safety@nexusmining.co.za')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium text-gray-900">Safety Officer</div>
                  <div className="text-sm text-gray-500">safety@nexusmining.co.za</div>
                </div>
                <div className="text-2xl">🦺</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900">Nexus Mining SA</h1>
                <p className="text-xs text-gray-500">Mining Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user.role === 'Mining Operator' ? '⛏️ Mining Operations Control Center' : 
                 user.role === 'Administrator' ? '🔧 System Administrator Dashboard' : 
                 '🦺 Safety Management Dashboard'}
              </h2>
              <p className="text-gray-600">
                {user.role === 'Mining Operator' ? 'Real-time mining operations, equipment status, and production metrics.' :
                 user.role === 'Administrator' ? 'Monitor system health, user activity, and overall platform performance.' :
                 'Safety incidents, compliance status, and hazard monitoring.'}
              </p>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">⛏️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Mines</dt>
                      <dd className="text-lg font-medium text-gray-900">4 Sites</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">R</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Revenue (ZAR)</dt>
                      <dd className="text-lg font-medium text-gray-900">R 2.4M</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">👷</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Workers</dt>
                      <dd className="text-lg font-medium text-gray-900">1,247</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module Navigation */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Modules</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { name: 'AssetTrack AI', icon: '🏗️', desc: 'Equipment Management' },
                  { name: 'HazardVision', icon: '🦺', desc: 'Safety Monitoring' },
                  { name: 'Digital Twin', icon: '🌍', desc: '3D Visualization' },
                  { name: 'Supply Chain', icon: '🚛', desc: 'Procurement' },
                  { name: 'SmartOps', icon: '📈', desc: 'Analytics' },
                  { name: 'ConnectedWorker', icon: '👷', desc: 'Worker Safety' },
                  { name: 'Energy & ESG', icon: '⚡', desc: 'Sustainability' },
                  { name: 'Settings', icon: '⚙️', desc: 'Configuration' },
                ].map((module) => (
                  <div
                    key={module.name}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{module.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{module.name}</div>
                    <div className="text-xs text-gray-500">{module.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-xl">✅</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Nexus Mining SA - Fully Operational
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>All systems operational. {user.role} dashboard loaded successfully with ZAR currency support and South African mining compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stable App with Provider
const StableApp: React.FC = () => {
  return (
    <SimpleThemeProvider>
      <StableNexusApp />
    </SimpleThemeProvider>
  );
};

export default StableApp;
