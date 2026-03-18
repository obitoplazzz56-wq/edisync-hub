import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Swal from 'sweetalert2';
import '../styles/login.css';

const demoAccounts = [
  { label: 'Admin', username: 'admin', password: 'admin123' },
  { label: 'Doctor', username: 'dr_smith', password: 'doctor123' },
  { label: 'Nurse', username: 'nurse_jones', password: 'nurse123' },
  { label: 'Reception', username: 'reception1', password: 'reception123' },
  { label: 'Accounts', username: 'accounts1', password: 'accounts123' },
  { label: 'Patient', username: 'patient1', password: 'patient123' },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please enter both username and password.' });
      return;
    }
    setLoading(true);
    const success = await login(username.trim(), password);
    setLoading(false);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Invalid username or password.' });
    }
  };

  const fillDemo = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-brand-icon">M</div>
            <h1>MEDICORE HMS</h1>
            <p>Hospital Management System</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-demo">
            <p>Demo Accounts (click to fill)</p>
            <div className="demo-accounts">
              {demoAccounts.map(acc => (
                <button
                  key={acc.username}
                  className="demo-btn"
                  type="button"
                  onClick={() => fillDemo(acc.username, acc.password)}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
