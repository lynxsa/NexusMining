import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import AdvancedNexusApp from './AdvancedNexusApp';
import { ThemeProvider } from './providers/ThemeProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { AuthProvider } from './providers/AuthProvider';

// 🚀 Enhanced Application Bootstrap Architecture
class ApplicationBootstrap {
  private static instance: ApplicationBootstrap;
  private queryClient: QueryClient;
  private isInitialized = false;

  constructor() {
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
          retry: (failureCount, error: unknown) => {
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
  }

  static getInstance(): ApplicationBootstrap {
    if (!ApplicationBootstrap.instance) {
      ApplicationBootstrap.instance = new ApplicationBootstrap();
    }
    return ApplicationBootstrap.instance;
  }

  // 🛡️ Advanced Error Boundary with Recovery System
  private createErrorBoundary() {
    return class EnhancedErrorBoundary extends React.Component<
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
        console.error('🚨 NexusMining Critical Error:', {
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          retryCount: this.state.retryCount
        });
        
        this.setState({ error, errorInfo });
      }

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
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
              <div className="max-w-2xl w-full bg-slate-800/95 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    System Recovery Mode
                  </h1>
                  
                  <p className="text-slate-300 mb-6 text-lg">
                    NexusMining encountered an issue but is recovering. All mining operations continue safely.
                  </p>
                  
                  {this.state.error && (
                    <details className="text-left bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-600">
                      <summary className="text-red-400 font-semibold cursor-pointer mb-2">
                        Technical Details
                      </summary>
                      <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-32">
                        {this.state.error.message}
                      </pre>
                    </details>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={this.handleRetry}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🔄 Retry ({this.state.retryCount + 1})
                    </button>
                    
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🌐 Refresh Platform
                    </button>
                  </div>
                  
                  <div className="mt-6 text-sm text-slate-400">
                    <p>NexusMining Advanced Intelligence Platform v2.0</p>
                    <p>Error ID: {Date.now().toString(36).toUpperCase()}</p>
                    <p>Recovery attempts: {this.state.retryCount}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return this.props.children;
      }
    };
  }

  // 🎯 Initialize Application with Advanced Features
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('⚠️ Application already initialized');
      return;
    }

    console.log('🚀 Initializing NexusMining Advanced Intelligence Platform v2.0');
    console.log('📊 Environment:', import.meta.env.MODE);
    console.log('🔧 Build timestamp:', new Date().toISOString());

    const container = document.getElementById('root');
    if (!container) {
      this.handleBootstrapError('Root container not found');
      return;
    }

    const root = createRoot(container);
    const ErrorBoundary = this.createErrorBoundary();

    console.log('📦 React DOM Root created');
    console.log('🎯 Target container:', container);

    try {
      // 🌟 Enhanced Application Stack
      root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <QueryClientProvider client={this.queryClient}>
              <ThemeProvider>
                <AuthProvider>
                  <NotificationProvider>
                    <AdvancedNexusApp />
                  </NotificationProvider>
                </AuthProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </React.StrictMode>
      );

      console.log('✅ NexusMining Platform rendered successfully');
      console.log('🌟 All providers and error boundaries active');
      this.isInitialized = true;

    } catch (error) {
      console.error('❌ Critical render failure:', error);
      this.renderRecoveryMode(root);
    }
  }

  // 🛠️ Recovery Mode Rendering
  private renderRecoveryMode(root: any): void {
    root.render(
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <div className="text-center text-white p-8 max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            🔧 Emergency Recovery
          </h1>
          <p className="text-slate-300 mb-6">
            NexusMining is running in emergency recovery mode. Core mining operations remain stable.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              🔄 Reload Platform
            </button>
            <button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="block w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium transition-colors"
            >
              🧹 Clear Cache & Reset
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            Recovery Mode - Build {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    );
  }

  // 🚨 Bootstrap Error Handler
  private handleBootstrapError(message: string): void {
    console.error(`❌ Bootstrap Error: ${message}`);
    document.body.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif;">
        <div style="text-align: center; max-width: 500px; padding: 2rem;">
          <h1 style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem; font-weight: bold;">🚨 Bootstrap Error</h1>
          <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 1.5rem;">${message}</p>
          <p style="color: #94a3b8; font-size: 0.9rem;">Please ensure the HTML template is properly configured</p>
          <button onclick="window.location.reload()" style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Reload Platform
          </button>
        </div>
      </div>
    `;
    throw new Error(`Bootstrap failed: ${message}`);
  }
}

// 🎯 Initialize Application with Performance Monitoring
if (typeof window !== 'undefined') {
  performance.mark('nexus-bootstrap-start');
  
  const bootstrap = ApplicationBootstrap.getInstance();
  bootstrap.initialize().then(() => {
    performance.mark('nexus-bootstrap-end');
    performance.measure('nexus-bootstrap-duration', 'nexus-bootstrap-start', 'nexus-bootstrap-end');
    
    const measure = performance.getEntriesByName('nexus-bootstrap-duration')[0];
    console.log(`⚡ NexusMining Platform bootstrapped in ${Math.round(measure.duration)}ms`);
  }).catch((error) => {
    console.error('💥 Bootstrap failed:', error);
  });
}
