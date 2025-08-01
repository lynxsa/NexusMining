import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Nexus Mining Platform
        </h1>
        <p className="text-lg text-blue-700 mb-8">
          Test Page - Basic React App is Working!
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Status
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>React:</span>
              <span className="text-green-600 font-medium">✅ Working</span>
            </div>
            <div className="flex items-center justify-between">
              <span>TypeScript:</span>
              <span className="text-green-600 font-medium">✅ Working</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tailwind CSS:</span>
              <span className="text-green-600 font-medium">✅ Working</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Vite:</span>
              <span className="text-green-600 font-medium">✅ Working</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
