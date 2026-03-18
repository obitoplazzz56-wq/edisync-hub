import React, { createContext, useContext, useState, useCallback } from 'react';
import { demoUsers } from '../services/mockData.js';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (username, password) => {
    // In production, call your Express API:
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
