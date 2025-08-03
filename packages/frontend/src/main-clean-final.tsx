import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

console.log('🚀 Nexus Mining System - Starting Clean Bootstrap');

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
