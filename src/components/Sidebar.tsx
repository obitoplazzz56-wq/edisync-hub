import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, type UserRole } from '../contexts/AuthContext';
import '../styles/sidebar.css';

interface MenuItem {
  label: string;
  path: string;
  roles: UserRole[];
  icon: React.ReactNode;
  section?: string;
}

const menuConfig: MenuItem[] = [
  {
    label: 'Dashboard', path: '/dashboard', section: 'Overview',
    roles: ['admin', 'doctor', 'nurse', 'reception', 'accounts', 'patient'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    label: 'Patients', path: '/patients', section: 'Management',
    roles: ['admin', 'reception', 'nurse'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    label: 'Appointments', path: '/appointments', section: 'Management',
    roles: ['admin', 'reception', 'doctor'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    label: 'Treatments', path: '/treatments', section: 'Management',
    roles: ['admin', 'doctor', 'nurse'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    label: 'Wards', path: '/wards', section: 'Management',
    roles: ['admin', 'nurse'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: 'Billing', path: '/billing', section: 'Finance',
    roles: ['admin', 'accounts'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    label: 'Salary', path: '/salary', section: 'Finance',
    roles: ['admin', 'accounts'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  },
  {
    label: 'My Profile', path: '/profile', section: 'Personal',
    roles: ['patient', 'reception'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    label: 'My Appointments', path: '/my-appointments', section: 'Personal',
    roles: ['patient', 'doctor'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    label: 'My Bills', path: '/my-bills', section: 'Personal',
    roles: ['patient'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredMenu = menuConfig.filter(item => item.roles.includes(user.role));

  // Group by section
  const sections: { [key: string]: MenuItem[] } = {};
  filteredMenu.forEach(item => {
    const sec = item.section || 'General';
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(item);
  });

  const initials = user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">M</div>
        <div>
          <div className="sidebar-brand-text">MEDICORE</div>
          <span className="sidebar-brand-sub">Hospital Management</span>
        </div>
      </div>

      {Object.entries(sections).map(([section, items]) => (
        <div className="sidebar-section" key={section}>
          <div className="sidebar-section-label">{section}</div>
          <ul className="sidebar-nav">
            {items.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.full_name}</div>
            <div className="sidebar-user-role">{user.role}</div>
          </div>
          <button className="sidebar-logout" onClick={logout} title="Logout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
