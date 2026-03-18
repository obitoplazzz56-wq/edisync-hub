import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/header.css';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <h2 className="header-title">{title || 'Dashboard'}</h2>
      </div>
      <div className="header-right">
        <button className="header-notification">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="header-notification-dot"></span>
        </button>
        {user && (
          <div className="header-user-info">
            <span className="header-user-dot"></span>
            <span>{user.full_name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'capitalize' }}>({user.role})</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
