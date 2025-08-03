import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AdvancedNexusApp from './AdvancedNexusApp';

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-gradient-to-br from-red-900 via-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center text-white p-8 bg-slate-800 bg-opacity-90 rounded-lg max-w-2xl mx-4 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-red-400">⚠️ Application Error</h1>
            <p className="text-slate-300 mb-6">
              The NexusMining application encountered an error and needs to be reloaded.
            </p>
            
            {this.state.error && (
              <div className="text-left bg-slate-700 p-4 rounded-lg mb-6 overflow-auto max-h-40">
                <h3 className="text-red-400 font-semibold mb-2">Error Details:</h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </div>
            )}
            
            <div className="flex space-x-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
              >
                🔄 Reload Application
              </button>
              <button 
                onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium transition-colors"
              >
                🔧 Try Again
              </button>
            </div>
            
            <div className="mt-6 text-xs text-slate-400">
              NexusMining Advanced Intelligence Platform v2.0
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize and render the application
console.log('🚀 Initializing NexusMining Platform...');

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);

// Add some basic debugging
console.log('📦 React DOM loaded');
console.log('🎯 Container found:', container);

try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AdvancedNexusApp />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('✅ NexusMining application rendered successfully');
} catch (error) {
  console.error('❌ Failed to render application:', error);
  
  // Fallback rendering
  root.render(
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-3xl font-bold mb-4">🔧 NexusMining Recovery Mode</h1>
        <p className="text-slate-300 mb-4">Loading fallback interface...</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Retry Loading
        </button>
      </div>
    </div>
  );
}
