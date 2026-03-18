import React, { useState } from 'react';
import { mockWards, mockAdmissions, mockPatients } from '../services/mockData.js';
import Swal from 'sweetalert2';

const Wards = () => {
  const [admissions, setAdmissions] = useState(mockAdmissions);
  const [showAdmitForm, setShowAdmitForm] = useState(false);
  const [tab, setTab] = useState('wards');

  const [form, setForm] = useState({
    patient_id: '', ward_id: '', bed_number: '',
  });

  const handleAdmit = (e) => {
    e.preventDefault();
    if (!form.patient_id || !form.ward_id || !form.bed_number.trim()) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'All fields are required.' });
      return;
    }
    const patient = mockPatients.find(p => p.id === Number(form.patient_id));
    const ward = mockWards.find(w => w.id === Number(form.ward_id));
    const newAdm = {
      id: Math.max(...admissions.map(a => a.id), 0) + 1,
      patient_id: Number(form.patient_id),
      patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
      ward_id: Number(form.ward_id),
      ward_name: ward?.name || 'Unknown',
      bed_number: form.bed_number,
      admitted_date: new Date().toISOString().split('T')[0],
      discharged_date: null,
      status: 'Active',
    };
    setAdmissions(prev => [newAdm, ...prev]);
    setShowAdmitForm(false);
    setForm({ patient_id: '', ward_id: '', bed_number: '' });
    Swal.fire({ icon: 'success', title: 'Admitted', text: 'Patient admitted.', timer: 1500, showConfirmButton: false });
  };

  const handleDischarge = (id) => {
    Swal.fire({
      title: 'Confirm Discharge',
      text: 'Discharge this patient?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Discharge',
    }).then(result => {
      if (result.isConfirmed) {
        setAdmissions(prev => prev.map(a =>
          a.id === id ? { ...a, status: 'Discharged', discharged_date: new Date().toISOString().split('T')[0] } : a
        ));
        Swal.fire({ icon: 'success', title: 'Discharged', timer: 1200, showConfirmButton: false });
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Wards & Admissions</h1>
        <p>Manage ward occupancy and patient admissions</p>
      </div>

      <div className="page-tabs">
        <button className={`page-tab ${tab === 'wards' ? 'active' : ''}`} onClick={() => setTab('wards')}>Ward Overview</button>
        <button className={`page-tab ${tab === 'admissions' ? 'active' : ''}`} onClick={() => setTab('admissions')}>Admissions</button>
      </div>

      {tab === 'wards' && (
        <div className="wards-grid">
          {mockWards.map(w => {
            const pct = Math.round((w.occupied_beds / w.total_beds) * 100);
            const level = pct > 80 ? 'high' : pct > 50 ? 'medium' : 'low';
            return (
              <div className="ward-card" key={w.id}>
                <div className="ward-card-header">
                  <h4>{w.name}</h4>
                  <span className={`badge badge-${level === 'high' ? 'danger' : level === 'medium' ? 'warning' : 'success'}`}>{w.type}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {w.occupied_beds} occupied / {w.total_beds} total — {w.total_beds - w.occupied_beds} available
                </div>
                <div className="ward-occupancy">
                  <div className="ward-bar">
                    <div className={`ward-bar-fill ${level}`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="ward-occupancy-text">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'admissions' && (
        <>
          <div className="page-toolbar">
            <div></div>
            <button className="btn btn-primary" onClick={() => setShowAdmitForm(true)}>+ Admit Patient</button>
          </div>

          {showAdmitForm && (
            <div className="modal-overlay" onClick={() => setShowAdmitForm(false)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Admit Patient</h2>
                  <button className="modal-close" onClick={() => setShowAdmitForm(false)}>×</button>
                </div>
                <form onSubmit={handleAdmit}>
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
                        <label className="form-label">Ward *</label>
                        <select className="form-select" value={form.ward_id} onChange={e => setForm(p => ({ ...p, ward_id: e.target.value }))}>
                          <option value="">Select ward</option>
                          {mockWards.map(w => <option key={w.id} value={w.id}>{w.name} ({w.total_beds - w.occupied_beds} available)</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Bed Number *</label>
                        <input className="form-input" placeholder="e.g. A-05" value={form.bed_number} onChange={e => setForm(p => ({ ...p, bed_number: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" onClick={() => setShowAdmitForm(false)}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Admit Patient</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="card">
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr><th>Patient</th><th>Ward</th><th>Bed</th><th>Admitted</th><th>Discharged</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {admissions.map(a => (
                    <tr key={a.id}>
                      <td>{a.patient_name}</td>
                      <td>{a.ward_name}</td>
                      <td>{a.bed_number}</td>
                      <td>{a.admitted_date}</td>
                      <td>{a.discharged_date || '—'}</td>
                      <td><span className={`badge badge-${a.status === 'Active' ? 'info' : 'success'}`}>{a.status}</span></td>
                      <td>
                        {a.status === 'Active' && (
                          <button className="btn btn-sm btn-warning" style={{ background: 'var(--warning)', color: '#fff', borderColor: 'var(--warning)' }} onClick={() => handleDischarge(a.id)}>Discharge</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wards;
