import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>🚀 Nexus Mining Test</h1>
      <p style={{ color: '#666' }}>
        If you can see this message, the React app is working correctly!
      </p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px' }}>
        Server Status: ✅ Running on http://localhost:5173
      </div>
    </div>
  );
};

export default TestApp;
