import type { User } from '../types/auth';
import { ROLE_PERMISSIONS } from '../types/auth';

export const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Thabo Mthembu',
    email: 'admin@nexusmining.co.za',
    role: 'admin',
    department: 'IT Management',
    permissions: ROLE_PERMISSIONS.admin,
    avatar: 'https://ui-avatars.com/api/?name=Thabo+Mthembu&background=3b82f6&color=fff',
    lastLogin: new Date('2024-01-08T09:30:00'),
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah van der Merwe',
    email: 'operator@nexusmining.co.za',
    role: 'mining_operator',
    department: 'Mining Operations',
    permissions: ROLE_PERMISSIONS.mining_operator,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+van+der+Merwe&background=0ea5e9&color=fff',
    lastLogin: new Date('2024-01-08T08:15:00'),
    isActive: true
  },
  {
    id: '3',
    name: 'Mandla Dlamini',
    email: 'safety@nexusmining.co.za',
    role: 'safety_officer',
    department: 'Health & Safety',
    permissions: ROLE_PERMISSIONS.safety_officer,
    avatar: 'https://ui-avatars.com/api/?name=Mandla+Dlamini&background=10b981&color=fff',
    lastLogin: new Date('2024-01-08T07:45:00'),
    isActive: true
  },
  {
    id: '4',
    name: 'Johan Pretorius',
    email: 'maintenance@nexusmining.co.za',
    role: 'maintenance_tech',
    department: 'Maintenance',
    permissions: ROLE_PERMISSIONS.maintenance_tech,
    avatar: 'https://ui-avatars.com/api/?name=Johan+Pretorius&background=f59e0b&color=fff',
    lastLogin: new Date('2024-01-08T06:30:00'),
    isActive: true
  }
];
