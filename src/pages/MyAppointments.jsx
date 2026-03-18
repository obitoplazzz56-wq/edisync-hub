import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { mockAppointments } from '../services/mockData.js';

const MyAppointments = () => {
  const { user } = useAuth();
  if (!user) return null;

  const appointments = user.role === 'patient'
    ? mockAppointments.filter(a => a.patient_id === 1)
    : mockAppointments.filter(a => a.doctor_id === user.id);

  const upcoming = appointments.filter(a => a.status === 'Scheduled');
  const past = appointments.filter(a => a.status !== 'Scheduled');

  return (
    <div>
      <div className="page-header">
        <h1>My Appointments</h1>
        <p>{user.role === 'patient' ? 'Your scheduled and past appointments' : 'Your patient appointments'}</p>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
        <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1rem', fontWeight: 600 }}>Upcoming</h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>{user.role === 'patient' ? 'Doctor' : 'Patient'}</th>
                <th>Date</th><th>Time</th><th>Reason</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map(a => (
                <tr key={a.id}>
                  <td>{user.role === 'patient' ? a.doctor_name : a.patient_name}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time}</td>
                  <td>{a.reason}</td>
                  <td><span className="badge badge-info">{a.status}</span></td>
                </tr>
              ))}
              {upcoming.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No upcoming appointments</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1rem', fontWeight: 600 }}>Past Appointments</h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>{user.role === 'patient' ? 'Doctor' : 'Patient'}</th>
                <th>Date</th><th>Time</th><th>Reason</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {past.map(a => (
                <tr key={a.id}>
                  <td>{user.role === 'patient' ? a.doctor_name : a.patient_name}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time}</td>
                  <td>{a.reason}</td>
                  <td><span className={`badge badge-${a.status === 'Completed' ? 'success' : 'danger'}`}>{a.status}</span></td>
                </tr>
              ))}
              {past.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No past appointments</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
