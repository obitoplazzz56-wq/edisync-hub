import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Treatments from './pages/Treatments';
import Wards from './pages/Wards';
import Billing from './pages/Billing';
import Salary from './pages/Salary';
import Profile from './pages/Profile';
import MyAppointments from './pages/MyAppointments';
import MyBills from './pages/MyBills';
import NotFound from './pages/NotFound';

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
