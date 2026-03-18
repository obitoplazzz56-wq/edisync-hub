import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  mockPatients, mockAppointments, mockBills, mockWards,
  mockDashboardStats, mockTreatments,
} from '../services/mockData.js';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const isPatient = user.role === 'patient';

  if (isPatient) return <PatientDashboard />;
  return <StaffDashboard />;
};

const StatCard = ({ label, value, icon, color, trend }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <span className="stat-label">{label}</span>
      <div className={`stat-icon ${color}`}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
      </div>
    </div>
    <div className="stat-value">{value}</div>
    {trend && <span className="stat-trend">{trend}</span>}
  </div>
);

const StaffDashboard = () => {
  const stats = mockDashboardStats;
  const recentPatients = mockPatients.slice(0, 4);
  const upcomingAppts = mockAppointments.filter(a => a.status === 'Scheduled').slice(0, 5);
  const recentBills = mockBills.slice(0, 4);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>System Overview</h1>
        <p>Real-time hospital operations status</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Patients" value={stats.totalPatients} icon="👥" color="blue" trend="+12% vs last month" />
        <StatCard label="Today's Appointments" value={stats.todayAppointments} icon="📅" color="green" />
        <StatCard label="Admitted Patients" value={stats.admittedPatients} icon="🏥" color="yellow" />
        <StatCard label="Pending Bills" value={stats.pendingBills} icon="💰" color="red" />
        <StatCard label="Treatments Done" value={stats.treatmentsCompleted} icon="💊" color="green" />
        <StatCard label="Available Beds" value={`${stats.availableBeds}/${stats.totalBeds}`} icon="🛏️" color="blue" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Recent Patients</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Status</th><th>Blood Group</th></tr>
              </thead>
              <tbody>
                {recentPatients.map(p => (
                  <tr key={p.id}>
                    <td>{p.first_name} {p.last_name}</td>
                    <td><span className={`badge badge-${p.status === 'Inpatient' ? 'warning' : p.status === 'Outpatient' ? 'primary' : 'success'}`}>{p.status}</span></td>
                    <td>{p.blood_group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Upcoming Appointments</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Patient</th><th>Doctor</th><th>Time</th><th>Status</th></tr>
              </thead>
              <tbody>
                {upcomingAppts.map(a => (
                  <tr key={a.id}>
                    <td>{a.patient_name}</td>
                    <td>{a.doctor_name}</td>
                    <td>{a.appointment_time}</td>
                    <td><span className="badge badge-info">{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Ward Occupancy</h3>
          {mockWards.map(w => {
            const pct = Math.round((w.occupied_beds / w.total_beds) * 100);
            const level = pct > 80 ? 'high' : pct > 50 ? 'medium' : 'low';
            return (
              <div key={w.id} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                  <span>{w.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{w.occupied_beds}/{w.total_beds}</span>
                </div>
                <div className="ward-bar">
                  <div className={`ward-bar-fill ${level}`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <h3>Recent Bills</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Patient</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recentBills.map(b => (
                  <tr key={b.id}>
                    <td>{b.patient_name}</td>
                    <td>${b.total.toLocaleString()}</td>
                    <td><span className={`badge badge-${b.status === 'Paid' ? 'success' : 'danger'}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientDashboard = () => {
  const upcomingAppts = mockAppointments.filter(a => a.status === 'Scheduled' && a.patient_id === 1).slice(0, 5);
  const recentTreatments = mockTreatments.filter(t => t.patient_name === 'John Doe').slice(0, 3);
  const pendingBills = mockBills.filter(b => b.patient_id === 1 && b.status === 'Unpaid');

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>My Dashboard</h1>
        <p>Your health at a glance</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Upcoming Appointments" value={upcomingAppts.length} icon="📅" color="blue" />
        <StatCard label="Active Treatments" value={recentTreatments.length} icon="💊" color="green" />
        <StatCard label="Pending Bills" value={pendingBills.length} icon="💰" color="red" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Upcoming Appointments</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th></tr></thead>
              <tbody>
                {upcomingAppts.map(a => (
                  <tr key={a.id}>
                    <td>{a.doctor_name}</td>
                    <td>{a.appointment_date}</td>
                    <td>{a.appointment_time}</td>
                    <td>{a.reason}</td>
                  </tr>
                ))}
                {upcomingAppts.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No upcoming appointments</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Recent Treatments</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>Diagnosis</th><th>Doctor</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {recentTreatments.map(t => (
                  <tr key={t.id}>
                    <td>{t.diagnosis}</td>
                    <td>{t.doctor_name}</td>
                    <td>{t.date}</td>
                    <td><span className={`badge badge-${t.status === 'Completed' ? 'success' : 'warning'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
