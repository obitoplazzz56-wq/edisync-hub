import React, { useState } from 'react';
import { mockSalaries, demoUsers, type SalaryRecord } from '../services/mockData';
import Swal from 'sweetalert2';

const staffMembers = demoUsers.filter(u => u.role !== 'patient');

const Salary: React.FC = () => {
  const [salaries, setSalaries] = useState<SalaryRecord[]>(mockSalaries);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ staff_id: '', amount: '', month: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.staff_id || !form.amount || !form.month) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'All fields are required.' });
      return;
    }
    const staff = staffMembers.find(s => s.id === Number(form.staff_id));
    const newSalary: SalaryRecord = {
      id: Math.max(...salaries.map(s => s.id), 0) + 1,
      staff_id: Number(form.staff_id),
      staff_name: staff?.full_name || 'Unknown',
      role: staff?.role || 'unknown',
      amount: Number(form.amount),
      month: form.month,
      status: 'Pending',
      paid_date: null,
    };
    setSalaries(prev => [newSalary, ...prev]);
    setShowForm(false);
    setForm({ staff_id: '', amount: '', month: '' });
    Swal.fire({ icon: 'success', title: 'Salary Processed', timer: 1500, showConfirmButton: false });
  };

  const markPaid = (id: number) => {
    setSalaries(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'Paid' as const, paid_date: new Date().toISOString().split('T')[0] } : s
    ));
    Swal.fire({ icon: 'success', title: 'Marked as Paid', timer: 1200, showConfirmButton: false });
  };

  const totalPending = salaries.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Salary Management</h1>
        <p>Process and track staff salary payments</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Staff</span>
          <div className="stat-value">{staffMembers.length}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Payroll</span>
          <div className="stat-value">${salaries.reduce((s, r) => s + r.amount, 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending Payments</span>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>${totalPending.toLocaleString()}</div>
        </div>
      </div>

      <div className="page-toolbar">
        <div></div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Process Salary</button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Process Salary</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Staff Member *</label>
                  <select className="form-select" value={form.staff_id} onChange={e => setForm(p => ({ ...p, staff_id: e.target.value }))}>
                    <option value="">Select staff</option>
                    {staffMembers.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.role})</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Amount ($) *</label>
                    <input className="form-input" type="number" min="0" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Month *</label>
                    <input className="form-input" type="month" value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Process Salary</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Staff</th><th>Role</th><th>Amount</th><th>Month</th><th>Status</th><th>Paid Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {salaries.map(s => (
                <tr key={s.id}>
                  <td>{s.staff_name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{s.role}</td>
                  <td>${s.amount.toLocaleString()}</td>
                  <td>{s.month}</td>
                  <td><span className={`badge badge-${s.status === 'Paid' ? 'success' : 'warning'}`}>{s.status}</span></td>
                  <td>{s.paid_date || '—'}</td>
                  <td>
                    {s.status === 'Pending' && (
                      <button className="btn btn-sm btn-success" onClick={() => markPaid(s.id)}>Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
