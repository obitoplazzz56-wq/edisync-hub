import React, { useState } from 'react';
import { mockAppointments, mockPatients, demoUsers } from '../services/mockData.js';
import Swal from 'sweetalert2';

const doctors = demoUsers.filter(u => u.role === 'doctor');

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');

  const [form, setForm] = useState({
    patient_id: '', doctor_id: '', appointment_date: '', appointment_time: '', reason: '', notes: '',
  });

  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient_id || !form.doctor_id || !form.appointment_date || !form.appointment_time) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'Please fill all required fields.' });
      return;
    }
    const patient = mockPatients.find(p => p.id === Number(form.patient_id));
    const doctor = doctors.find(d => d.id === Number(form.doctor_id));
    const newAppt = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      patient_id: Number(form.patient_id),
      patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
      doctor_id: Number(form.doctor_id),
      doctor_name: doctor?.full_name || 'Unknown',
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      reason: form.reason,
      notes: form.notes,
      status: 'Scheduled',
    };
    setAppointments(prev => [newAppt, ...prev]);
    setShowForm(false);
    setForm({ patient_id: '', doctor_id: '', appointment_date: '', appointment_time: '', reason: '', notes: '' });
    Swal.fire({ icon: 'success', title: 'Created', text: 'Appointment created.', timer: 1500, showConfirmButton: false });
  };

  const updateStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    Swal.fire({ icon: 'success', title: 'Updated', timer: 1200, showConfirmButton: false });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Appointments</h1>
        <p>Schedule and manage appointments</p>
      </div>

      <div className="page-toolbar">
        <div className="filter-bar">
          {['All', 'Scheduled', 'Completed', 'Cancelled'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New Appointment</button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Appointment</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Patient *</label>
                    <select className="form-select" value={form.patient_id} onChange={e => setForm(p => ({ ...p, patient_id: e.target.value }))}>
                      <option value="">Select patient</option>
                      {mockPatients.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Doctor *</label>
                    <select className="form-select" value={form.doctor_id} onChange={e => setForm(p => ({ ...p, doctor_id: e.target.value }))}>
                      <option value="">Select doctor</option>
                      {doctors.map(d => <option key={d.id} value={d.id}>{d.full_name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input className="form-input" type="date" value={form.appointment_date} onChange={e => setForm(p => ({ ...p, appointment_date: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time *</label>
                    <input className="form-input" type="time" value={form.appointment_time} onChange={e => setForm(p => ({ ...p, appointment_time: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Reason</label>
                  <input className="form-input" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Create Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>{a.patient_name}</td>
                  <td>{a.doctor_name}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time}</td>
                  <td>{a.reason}</td>
                  <td><span className={`badge badge-${a.status === 'Scheduled' ? 'info' : a.status === 'Completed' ? 'success' : 'danger'}`}>{a.status}</span></td>
                  <td className="actions">
                    {a.status === 'Scheduled' && (
                      <>
                        <button className="btn btn-sm btn-success" onClick={() => updateStatus(a.id, 'Completed')}>Complete</button>
                        <button className="btn btn-sm btn-danger" onClick={() => updateStatus(a.id, 'Cancelled')}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No appointments found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
