import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Page not found</p>
        <a href="/login" style={{ color: 'var(--primary)' }}>Return to Login</a>
      </div>
    </div>
  );
};

export default NotFound;
