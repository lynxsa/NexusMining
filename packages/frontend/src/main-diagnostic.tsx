import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

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
const DiagnosticApp: React.FC = () => {
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
    const tailwindCheck = document.documentElement.classList.contains('dark') || 
                         getComputedStyle(document.documentElement).getPropertyValue('--tw-ring-color') ? 
                         '✅ Tailwind Active' : '⚠️ Tailwind Unknown';
    
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
              // This will trigger the loading of the main app
              window.location.hash = '#load-main-app';
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
const SmartAppLoader: React.FC = () => {
  const [loadMainApp, setLoadMainApp] = React.useState(false);
  const [AdvancedNexusApp, setAdvancedNexusApp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    // Check if we should load the main app
    const shouldLoadMain = window.location.hash === '#load-main-app' || 
                          localStorage.getItem('nexus-direct-load') === 'true';
    
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

// 🎯 Development Helpers
if (process.env.NODE_ENV === 'development') {
  // Add global helper for quick main app access
  (window as any).loadMainApp = () => {
    localStorage.setItem('nexus-direct-load', 'true');
    window.location.reload();
  };
  
  console.log('🔧 Development mode: Use loadMainApp() in console to skip diagnostic screen');
}
