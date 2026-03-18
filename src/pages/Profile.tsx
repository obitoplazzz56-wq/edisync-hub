import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockPatients, demoUsers } from '../services/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  // For patient role, show patient data; for staff, show user data
  const isPatient = user.role === 'patient';
  const patientData = isPatient ? mockPatients.find(p => p.email === user.email) : null;

  return (
    <div className="profile-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Your personal information</p>
      </div>

      <div className="card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="profile-name">{user.full_name}</div>
            <div className="profile-role">{user.role}</div>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <div className="profile-field-label">Full Name</div>
            <div className="profile-field-value">{user.full_name}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Email</div>
            <div className="profile-field-value">{user.email}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Username</div>
            <div className="profile-field-value">{user.username}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Role</div>
            <div className="profile-field-value" style={{ textTransform: 'capitalize' }}>{user.role}</div>
          </div>

          {patientData && (
            <>
              <div className="profile-field">
                <div className="profile-field-label">Phone</div>
                <div className="profile-field-value">{patientData.phone}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field-label">Gender</div>
                <div className="profile-field-value">{patientData.gender}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field-label">Date of Birth</div>
                <div className="profile-field-value">{patientData.dob}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field-label">Blood Group</div>
                <div className="profile-field-value">{patientData.blood_group}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field-label">Address</div>
                <div className="profile-field-value">{patientData.address}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field-label">Status</div>
                <div className="profile-field-value">
                  <span className={`badge badge-${patientData.status === 'Inpatient' ? 'warning' : 'primary'}`}>{patientData.status}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
