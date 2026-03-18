// Mock data and handlers for development without a backend
// When you connect a real backend, remove this file and the mock flag

// Demo users
export const demoUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', full_name: 'System Administrator', email: 'admin@medicore.com' },
  { id: 2, username: 'dr_smith', password: 'doctor123', role: 'doctor', full_name: 'Dr. Sarah Smith', email: 'sarah.smith@medicore.com' },
  { id: 3, username: 'nurse_jones', password: 'nurse123', role: 'nurse', full_name: 'Emily Jones', email: 'emily.jones@medicore.com' },
  { id: 4, username: 'reception1', password: 'reception123', role: 'reception', full_name: 'Mike Chen', email: 'mike.chen@medicore.com' },
  { id: 5, username: 'accounts1', password: 'accounts123', role: 'accounts', full_name: 'Lisa Wong', email: 'lisa.wong@medicore.com' },
  { id: 6, username: 'patient1', password: 'patient123', role: 'patient', full_name: 'John Doe', email: 'john.doe@email.com' },
];

export const mockPatients = [
  { id: 1, first_name: 'John', last_name: 'Doe', gender: 'Male', dob: '1985-03-15', phone: '555-0101', email: 'john.doe@email.com', address: '123 Main St, Springfield', blood_group: 'A+', emergency_contact: '555-0102', status: 'Outpatient' },
  { id: 2, first_name: 'Jane', last_name: 'Wilson', gender: 'Female', dob: '1990-07-22', phone: '555-0103', email: 'jane.w@email.com', address: '456 Oak Ave, Springfield', blood_group: 'B-', emergency_contact: '555-0104', status: 'Inpatient' },
  { id: 3, first_name: 'Robert', last_name: 'Brown', gender: 'Male', dob: '1978-11-08', phone: '555-0105', email: 'rbrown@email.com', address: '789 Pine Rd, Springfield', blood_group: 'O+', emergency_contact: '555-0106', status: 'Outpatient' },
  { id: 4, first_name: 'Maria', last_name: 'Garcia', gender: 'Female', dob: '1995-01-30', phone: '555-0107', email: 'mgarcia@email.com', address: '321 Elm St, Springfield', blood_group: 'AB+', emergency_contact: '555-0108', status: 'Discharged' },
  { id: 5, first_name: 'James', last_name: 'Taylor', gender: 'Male', dob: '1968-09-12', phone: '555-0109', email: 'jtaylor@email.com', address: '654 Cedar Ln, Springfield', blood_group: 'A-', emergency_contact: '555-0110', status: 'Inpatient' },
];

export const mockAppointments = [
  { id: 1, patient_id: 1, patient_name: 'John Doe', doctor_id: 2, doctor_name: 'Dr. Sarah Smith', appointment_date: '2026-03-18', appointment_time: '09:00', reason: 'General Checkup', notes: 'Annual physical', status: 'Scheduled' },
  { id: 2, patient_id: 2, patient_name: 'Jane Wilson', doctor_id: 2, doctor_name: 'Dr. Sarah Smith', appointment_date: '2026-03-18', appointment_time: '10:30', reason: 'Follow-up', notes: 'Post-surgery follow-up', status: 'Scheduled' },
  { id: 3, patient_id: 3, patient_name: 'Robert Brown', doctor_id: 2, doctor_name: 'Dr. Sarah Smith', appointment_date: '2026-03-17', appointment_time: '14:00', reason: 'Chest Pain', notes: '', status: 'Completed' },
  { id: 4, patient_id: 4, patient_name: 'Maria Garcia', doctor_id: 2, doctor_name: 'Dr. Sarah Smith', appointment_date: '2026-03-19', appointment_time: '11:00', reason: 'Lab Results', notes: 'Blood work review', status: 'Scheduled' },
];

export const mockTreatments = [
  { id: 1, appointment_id: 3, patient_name: 'Robert Brown', doctor_name: 'Dr. Sarah Smith', diagnosis: 'Mild Angina', medicines: 'Nitroglycerin, Aspirin', notes: 'Follow up in 2 weeks', date: '2026-03-17', status: 'Ongoing' },
  { id: 2, appointment_id: 1, patient_name: 'John Doe', doctor_name: 'Dr. Sarah Smith', diagnosis: 'Hypertension Stage 1', medicines: 'Lisinopril 10mg', notes: 'Diet modification advised', date: '2026-03-15', status: 'Completed' },
  { id: 3, appointment_id: 2, patient_name: 'Jane Wilson', doctor_name: 'Dr. Sarah Smith', diagnosis: 'Post-Op Recovery', medicines: 'Acetaminophen, Antibiotics', notes: 'Wound healing well', date: '2026-03-16', status: 'Ongoing' },
];

export const mockWards = [
  { id: 1, name: 'General Ward A', type: 'General', total_beds: 20, occupied_beds: 14 },
  { id: 2, name: 'General Ward B', type: 'General', total_beds: 20, occupied_beds: 8 },
  { id: 3, name: 'ICU', type: 'Intensive Care', total_beds: 10, occupied_beds: 7 },
  { id: 4, name: 'Pediatric Ward', type: 'Pediatric', total_beds: 15, occupied_beds: 5 },
  { id: 5, name: 'Maternity Ward', type: 'Maternity', total_beds: 12, occupied_beds: 9 },
];

export const mockAdmissions = [
  { id: 1, patient_id: 2, patient_name: 'Jane Wilson', ward_id: 1, ward_name: 'General Ward A', bed_number: 'A-05', admitted_date: '2026-03-12', discharged_date: null, status: 'Active' },
  { id: 2, patient_id: 5, patient_name: 'James Taylor', ward_id: 3, ward_name: 'ICU', bed_number: 'ICU-03', admitted_date: '2026-03-15', discharged_date: null, status: 'Active' },
  { id: 3, patient_id: 4, patient_name: 'Maria Garcia', ward_id: 1, ward_name: 'General Ward A', bed_number: 'A-12', admitted_date: '2026-03-10', discharged_date: '2026-03-16', status: 'Discharged' },
];

export const mockBills = [
  { id: 1, patient_id: 1, patient_name: 'John Doe', consultation_fee: 150, medicine_fee: 75, room_fee: 0, total: 225, date: '2026-03-15', status: 'Paid' },
  { id: 2, patient_id: 2, patient_name: 'Jane Wilson', consultation_fee: 200, medicine_fee: 320, room_fee: 1500, total: 2020, date: '2026-03-12', status: 'Unpaid' },
  { id: 3, patient_id: 3, patient_name: 'Robert Brown', consultation_fee: 150, medicine_fee: 180, room_fee: 0, total: 330, date: '2026-03-17', status: 'Paid' },
  { id: 4, patient_id: 5, patient_name: 'James Taylor', consultation_fee: 500, medicine_fee: 890, room_fee: 3000, total: 4390, date: '2026-03-15', status: 'Unpaid' },
];

export const mockSalaries = [
  { id: 1, staff_id: 2, staff_name: 'Dr. Sarah Smith', role: 'doctor', amount: 12000, month: '2026-03', status: 'Paid', paid_date: '2026-03-01' },
  { id: 2, staff_id: 3, staff_name: 'Emily Jones', role: 'nurse', amount: 5500, month: '2026-03', status: 'Paid', paid_date: '2026-03-01' },
  { id: 3, staff_id: 4, staff_name: 'Mike Chen', role: 'reception', amount: 4000, month: '2026-03', status: 'Pending', paid_date: null },
  { id: 4, staff_id: 5, staff_name: 'Lisa Wong', role: 'accounts', amount: 4500, month: '2026-03', status: 'Pending', paid_date: null },
];

export const mockDashboardStats = {
  totalPatients: 248,
  todayAppointments: 12,
  admittedPatients: 43,
  pendingBills: 18,
  treatmentsCompleted: 156,
  totalBeds: 77,
  availableBeds: 34,
};
