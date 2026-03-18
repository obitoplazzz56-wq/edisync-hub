import React from 'react';
import { mockBills } from '../services/mockData';

const MyBills: React.FC = () => {
  // Demo: show bills for patient_id=1
  const bills = mockBills.filter(b => b.patient_id === 1);
  const totalOwed = bills.filter(b => b.status === 'Unpaid').reduce((s, b) => s + b.total, 0);

  return (
    <div>
      <div className="page-header">
        <h1>My Bills</h1>
        <p>View your billing history and payment status</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Bills</span>
          <div className="stat-value">{bills.length}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Amount Owed</span>
          <div className="stat-value" style={{ color: totalOwed > 0 ? 'var(--danger)' : 'var(--success)' }}>
            ${totalOwed.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Consultation</th><th>Medicine</th><th>Room</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {bills.map(b => (
                <tr key={b.id}>
                  <td>{b.date}</td>
                  <td>${b.consultation_fee}</td>
                  <td>${b.medicine_fee}</td>
                  <td>${b.room_fee}</td>
                  <td><strong>${b.total.toLocaleString()}</strong></td>
                  <td><span className={`badge badge-${b.status === 'Paid' ? 'success' : 'danger'}`}>{b.status}</span></td>
                </tr>
              ))}
              {bills.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No bills found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBills;
