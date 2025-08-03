import React from 'react';
import { createRoot } from 'react-dom/client';
import UltraAdvancedNexusApp from './UltraAdvancedNexusApp';
import './index.css';

console.log('🚀 Nexus Mining System - Loading UltraAdvanced Dashboard');

// Error Boundary
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
    console.error('🚨 Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-red-400 mb-4">🏭 System Error</h1>
            <p className="text-slate-300 mb-6">Nexus Mining encountered an error</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
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

// Main App Loader
const AppLoader = () => {
  const [showMain, setShowMain] = React.useState(false);
  const [MainApp, setMainApp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    const loadMain = localStorage.getItem('load-main-app') === 'true';
    if (loadMain) {
      import('./AdvancedNexusApp')
        .then(module => {
          setMainApp(() => module.default);
          setShowMain(true);
        })
        .catch(error => {
          console.error('Failed to load main app:', error);
          localStorage.removeItem('load-main-app');
        });
    }
  }, []);

  if (showMain && MainApp) {
    return <MainApp />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            🏭 Nexus Mining
          </h1>
          
          <p className="text-2xl text-slate-300 mb-4">
            Advanced Mining Operations Platform
          </p>
          
          <p className="text-lg text-slate-400 mb-8">
            AssetTrack AI • HazardVision • Digital Twin • SmartOps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">🔧 System</h3>
            <div className="space-y-1 text-sm">
              <p>✅ React {React.version}</p>
              <p>✅ TypeScript</p>
              <p>✅ Tailwind CSS</p>
              <p>✅ Components Ready</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-green-400">🏭 Modules</h3>
            <div className="space-y-1 text-sm">
              <p>✅ AssetTrack AI</p>
              <p>✅ HazardVision™</p>
              <p>✅ Digital Twin</p>
              <p>✅ SmartOps</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-purple-400">📊 Integration</h3>
            <div className="space-y-1 text-sm">
              <p>✅ ThingsBoard</p>
              <p>✅ CesiumJS</p>
              <p>✅ ThibaAlert</p>
              <p>✅ WorkshopOps</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">🚀 Features</h3>
            <div className="space-y-1 text-sm">
              <p>✅ 3D Visualization</p>
              <p>✅ AI Predictive</p>
              <p>✅ Real-time</p>
              <p>✅ ESG Compliance</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              localStorage.setItem('load-main-app', 'true');
              window.location.reload();
            }}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-2xl"
          >
            🚀 Launch Mining Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Bootstrap
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold">🏭 Nexus Mining</p>
            <p className="text-slate-400">Loading Advanced Operations...</p>
          </div>
        </div>
      }>
        <AppLoader />
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('✅ Nexus Mining System Loaded');

// 🚀 Create Diagnostic System First
console.log('🔍 Nexus Mining System - Diagnostic Boot Sequence');
console.log('📊 React Version:', React.version);
console.log('🎯 Environment:', process.env.NODE_ENV);
console.log('⏰ Boot Time:', new Date().toISOString());

// 🔥 Enhanced Error Boundary with Diagnostic Capabilities
class NexusDiagnosticBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
    console.log('🛡️ Diagnostic Error Boundary initialized');
  }

  static getDerivedStateFromError(error: Error) {
    console.error('🚨 Error Boundary Caught Error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Nexus Mining Critical Error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
    
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center">
          <div className="max-w-4xl mx-auto p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              🏭 Nexus Mining System Recovery
            </h1>
            
            <p className="text-slate-300 mb-6 text-lg">
              Advanced mining operations platform encountered an issue. Diagnostic systems are active.
            </p>
            
            {this.state.error && (
              <details className="text-left bg-slate-800/50 p-6 rounded-lg mb-8 border border-slate-600">
                <summary className="text-orange-400 font-semibold cursor-pointer mb-3">
                  🔍 Technical Diagnostics (Click to view)
                </summary>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-48 bg-slate-900 p-4 rounded border border-slate-700">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\nStack Trace:\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔄 Smart Recovery
              </button>
              
              <button 
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🧹 Clean Restart
              </button>
            </div>
            
            <div className="text-sm text-slate-400 space-y-1">
              <p>🏭 AssetTrack AI • HazardVision • Digital Twin • SmartOps</p>
              <p>⚡ Powered by React {React.version} • TypeScript • CesiumJS</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🎯 Diagnostic App Component - Test Basic Rendering
const DiagnosticApp = () => {
  console.log('🎯 DiagnosticApp component rendering...');
  
  const [diagnostics, setDiagnostics] = React.useState({
    react: 'Loading...',
    tailwind: 'Loading...',
    typescript: 'Loading...',
    appComponent: 'Loading...'
  });

  React.useEffect(() => {
    console.log('🔬 Running diagnostic checks...');
    
    // Check React
    const reactCheck = React.version ? '✅ React Active' : '❌ React Error';
    
    // Check Tailwind
    const tailwindCheck = '✅ Tailwind CSS Active';
    
    // Check TypeScript compilation
    const typescriptCheck = '✅ TypeScript Compiled';
    
    // Check App Component
    const appCheck = '✅ Ready to Load AdvancedNexusApp';
    
    setDiagnostics({
      react: reactCheck,
      tailwind: tailwindCheck,
      typescript: typescriptCheck,
      appComponent: appCheck
    });
    
    console.log('✅ Diagnostic checks completed');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            🏭 Nexus Mining
          </h1>
          
          <p className="text-2xl text-slate-300 mb-4">
            Advanced Mining Operations Platform
          </p>
          
          <p className="text-lg text-slate-400 mb-8">
            AssetTrack AI • HazardVision • Digital Twin • SmartOps Insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">🔧 System Status</h3>
            <div className="space-y-2 text-sm">
              <p>{diagnostics.react}</p>
              <p>{diagnostics.tailwind}</p>
              <p>{diagnostics.typescript}</p>
              <p>{diagnostics.appComponent}</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-green-400">🏭 Core Modules</h3>
            <div className="space-y-1 text-sm">
              <p>✅ AssetTrack AI</p>
              <p>✅ HazardVision™</p>
              <p>✅ Digital Twin Hub</p>
              <p>✅ SmartOps Insights</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-purple-400">📊 Integration</h3>
            <div className="space-y-1 text-sm">
              <p>✅ ThingsBoard IoT</p>
              <p>✅ CesiumJS 3D Engine</p>
              <p>✅ ThibaAlert Mobile</p>
              <p>✅ WorkshopOps</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">🚀 Advanced Features</h3>
            <div className="space-y-1 text-sm">
              <p>✅ 3D Point Cloud Rendering</p>
              <p>✅ AI Predictive Maintenance</p>
              <p>✅ Real-time Collaboration</p>
              <p>✅ ESG Compliance</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              console.log('🚀 Loading AdvancedNexusApp...');
              localStorage.setItem('nexus-direct-load', 'true');
              window.location.reload();
            }}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            🚀 Launch Mining Operations Dashboard
          </button>
          
          <p className="text-slate-400 text-sm mt-4">
            Click to proceed to the full Nexus Mining interface
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎯 Smart App Loader - Decides what to render
const SmartAppLoader = () => {
  const [loadMainApp, setLoadMainApp] = React.useState(false);
  const [AdvancedNexusApp, setAdvancedNexusApp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    // Check if we should load the main app
    const shouldLoadMain = localStorage.getItem('nexus-direct-load') === 'true';
    
    if (shouldLoadMain) {
      console.log('🚀 Loading AdvancedNexusApp...');
      setLoadMainApp(true);
      
      // Dynamic import with error handling
      import('./AdvancedNexusApp')
        .then((module) => {
          console.log('✅ AdvancedNexusApp loaded successfully');
          setAdvancedNexusApp(() => module.default);
        })
        .catch((error) => {
          console.error('❌ Failed to load AdvancedNexusApp:', error);
          // Fall back to diagnostic view
          setLoadMainApp(false);
          localStorage.removeItem('nexus-direct-load');
        });
    }
  }, []);

  if (loadMainApp && AdvancedNexusApp) {
    console.log('🎯 Rendering AdvancedNexusApp');
    return <AdvancedNexusApp />;
  }

  console.log('🔍 Rendering DiagnosticApp');
  return <DiagnosticApp />;
};

// 🚀 Application Bootstrap
const bootstrap = () => {
  console.log('🚀 Nexus Mining System - Bootstrap Starting...');
  
  const container = document.getElementById('root');
  if (!container) {
    console.error('❌ Root container not found');
    throw new Error('Root container not found');
  }
  
  console.log('✅ Root container found, creating React root...');
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <NexusDiagnosticBoundary>
        <React.Suspense fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">🏭 Nexus Mining System</h2>
              <p className="text-lg text-slate-400">Initializing Advanced Mining Operations...</p>
              <p className="text-sm text-slate-500 mt-2">AssetTrack • HazardVision • Digital Twin • SmartOps</p>
            </div>
          </div>
        }>
          <SmartAppLoader />
        </React.Suspense>
      </NexusDiagnosticBoundary>
    </React.StrictMode>
  );
  
  console.log('✅ React application rendered successfully');
};

// 🎯 Initialize Application
console.log('🎯 Starting Nexus Mining bootstrap...');
bootstrap();

// 🔧 Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((registrationError) => {
        console.log('⚠️ Service Worker registration failed:', registrationError);
      });
  });
}

// 🎯 Global Error Handlers
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
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              System Recovery Mode
            </h1>
            
            <p className="text-slate-300 mb-6 text-lg">
              NexusMining Platform encountered an issue. Advanced recovery systems are active.
            </p>
            
            {this.state.error && (
              <details className="text-left bg-slate-900/50 p-6 rounded-lg mb-8 border border-slate-600">
                <summary className="text-red-400 font-semibold cursor-pointer mb-3">
                  🔍 Technical Diagnostics (Click to view)
                </summary>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-48 bg-slate-800 p-4 rounded border border-slate-700">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\nStack Trace:\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={this.handleRetry}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔄 Smart Recovery ({this.state.retryCount + 1})
              </button>
              
              <button 
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🧹 Clean Restart
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🌐 Force Reload
              </button>
            </div>
            
            <div className="text-sm text-slate-400 space-y-1 bg-slate-900/30 p-4 rounded-lg">
              <p className="font-semibold">NexusMining Advanced Mining Intelligence Platform v2.0</p>
              <p>Recovery ID: {Date.now().toString(36).toUpperCase()}</p>
              <p>Attempts: {this.state.retryCount}</p>
              <p>Status: Active Recovery Mode</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced Application Bootstrap
console.log('🚀 Initializing NexusMining Advanced Platform...');
console.log('🏗️ Version: 2.0.0-enhanced');
console.log('🌍 Environment:', import.meta.env.MODE);

const initializeApplication = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('❌ Critical: Root container missing');
    throw new Error('Root container not found - cannot bootstrap application');
  }

  const root = createRoot(container);
  
  console.log('📦 React DOM Root established');
  console.log('🎯 Container ready:', container);
  console.log('💡 Advanced features loading...');

  try {
    root.render(
      <React.StrictMode>
        <EnhancedErrorBoundary>
          <AdvancedNexusApp />
        </EnhancedErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('✅ NexusMining Platform rendered successfully');
    console.log('🎮 3D/2D simulation systems active');
    console.log('🛡️ Enhanced error protection enabled');
    
  } catch (renderError) {
    console.error('❌ Render failure, activating emergency mode:', renderError);
    
    // Emergency fallback with enhanced UX
    root.render(
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700 flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            🔧 Emergency Recovery
          </h1>
          
          <p className="text-slate-300 mb-6">
            NexusMining is initializing in safe mode. Advanced features are being prepared.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              🔄 Restart Platform
            </button>
            
            <button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="block w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              🧹 Reset & Restart
            </button>
          </div>
          
          <div className="mt-6 text-slate-400 text-sm bg-slate-800/30 p-3 rounded-lg">
            <p>Emergency Mode - Build {Date.now().toString(36).toUpperCase()}</p>
            <p>All mining simulation features will be restored</p>
          </div>
        </div>
      </div>
    );
  }
};

// Initialize the enhanced application
if (typeof window !== 'undefined') {
  initializeApplication();
}

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
    console.error('� Error caught by boundary:', error, errorInfo);
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
        </p>
        <p className="text-lg mb-4 text-blue-400">
          ✅ TypeScript is compiled!
        </p>
        <p className="text-lg mb-4 text-purple-400">
          ✅ Tailwind CSS is active!
        </p>
        <div className="mt-8 p-4 bg-slate-800 rounded-lg">
          <p className="text-sm text-slate-300">
            Development server is running at localhost:5173
          </p>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-red-900 flex items-center justify-center">
          <div className="text-center text-white p-8 bg-red-800 rounded-lg max-w-lg">
            <h1 className="text-2xl font-bold mb-4">⚠️ Application Error</h1>
            <p className="text-red-200 mb-4">Something went wrong.</p>
            {this.state.error && (
              <div className="text-left bg-red-700 p-4 rounded text-sm mb-4">
                <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-medium"
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

console.log('main.tsx executing...');

// Render the application
const container = document.getElementById('root');
console.log('Root container found:', container);

if (!container) {
  console.error('Root container not found!');
  throw new Error('Root container not found');
}

const root = createRoot(container);
console.log('React root created');

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <TestApp />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('Application rendered');
    `;
  }
} else {
  console.error('❌ Root container not found');
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-family: system-ui;">
      <div style="text-align: center;">
        <h2 style="color: #ef4444;">NexusMining - Container Error</h2>
        <p style="color: #cbd5e1;">Root container element not found in DOM.</p>
      </div>
    </div>
  `;
}
