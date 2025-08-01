import type { ReactNode } from 'react';
import { useState } from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopBar } from '../components/navigation/TopBar';

interface MainLayoutProps {
  children: ReactNode;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const MainLayout = ({ children, currentView, onViewChange }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        currentView={currentView} 
        onViewChange={onViewChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
