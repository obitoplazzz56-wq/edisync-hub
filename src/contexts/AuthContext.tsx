import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { demoUsers, type User, type UserRole } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    // In production, this calls your Express API:
    // const res = await api.post('/auth/login', { username, password });
    // localStorage.setItem('token', res.data.token);
    // localStorage.setItem('user', JSON.stringify(res.data.user));

    // Mock login for development:
    const found = demoUsers.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      localStorage.setItem('token', 'mock-jwt-token-' + found.id);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export type { UserRole, User };
