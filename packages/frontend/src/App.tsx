import { useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { MainLayout } from './layouts/MainLayout';
import { LoginView } from './components/auth/LoginView';
import { DashboardView } from './modules/dashboard/DashboardView';
import { DigitalTwinHub } from './modules/digital-twin/DigitalTwinHub';
import { AssetTrackView } from './modules/asset-track/AssetTrackView';
import { HazardVisionView } from './modules/safety/HazardVisionView';
import { ThibaAlertView } from './modules/mobile-reporting/ThibaAlertView';
import { SmartOpsInsights } from './modules/analytics/SmartOpsInsights';
import { ConnectedWorker } from './modules/connected-worker/ConnectedWorker';
import { EnergyESGHub } from './modules/energy-esg/EnergyESGHub';
import { WorkshopOps } from './modules/workshop-ops/WorkshopOps';
import { SmartPlanAI } from './modules/planning/SmartPlanAI';
import { IntelliScan3D } from './modules/scanning/IntelliScan3D';
import { FieldOpsMobile } from './modules/mobile/FieldOpsMobile';
import { ComplianceHub } from './modules/compliance/ComplianceHub';
import { EnvironmentalMonitor } from './modules/environmental/EnvironmentalMonitor';
import { SupplyChain } from './modules/supply/SupplyChain';
import { SystemSettings } from './modules/settings/SystemSettings';

// Main App Content Component
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'twin':
        return <DigitalTwinHub />;
      case 'assets':
        return <AssetTrackView />;
      case 'safety':
        return <HazardVisionView />;
      case 'mobile':
        return <ThibaAlertView />;
      case 'analytics':
        return <SmartOpsInsights />;
      case 'worker':
        return <ConnectedWorker />;
      case 'energy':
        return <EnergyESGHub />;
      case 'workshop':
        return <WorkshopOps />;
      case 'planning':
        return <SmartPlanAI />;
      case 'scanning':
        return <IntelliScan3D />;
      case 'fieldops':
        return <FieldOpsMobile />;
      case 'compliance':
        return <ComplianceHub />;
      case 'environment':
        return <EnvironmentalMonitor />;
      case 'supply':
        return <SupplyChain />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <MainLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </MainLayout>
  );
};

// Main App Component with Authentication
const AppWithAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return <AppContent />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <AppWithAuth />
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
