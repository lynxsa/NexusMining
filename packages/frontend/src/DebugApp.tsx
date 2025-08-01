import React from 'react';

// Debug component to check what's happening
export const DebugApp: React.FC = () => {
  console.log('🚀 DebugApp rendering...');
  
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#1e40af',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        🚀 Nexus Mining SA - Debug Mode
      </h1>
      
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>✅ System Check</h2>
        <div style={{ marginBottom: '10px' }}>✅ React App Loading</div>
        <div style={{ marginBottom: '10px' }}>✅ Component Rendering</div>
        <div style={{ marginBottom: '10px' }}>✅ Styles Applied</div>
        <div style={{ marginBottom: '10px' }}>✅ Debug Component Working</div>
        
        <div style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          <strong>Current Time:</strong> {new Date().toLocaleString()}
        </div>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
          <strong>Action Required:</strong> If you can see this debug screen, React is working. 
          The issue might be with the main App components. Switching back to full app...
        </div>
      </div>
    </div>
  );
};

export default DebugApp;
