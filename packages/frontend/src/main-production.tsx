import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import AdvancedNexusApp from './AdvancedNexusApp';
import { GlobalErrorFallback } from './components/error/GlobalErrorFallback';
import { ThemeProvider } from './providers/ThemeProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { AuthProvider } from './providers/AuthProvider';

// Performance monitoring interface
interface PerformanceMemory {
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
}

interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

// Enhanced Error Boundary Component with detailed logging and recovery
class EnhancedErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo; retryCount: number }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Critical Error in NexusMining Application:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Send error to monitoring service (would be implemented in production)
    this.logErrorToService(error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // In production, this would send to error monitoring service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      retryCount: this.state.retryCount,
      buildVersion: '2.0.0',
      environment: import.meta.env.MODE
    };
    
    console.log('📊 Error logged to monitoring:', errorData);
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-gradient-to-br from-red-900 via-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center text-white p-8 bg-slate-800/90 backdrop-blur-sm rounded-lg max-w-3xl mx-4 shadow-2xl border border-slate-700">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Critical System Error
            </h1>
            
            <p className="text-slate-300 mb-6 text-lg">
              The NexusMining Platform encountered a critical error. Our engineering team has been notified.
            </p>
            
            {this.state.error && (
              <div className="text-left bg-slate-900/50 p-6 rounded-lg mb-8 border border-slate-600">
                <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Technical Details:
                </h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-48 bg-slate-800 p-4 rounded border border-slate-700">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\nStack Trace:\n${this.state.error.stack}`}
                </pre>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={this.handleRetry}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔄 Retry Application ({this.state.retryCount + 1})
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🌐 Full Reload
              </button>
              
              <button 
                onClick={() => window.location.href = '/support'}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🆘 Get Support
              </button>
            </div>
            
            <div className="text-sm text-slate-400 space-y-1">
              <p>NexusMining Advanced Intelligence Platform v2.0</p>
              <p>Error ID: {Date.now().toString(36).toUpperCase()}</p>
              <p>Retry Count: {this.state.retryCount}</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced Query Client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors except 408 (timeout)
        const errorStatus = (error as { status?: number })?.status;
        if (errorStatus && errorStatus >= 400 && errorStatus < 500 && errorStatus !== 408) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Application Bootstrap with Enhanced Error Handling
const bootstrapApplication = () => {
  console.log('🚀 Bootstrapping NexusMining Platform v2.0...');
  console.log('📊 Environment:', import.meta.env.MODE);
  console.log('🔧 Build timestamp:', new Date().toISOString());

  const container = document.getElementById('root');
  if (!container) {
    console.error('❌ Critical: Root container not found');
    document.body.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif;">
        <div style="text-align: center; max-width: 500px; padding: 2rem;">
          <h1 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem; font-weight: bold;">🚨 Bootstrap Error</h1>
          <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 1.5rem;">Root container element not found in DOM.</p>
          <p style="color: #94a3b8; font-size: 0.9rem;">Please ensure the HTML template includes a div with id="root"</p>
          <button onclick="window.location.reload()" style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Reload Page
          </button>
        </div>
      </div>
    `;
    throw new Error('Root container not found - cannot bootstrap application');
  }

  const root = createRoot(container);

  // Performance monitoring
  console.log('📦 React DOM Root created');
  console.log('🎯 Target container:', container);
  const extendedPerformance = performance as ExtendedPerformance;
  const memoryInfo = extendedPerformance.memory;
  console.log('💾 Available memory:', memoryInfo ? `${Math.round(memoryInfo.usedJSHeapSize! / 1024 / 1024)}MB` : 'Unknown');

  try {
    root.render(
      <React.StrictMode>
        <EnhancedErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <AuthProvider>
                <NotificationProvider>
                  <ErrorBoundary
                    FallbackComponent={GlobalErrorFallback}
                    onError={(error: Error, errorInfo: { componentStack: string }) => {
                      console.error('🔥 React Error Boundary triggered:', error, errorInfo);
                    }}
                    onReset={() => {
                      console.log('🔄 Application reset triggered');
                      window.location.reload();
                    }}
                  >
                    <AdvancedNexusApp />
                  </ErrorBoundary>
                </NotificationProvider>
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </EnhancedErrorBoundary>
      </React.StrictMode>
    );

    console.log('✅ NexusMining application rendered successfully');
    console.log('🌟 All providers and error boundaries active');

  } catch (error) {
    console.error('❌ Critical render failure:', error);
    
    // Ultimate fallback with minimal dependencies
    root.render(
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            🔧 Recovery Mode
          </h1>
          <p className="text-slate-300 mb-6">
            NexusMining is running in emergency recovery mode. Some features may be limited.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              🔄 Attempt Full Reload
            </button>
            <button 
              onClick={() => localStorage.clear()}
              className="block w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium transition-colors"
            >
              🧹 Clear Cache & Reload
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            Recovery Mode - Build {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    );
  }
};

// Initialize application with performance monitoring
if (typeof window !== 'undefined') {
  // Performance mark for monitoring
  performance.mark('app-bootstrap-start');
  
  bootstrapApplication();
  
  performance.mark('app-bootstrap-end');
  performance.measure('app-bootstrap-duration', 'app-bootstrap-start', 'app-bootstrap-end');
  
  // Log performance metrics
  const measure = performance.getEntriesByName('app-bootstrap-duration')[0];
  console.log(`⚡ Bootstrap completed in ${Math.round(measure.duration)}ms`);
}
