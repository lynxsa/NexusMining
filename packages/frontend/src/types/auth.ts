export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  permissions: Permission[];
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export type UserRole = 'admin' | 'mining_operator' | 'safety_officer' | 'maintenance_tech' | 'supervisor' | 'analyst';

export type Permission = 
  | 'dashboard_view'
  | 'assets_manage'
  | 'assets_view'
  | 'safety_manage'
  | 'safety_view'
  | 'analytics_view'
  | 'analytics_advanced'
  | 'planning_manage'
  | 'planning_view'
  | 'compliance_manage'
  | 'compliance_view'
  | 'environment_manage'
  | 'environment_view'
  | 'supply_manage'
  | 'supply_view'
  | 'scanning_operate'
  | 'scanning_view'
  | 'fieldops_manage'
  | 'fieldops_view'
  | 'worker_manage'
  | 'worker_view'
  | 'energy_manage'
  | 'energy_view'
  | 'workshop_manage'
  | 'workshop_view'
  | 'admin_users'
  | 'admin_system'
  | 'admin_reports';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  canAccessModule: (module: string) => boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard_view',
    'assets_manage', 'assets_view',
    'safety_manage', 'safety_view',
    'analytics_view', 'analytics_advanced',
    'planning_manage', 'planning_view',
    'compliance_manage', 'compliance_view',
    'environment_manage', 'environment_view',
    'supply_manage', 'supply_view',
    'scanning_operate', 'scanning_view',
    'fieldops_manage', 'fieldops_view',
    'worker_manage', 'worker_view',
    'energy_manage', 'energy_view',
    'workshop_manage', 'workshop_view',
    'admin_users', 'admin_system', 'admin_reports'
  ],
  mining_operator: [
    'dashboard_view',
    'assets_view', 'assets_manage',
    'safety_view',
    'analytics_view',
    'planning_view',
    'compliance_view',
    'environment_view',
    'supply_view',
    'scanning_operate', 'scanning_view',
    'fieldops_view', 'fieldops_manage',
    'worker_view',
    'energy_view',
    'workshop_view', 'workshop_manage'
  ],
  safety_officer: [
    'dashboard_view',
    'assets_view',
    'safety_manage', 'safety_view',
    'analytics_view',
    'compliance_manage', 'compliance_view',
    'environment_view',
    'fieldops_view',
    'worker_view'
  ],
  maintenance_tech: [
    'dashboard_view',
    'assets_view', 'assets_manage',
    'safety_view',
    'analytics_view',
    'scanning_view', 'scanning_operate',
    'fieldops_view',
    'workshop_manage', 'workshop_view'
  ],
  supervisor: [
    'dashboard_view',
    'assets_view',
    'safety_view',
    'analytics_view',
    'planning_view',
    'fieldops_view', 'fieldops_manage',
    'worker_view', 'worker_manage'
  ],
  analyst: [
    'dashboard_view',
    'analytics_view', 'analytics_advanced',
    'planning_view',
    'compliance_view',
    'environment_view',
    'energy_view'
  ]
};
