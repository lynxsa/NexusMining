import React, { useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Simple Login Component
const SimpleLogin: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    if (!success) {
      alert('Invalid credentials. Try: admin@nexusmining.co.za / demo123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏭 Nexus Mining
          </h1>
          <p className="text-gray-600">Advanced Mining Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@nexusmining.co.za"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="demo123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <p>admin@nexusmining.co.za / demo123</p>
        </div>
      </div>
    </div>
  );
};

// Simple Dashboard Component
const SimpleDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🏭 Nexus Mining Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* KPI Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">R 2.4M</p>
                <p className="text-sm text-gray-600">Daily Production</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">98.5%</p>
                <p className="text-sm text-gray-600">Safety Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Active Assets</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">342</p>
                <p className="text-sm text-gray-600">Workers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AssetTrack AI</h3>
            <p className="text-gray-600 text-sm mb-4">Predictive maintenance and equipment monitoring</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">HazardVision</h3>
            <p className="text-gray-600 text-sm mb-4">Computer vision safety monitoring system</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Twin Hub</h3>
            <p className="text-gray-600 text-sm mb-4">3D mine visualization and digital twin</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SmartOps Insights</h3>
            <p className="text-gray-600 text-sm mb-4">Advanced analytics and business intelligence</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ThibaAlert</h3>
            <p className="text-gray-600 text-sm mb-4">Mobile hazard reporting platform</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Energy & ESG Hub</h3>
            <p className="text-gray-600 text-sm mb-4">Environmental sustainability and energy management</p>
            <div className="text-blue-600 text-sm font-medium">View Module →</div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SimpleLogin />;
  }

  return <SimpleDashboard />;
};

// App with Providers
function SimpleApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default SimpleApp;
