import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { demoUsers } from './DemoContext';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'educator' | 'school';
  phone?: string;
  bio?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // TODO: Validate token with backend
        // const user = await validateToken(token);
        // setUser(user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Check if it's a demo user
      const demoUser = demoUsers.find(user => user.email === email);
      if (demoUser && password === 'demo-password') {
        const user: User = {
          id: demoUser.id,
          email: demoUser.email,
          firstName: demoUser.firstName,
          lastName: demoUser.lastName,
          role: demoUser.role,
        };
        setUser(user);
        localStorage.setItem('token', 'demo-token');
        return;
      }

      // If not a demo user, proceed with actual login
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      // TODO: Implement actual registration logic with backend
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Registration failed');

      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      setUser({
        id: responseData.user.id,
        email: responseData.user.email,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        role: responseData.user.role,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
