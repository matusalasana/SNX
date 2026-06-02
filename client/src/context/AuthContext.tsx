import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  isMockMode: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const checkAuthStatus = async () => {
    try {
      setIsChecking(true);
      const res = await api.get('/auth/me');
      if (res.data?.authenticated) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  const checkDatabaseStatus = async () => {
    try {
      const res = await api.get('/auth/status');
      setIsMockMode(!!res.data?.isMockMode);
    } catch {
      setIsMockMode(true);
    }
  };

  const login = async (username: string, password: string): Promise<User> => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const userProfile = res.data.user;
      setUser(userProfile);
      setIsAuthenticated(true);
      return userProfile;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed.');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout server request failed:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    checkDatabaseStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isChecking,
      isMockMode,
      login,
      logout,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
