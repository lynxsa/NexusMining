import React, { useState, useEffect } from 'react';
import type { User, AuthContextType, Permission } from '../types/auth';
import { AuthContext } from './AuthContextBase';
import { DEMO_USERS } from '../data/demoUsers';

// Mock users for demo purposes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && (password === 'demo123' || password === 'password')) {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      setIsAuthenticated(true);
      localStorage.setItem('nexus_user', JSON.stringify(updatedUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nexus_user');
  };

  const hasPermission = (permission: Permission): boolean => {
    return user ? user.permissions.includes(permission) : false;
  };

  const canAccessModule = (module: string): boolean => {
    if (!user) return false;
    
    const modulePermissions: Record<string, Permission[]> = {
      'dashboard': ['dashboard_view'],
      'assets': ['assets_view', 'assets_manage'],
      'safety': ['safety_view', 'safety_manage'],
      'analytics': ['analytics_view'],
      'planning': ['planning_view', 'planning_manage'],
      'compliance': ['compliance_view', 'compliance_manage'],
      'environment': ['environment_view', 'environment_manage'],
      'supply': ['supply_view', 'supply_manage'],
      'scanning': ['scanning_view', 'scanning_operate'],
      'fieldops': ['fieldops_view', 'fieldops_manage'],
      'worker': ['worker_view', 'worker_manage'],
      'energy': ['energy_view', 'energy_manage'],
      'workshop': ['workshop_view', 'workshop_manage'],
      'twin': ['dashboard_view'], // Digital twin accessible to all dashboard users
      'mobile': ['safety_view'], // Mobile reporting accessible to safety viewers
    };

    const requiredPermissions = modulePermissions[module] || [];
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    canAccessModule
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
