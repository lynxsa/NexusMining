import React from 'react';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const GlobalErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const handleReset = () => {
    // Clear any corrupt state
    try {
      localStorage.removeItem('nexus-app-state');
      sessionStorage.clear();
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    
    resetErrorBoundary();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          
          <p className="text-slate-300 mb-6">
            The NexusMining application encountered an unexpected error. 
            Our team has been notified and is working on a fix.
          </p>
          
          {error && (
            <details className="text-left bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-600">
              <summary className="text-red-400 font-semibold cursor-pointer mb-2">
                Error Details (Click to expand)
              </summary>
              <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-40">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors"
            >
              Reload Page
            </button>
          </div>
          
          <p className="text-slate-400 text-sm mt-6">
            Error ID: {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};
