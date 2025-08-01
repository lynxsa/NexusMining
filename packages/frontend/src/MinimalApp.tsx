import React, { useState } from 'react';

const MinimalApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Nexus Mining SA</h1>
            <p className="text-gray-600">Mining Management Platform</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="operator@nexusmining.co.za"
                defaultValue="operator@nexusmining.co.za"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="demo123"
                defaultValue="demo123"
              />
            </div>
            
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium"
            >
              Sign In to Mining Platform
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Demo Accounts:</strong><br/>
              operator@nexusmining.co.za / demo123<br/>
              admin@nexusmining.co.za / demo123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900">Nexus Mining SA</h1>
                <p className="text-xs text-gray-500">Mining Operations Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sarah van der Merwe</span>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                🎉 Welcome to Mining Operations Dashboard
              </h2>
              <p className="text-gray-600">
                Your comprehensive mining management system is now operational and ready for South African mining operations.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Workers</dt>
                      <dd className="text-lg font-medium text-gray-900">1,247</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 font-bold">🦺</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Safety Status</dt>
                      <dd className="text-lg font-medium text-gray-900">All Clear</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mining Modules */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Mining Operations Modules</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { name: 'AssetTrack AI', icon: '🏗️', desc: 'Equipment Monitoring', color: 'bg-blue-100 text-blue-600' },
                  { name: 'HazardVision', icon: '🦺', desc: 'Safety Management', color: 'bg-red-100 text-red-600' },
                  { name: 'Digital Twin', icon: '🌍', desc: '3D Visualization', color: 'bg-green-100 text-green-600' },
                  { name: 'ThibaAlert', icon: '📱', desc: 'Mobile Reporting', color: 'bg-yellow-100 text-yellow-600' },
                  { name: 'SmartOps', icon: '📊', desc: 'Analytics', color: 'bg-purple-100 text-purple-600' },
                  { name: 'ConnectedWorker', icon: '👷', desc: 'Worker Safety', color: 'bg-indigo-100 text-indigo-600' },
                  { name: 'Energy Hub', icon: '⚡', desc: 'ESG Metrics', color: 'bg-teal-100 text-teal-600' },
                  { name: 'WorkshopOps', icon: '🔧', desc: 'Maintenance', color: 'bg-orange-100 text-orange-600' },
                ].map((module) => (
                  <div
                    key={module.name}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                      <span className="text-xl">{module.icon}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 mb-1">{module.name}</div>
                      <div className="text-xs text-gray-500">{module.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-xl">✅</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  System Operational
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    All mining operations systems are running normally. 
                    Real-time data from 4 active mine sites in South Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MinimalApp;
