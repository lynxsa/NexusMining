import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Auth types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'operator' | 'viewer' | 'supervisor';
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  email: 'admin@nexusmining.com',
  firstName: 'System',
  lastName: 'Administrator',
  role: 'admin',
  permissions: ['*'],
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  lastLogin: new Date().toISOString(),
  isActive: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // In development, automatically authenticate with mock user
        if (import.meta.env.MODE === 'development') {
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
          return;
        }

        // Check for stored auth token
        const token = localStorage.getItem('nexus-auth-token');
        if (token) {
          // Validate token and get user data
          // For now, using mock data
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Authentication initialization failed' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Mock authentication - in production, this would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('nexus-auth-token', 'mock-jwt-token');
        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('nexus-auth-token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates: Partial<User>): void => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;
    return state.user.permissions.includes('*') || state.user.permissions.includes(permission);
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  };

  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    updateUser,
    clearError,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
