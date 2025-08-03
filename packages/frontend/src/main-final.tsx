import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AdvancedNexusApp from './AdvancedNexusApp';

// 🔥 Enhanced Error Boundary Component
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
    console.error('🚨 Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-red-400 mb-4">⚠️ System Error</h1>
            <p className="text-slate-300 mb-6">Mining control system encountered an error</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              🔄 Restart System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🚀 Application Bootstrap
const bootstrap = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container not found');
  }
  
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <React.Suspense fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-semibold">🏭 Nexus Mining System</p>
              <p className="text-slate-400">Initializing Advanced Mining Operations...</p>
            </div>
          </div>
        }>
          <AdvancedNexusApp />
        </React.Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// 🎯 Initialize Application
bootstrap();

// 🔧 Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('❌ SW registration failed: ', registrationError);
      });
  });
}

// 🎯 Global Error Handler
window.addEventListener('error', (event) => {
  console.error('🚨 Global Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// 📊 Performance Monitoring
if (process.env.NODE_ENV === 'production') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('📊 Page Load Time:', entry.duration);
      }
    }
  });
  observer.observe({ entryTypes: ['navigation'] });
}
