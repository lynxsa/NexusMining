import React, { useState } from 'react';
import { 
  HomeIcon, 
  CubeIcon, 
  ShieldCheckIcon, 
  CogIcon,
  ChartBarIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  BeakerIcon,
  UserGroupIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { UserProfile } from '../auth/UserProfile';
import { CurrencySelector } from './CurrencySelector';

interface NavigationGroup {
  name: string;
  items: NavigationItem[];
}

interface NavigationItem {
  name: string;
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  description?: string;
  requiredModule?: string; // For role-based access
}

const navigationStructure: NavigationGroup[] = [
  {
    name: 'Executive',
    items: [
      { name: 'Dashboard', id: 'dashboard', icon: HomeIcon, description: 'Executive overview and KPIs', requiredModule: 'dashboard' },
      { name: 'Digital Twin Hub', id: 'twin', icon: MapIcon, description: '3D mine visualization', requiredModule: 'twin' },
      { name: 'SmartOps Insights', id: 'analytics', icon: ChartBarIcon, description: 'Advanced analytics dashboard', requiredModule: 'analytics' },
    ]
  },
  {
    name: 'Operations',
    items: [
      { name: 'AssetTrack AI', id: 'assets', icon: CubeIcon, description: 'Equipment monitoring & predictive maintenance', requiredModule: 'assets' },
      { name: 'SmartPlan AI', id: 'planning', icon: BeakerIcon, description: 'AI-driven planning & optimization', requiredModule: 'planning' },
      { name: 'IntelliScan 3D', id: 'scanning', icon: EyeIcon, description: '3D scanning & volume analysis', requiredModule: 'scanning' },
      { name: 'FieldOps Mobile', id: 'fieldops', icon: DevicePhoneMobileIcon, description: 'Mobile workforce management', requiredModule: 'fieldops' },
    ]
  },
  {
    name: 'Safety & Compliance',
    items: [
      { name: 'HazardVision™', id: 'safety', icon: ShieldCheckIcon, description: 'AI computer vision safety monitoring', badge: 'Live', requiredModule: 'safety' },
      { name: 'ThibaAlert', id: 'mobile', icon: DevicePhoneMobileIcon, description: 'Mobile hazard reporting system', requiredModule: 'mobile' },
      { name: 'ConnectedWorker', id: 'worker', icon: UserGroupIcon, description: 'Wearable tags & worker safety', requiredModule: 'worker' },
      { name: 'Compliance Hub', id: 'compliance', icon: DocumentTextIcon, description: 'Regulatory reporting & audits', requiredModule: 'compliance' },
    ]
  },
  {
    name: 'Sustainability',
    items: [
      { name: 'Energy & ESG Hub', id: 'energy', icon: BoltIcon, description: 'Energy management & sustainability', requiredModule: 'energy' },
      { name: 'Environmental Monitor', id: 'environment', icon: GlobeAltIcon, description: 'Environmental impact tracking', requiredModule: 'environment' },
    ]
  },
  {
    name: 'Workshop & Supply',
    items: [
      { name: 'WorkshopOps', id: 'workshop', icon: WrenchScrewdriverIcon, description: 'Parts management & fabrication', requiredModule: 'workshop' },
      { name: 'Supply Chain', id: 'supply', icon: ClockIcon, description: 'Vendor management & procurement', requiredModule: 'supply' },
    ]
  },
  {
    name: 'System',
    items: [
      { name: 'Settings', id: 'settings', icon: CogIcon, description: 'System configuration', requiredModule: 'settings' },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentView = 'dashboard', onViewChange }) => {
  const { darkMode } = useTheme();
  const { canAccessModule } = useAuth();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupName: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupName)) {
      newCollapsed.delete(groupName);
    } else {
      newCollapsed.add(groupName);
    }
    setCollapsedGroups(newCollapsed);
  };

  const handleNavClick = (viewId: string) => {
    if (onViewChange) {
      onViewChange(viewId);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" 
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        border-r flex flex-col shadow-xl lg:shadow-none
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Nexus Mining SA
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                South African Mining Operations
              </p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationStructure.map((group) => {
            const isCollapsed = collapsedGroups.has(group.name);
            
            // Filter items based on user permissions
            const accessibleItems = group.items.filter(item => 
              !item.requiredModule || canAccessModule(item.requiredModule)
            );
            
            // Don't show group if no accessible items
            if (accessibleItems.length === 0) return null;
            
            return (
              <div key={group.name} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <span className="uppercase tracking-wider">{group.name}</span>
                  {isCollapsed ? (
                    <ChevronRightIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>

                {/* Group Items */}
                {!isCollapsed && (
                  <div className="space-y-1 ml-2">
                    {accessibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.id)}
                          className={`
                            w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                            ${isActive
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                            }
                          `}
                        >
                          <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.name}</span>
                              {item.badge && (
                                <span className={`
                                  ml-2 px-2 py-1 text-xs font-medium rounded-full
                                  ${item.badge === 'Live' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                  }
                                `}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {/* User Profile */}
          <UserProfile />
          
          {/* Currency Selector */}
          <CurrencySelector />
          
          {/* Version Info */}
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>Nexus Mining v2.0.0</p>
            <p className="text-blue-600 dark:text-blue-400">AI-Powered Mining Platform</p>
          </div>
        </div>
      </div>
    </>
  );
};
