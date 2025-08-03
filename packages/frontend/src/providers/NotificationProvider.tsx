import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL' };

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fullNotification: Notification = {
      id,
      duration: 5000,
      ...notification,
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: fullNotification });

    // Auto-remove notification after duration (unless persistent)
    if (!fullNotification.persistent && fullNotification.duration) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, fullNotification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const contextValue: NotificationContextType = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Notification container component
const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

// Individual notification item
const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: () => void;
}> = ({ notification, onRemove }) => {
  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📄';
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ${getTypeStyles()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-lg flex-shrink-0">{getIcon()}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
            {notification.message && (
              <p className="text-sm opacity-90">{notification.message}</p>
            )}
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="mt-2 text-sm font-medium underline hover:no-underline"
              >
                {notification.action.label}
              </button>
            )}
          </div>
        </div>
        <button
          onClick={onRemove}
          className="ml-3 flex-shrink-0 text-lg opacity-60 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Hook to use notifications
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
