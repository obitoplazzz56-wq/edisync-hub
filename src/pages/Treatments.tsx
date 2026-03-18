import React, { useState } from 'react';
import { mockTreatments, mockAppointments, demoUsers, type Treatment } from '../services/mockData';
import Swal from 'sweetalert2';

const doctors = demoUsers.filter(u => u.role === 'doctor');

const Treatments: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    appointment_id: '', diagnosis: '', medicines: '', notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.appointment_id || !form.diagnosis.trim()) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'Appointment and diagnosis are required.' });
      return;
    }
    const appt = mockAppointments.find(a => a.id === Number(form.appointment_id));
    const newTreatment: Treatment = {
      id: Math.max(...treatments.map(t => t.id), 0) + 1,
      appointment_id: Number(form.appointment_id),
      patient_name: appt?.patient_name || 'Unknown',
      doctor_name: appt?.doctor_name || 'Unknown',
      diagnosis: form.diagnosis,
      medicines: form.medicines,
      notes: form.notes,
      date: new Date().toISOString().split('T')[0],
      status: 'Ongoing',
    };
    setTreatments(prev => [newTreatment, ...prev]);
    setShowForm(false);
    setForm({ appointment_id: '', diagnosis: '', medicines: '', notes: '' });
    Swal.fire({ icon: 'success', title: 'Created', text: 'Treatment recorded.', timer: 1500, showConfirmButton: false });
  };

  const markComplete = (id: number) => {
    setTreatments(prev => prev.map(t => t.id === id ? { ...t, status: 'Completed' as const } : t));
    Swal.fire({ icon: 'success', title: 'Completed', timer: 1200, showConfirmButton: false });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Treatments</h1>
        <p>Track diagnoses and treatment plans</p>
      </div>

      <div className="page-toolbar">
        <div></div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Treatment</button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Treatment</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Appointment *</label>
                  <select className="form-select" value={form.appointment_id} onChange={e => setForm(p => ({ ...p, appointment_id: e.target.value }))}>
                    <option value="">Select appointment</option>
                    {mockAppointments.map(a => (
                      <option key={a.id} value={a.id}>{a.patient_name} — {a.appointment_date} ({a.doctor_name})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Diagnosis *</label>
                  <input className="form-input" value={form.diagnosis} onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Medicines</label>
                  <input className="form-input" placeholder="Comma-separated" value={form.medicines} onChange={e => setForm(p => ({ ...p, medicines: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Add Treatment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Patient</th><th>Doctor</th><th>Diagnosis</th><th>Medicines</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {treatments.map(t => (
                <tr key={t.id}>
                  <td>{t.patient_name}</td>
                  <td>{t.doctor_name}</td>
                  <td>{t.diagnosis}</td>
                  <td>{t.medicines}</td>
                  <td>{t.date}</td>
                  <td><span className={`badge badge-${t.status === 'Completed' ? 'success' : 'warning'}`}>{t.status}</span></td>
                  <td>
                    {t.status === 'Ongoing' && (
                      <button className="btn btn-sm btn-success" onClick={() => markComplete(t.id)}>Complete</button>
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

export default Treatments;
