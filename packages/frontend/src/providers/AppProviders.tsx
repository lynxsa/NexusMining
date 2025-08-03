import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProvider } from '../contexts/CurrencyContext';

// Create a query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }> }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Global Error Boundary:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}

// Error fallback component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ 
  error, 
  resetErrorBoundary 
}) => (
  <div className="h-screen w-full bg-gradient-to-br from-red-900 via-slate-900 to-slate-800 flex items-center justify-center">
    <div className="text-center text-white p-8 bg-slate-800 bg-opacity-90 rounded-lg max-w-2xl mx-4 shadow-2xl">
      <div className="w-20 h-20 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-red-400">⚠️ Application Error</h1>
      <p className="text-slate-300 mb-6">
        The NexusMining application encountered an error and needs to be reloaded.
      </p>
      
      <div className="text-left bg-slate-700 p-4 rounded-lg mb-6 overflow-auto max-h-40">
        <h3 className="text-red-400 font-semibold mb-2">Error Details:</h3>
        <pre className="text-sm text-slate-300 whitespace-pre-wrap">
          {error.message}
        </pre>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          🔄 Reload Application
        </button>
        <button 
          onClick={resetErrorBoundary}
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

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
