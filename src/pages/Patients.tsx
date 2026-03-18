import React, { useState } from 'react';
import { mockPatients, type Patient } from '../services/mockData';
import Swal from 'sweetalert2';

const emptyPatient = (): Omit<Patient, 'id'> => ({
  first_name: '', last_name: '', gender: 'Male', dob: '', phone: '', email: '',
  address: '', blood_group: 'A+', emergency_contact: '', status: 'Outpatient',
});

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Patient, 'id'>>(emptyPatient());
  const [editId, setEditId] = useState<number | null>(null);

  const filtered = patients.filter(p =>
    `${p.first_name} ${p.last_name} ${p.phone} ${p.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'First and last name are required.' });
      return;
    }
    if (editId !== null) {
      setPatients(prev => prev.map(p => p.id === editId ? { ...p, ...form } : p));
      Swal.fire({ icon: 'success', title: 'Updated', text: 'Patient updated successfully.', timer: 1500, showConfirmButton: false });
    } else {
      const newId = Math.max(...patients.map(p => p.id), 0) + 1;
      setPatients(prev => [...prev, { id: newId, ...form }]);
      Swal.fire({ icon: 'success', title: 'Added', text: 'Patient added successfully.', timer: 1500, showConfirmButton: false });
    }
    setShowForm(false);
    setForm(emptyPatient());
    setEditId(null);
  };

  const handleEdit = (p: Patient) => {
    const { id, ...rest } = p;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)',
      confirmButtonText: 'Delete',
    }).then(result => {
      if (result.isConfirmed) {
        setPatients(prev => prev.filter(p => p.id !== id));
        Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Patients</h1>
        <p>Manage patient records</p>
      </div>

      <div className="page-toolbar">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="form-input" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(emptyPatient()); }}>
          + Add Patient
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input className="form-input" value={form.first_name} onChange={e => handleChange('first_name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input className="form-input" value={form.last_name} onChange={e => handleChange('last_name', e.target.value)} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-select" value={form.gender} onChange={e => handleChange('gender', e.target.value)}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input className="form-input" type="date" value={form.dob} onChange={e => handleChange('dob', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Blood Group</label>
                    <select className="form-select" value={form.blood_group} onChange={e => handleChange('blood_group', e.target.value)}>
                      {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Emergency Contact</label>
                    <input className="form-input" value={form.emergency_contact} onChange={e => handleChange('emergency_contact', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea className="form-textarea" value={form.address} onChange={e => handleChange('address', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => handleChange('status', e.target.value as Patient['status'])}>
                    <option>Outpatient</option><option>Inpatient</option><option>Discharged</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">{editId ? 'Update' : 'Add'} Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th><th>Gender</th><th>DOB</th><th>Phone</th><th>Blood Group</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.first_name} {p.last_name}</td>
                  <td>{p.gender}</td>
                  <td>{p.dob}</td>
                  <td>{p.phone}</td>
                  <td>{p.blood_group}</td>
                  <td><span className={`badge badge-${p.status === 'Inpatient' ? 'warning' : p.status === 'Outpatient' ? 'primary' : 'success'}`}>{p.status}</span></td>
                  <td className="actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No patients found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
