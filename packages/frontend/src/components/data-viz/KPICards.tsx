import React from 'react';
import { 
  CubeIcon, 
  ExclamationTriangleIcon,
  BoltIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  const TrendIcon = changeType === 'increase' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  const trendColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </p>
              {unit && (
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export const KPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Production Rate',
      value: '2,847',
      unit: 't/day',
      change: 12.5,
      changeType: 'increase' as const,
      icon: CubeIcon,
      color: 'blue' as const,
    },
    {
      title: 'Equipment Uptime',
      value: '94.2',
      unit: '%',
      change: 3.8,
      changeType: 'increase' as const,
      icon: BoltIcon,
      color: 'green' as const,
    },
    {
      title: 'Safety Score',
      value: '98.7',
      unit: '%',
      change: 1.2,
      changeType: 'increase' as const,
      icon: ShieldCheckIcon,
      color: 'purple' as const,
    },
    {
      title: 'Active Alerts',
      value: '7',
      unit: '',
      change: 23.1,
      changeType: 'decrease' as const,
      icon: ExclamationTriangleIcon,
      color: 'yellow' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};
