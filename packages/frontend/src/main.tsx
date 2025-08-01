import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  try {
    console.log('🚀 Starting Nexus Mining App...');
    root.render(<App />);
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ App failed to render:', error);
    container.innerHTML = `
      <div style="padding: 20px; background: #fee; color: #c00; font-family: monospace;">
        <h2>Application Error</h2>
        <p>Failed to load Nexus Mining application.</p>
        <pre>${error}</pre>
      </div>
    `;
  }
} else {
  console.error('Root container not found');
}
