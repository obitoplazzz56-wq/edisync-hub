import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Appointments from './pages/Appointments.jsx';
import Treatments from './pages/Treatments.jsx';
import Wards from './pages/Wards.jsx';
import Billing from './pages/Billing.jsx';
import Salary from './pages/Salary.jsx';
import Profile from './pages/Profile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import MyBills from './pages/MyBills.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/patients" element={
            <ProtectedRoute allowedRoles={['admin', 'reception', 'nurse']}><Patients /></ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute allowedRoles={['admin', 'reception', 'doctor']}><Appointments /></ProtectedRoute>
          } />
          <Route path="/treatments" element={
            <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse']}><Treatments /></ProtectedRoute>
          } />
          <Route path="/wards" element={
            <ProtectedRoute allowedRoles={['admin', 'nurse']}><Wards /></ProtectedRoute>
          } />
          <Route path="/billing" element={
            <ProtectedRoute allowedRoles={['admin', 'accounts']}><Billing /></ProtectedRoute>
          } />
          <Route path="/salary" element={
            <ProtectedRoute allowedRoles={['admin', 'accounts']}><Salary /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['patient', 'reception']}><Profile /></ProtectedRoute>
          } />
          <Route path="/my-appointments" element={
            <ProtectedRoute allowedRoles={['patient', 'doctor']}><MyAppointments /></ProtectedRoute>
          } />
          <Route path="/my-bills" element={
            <ProtectedRoute allowedRoles={['patient']}><MyBills /></ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
