import React, { useState } from 'react';
import { mockBills, mockPatients, type Bill } from '../services/mockData';
import Swal from 'sweetalert2';

const Billing: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');

  const [form, setForm] = useState({
    patient_id: '', consultation_fee: '', medicine_fee: '', room_fee: '',
  });

  const filtered = filter === 'All' ? bills : bills.filter(b => b.status === filter);
  const totalUnpaid = bills.filter(b => b.status === 'Unpaid').reduce((s, b) => s + b.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient_id) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'Select a patient.' });
      return;
    }
    const patient = mockPatients.find(p => p.id === Number(form.patient_id));
    const c = Number(form.consultation_fee) || 0;
    const m = Number(form.medicine_fee) || 0;
    const r = Number(form.room_fee) || 0;
    const newBill: Bill = {
      id: Math.max(...bills.map(b => b.id), 0) + 1,
      patient_id: Number(form.patient_id),
      patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
      consultation_fee: c,
      medicine_fee: m,
      room_fee: r,
      total: c + m + r,
      date: new Date().toISOString().split('T')[0],
      status: 'Unpaid',
    };
    setBills(prev => [newBill, ...prev]);
    setShowForm(false);
    setForm({ patient_id: '', consultation_fee: '', medicine_fee: '', room_fee: '' });
    Swal.fire({ icon: 'success', title: 'Bill Generated', timer: 1500, showConfirmButton: false });
  };

  const markPaid = (id: number) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, status: 'Paid' as const } : b));
    Swal.fire({ icon: 'success', title: 'Marked as Paid', timer: 1200, showConfirmButton: false });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Billing</h1>
        <p>Generate and manage patient bills</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Bills</span>
          <div className="stat-value">{bills.length}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Revenue</span>
          <div className="stat-value">${bills.reduce((s, b) => s + b.total, 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending Amount</span>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>${totalUnpaid.toLocaleString()}</div>
        </div>
      </div>

      <div className="page-toolbar">
        <div className="filter-bar">
          {['All', 'Paid', 'Unpaid'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Generate Bill</button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Generate Bill</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Patient *</label>
                  <select className="form-select" value={form.patient_id} onChange={e => setForm(p => ({ ...p, patient_id: e.target.value }))}>
                    <option value="">Select patient</option>
                    {mockPatients.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Consultation Fee ($)</label>
                    <input className="form-input" type="number" min="0" value={form.consultation_fee} onChange={e => setForm(p => ({ ...p, consultation_fee: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Medicine Fee ($)</label>
                    <input className="form-input" type="number" min="0" value={form.medicine_fee} onChange={e => setForm(p => ({ ...p, medicine_fee: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Room Fee ($)</label>
                    <input className="form-input" type="number" min="0" value={form.room_fee} onChange={e => setForm(p => ({ ...p, room_fee: e.target.value }))} />
                  </div>
                </div>
                <div className="bill-summary">
                  <div className="bill-line"><span>Consultation</span><span>${Number(form.consultation_fee) || 0}</span></div>
                  <div className="bill-line"><span>Medicine</span><span>${Number(form.medicine_fee) || 0}</span></div>
                  <div className="bill-line"><span>Room</span><span>${Number(form.room_fee) || 0}</span></div>
                  <div className="bill-line total"><span>Total</span><span>${(Number(form.consultation_fee) || 0) + (Number(form.medicine_fee) || 0) + (Number(form.room_fee) || 0)}</span></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Generate Bill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Patient</th><th>Consultation</th><th>Medicine</th><th>Room</th><th>Total</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td>{b.patient_name}</td>
                  <td>${b.consultation_fee}</td>
                  <td>${b.medicine_fee}</td>
                  <td>${b.room_fee}</td>
                  <td><strong>${b.total.toLocaleString()}</strong></td>
                  <td>{b.date}</td>
                  <td><span className={`badge badge-${b.status === 'Paid' ? 'success' : 'danger'}`}>{b.status}</span></td>
                  <td>
                    {b.status === 'Unpaid' && (
                      <button className="btn btn-sm btn-success" onClick={() => markPaid(b.id)}>Mark Paid</button>
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

export default Billing;
