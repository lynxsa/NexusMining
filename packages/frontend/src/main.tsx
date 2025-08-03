import React from 'react';
import { createRoot } from 'react-dom/client';
import UltraAdvancedNexusApp from './UltraAdvancedNexusApp';
import './index.css';

console.log('🚀 Nexus Mining System - Loading UltraAdvanced Dashboard');

// Error Boundary for better error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Nexus Mining App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-slate-900 text-white flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4 text-red-400">
              🚨 System Error
            </h1>
            <p className="text-xl mb-4">
              Something went wrong with the Nexus Mining System
            </p>
            <p className="text-sm text-gray-400 mb-6">
              {this.state.error?.message}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main App Component  
function App() {
  console.log('🔥 App component rendering...');
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-blue-400">🏭 Nexus Mining System</h1>
          <p className="text-xl mb-4">UltraAdvanced Mining Dashboard</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-600 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">2,847</h3>
              <p className="text-sm">Production Rate</p>
            </div>
            <div className="bg-green-600 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">89%</h3>
              <p className="text-sm">Efficiency</p>
            </div>
            <div className="bg-yellow-600 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-sm">Active Equipment</p>
            </div>
            <div className="bg-purple-600 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">97%</h3>
              <p className="text-sm">Safety Score</p>
            </div>
          </div>
          <UltraAdvancedNexusApp />
        </div>
      </div>
    </ErrorBoundary>
  );
}

// Initialize the application
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<App />);

console.log('✅ Nexus Mining UltraAdvanced Dashboard Loaded Successfully');
