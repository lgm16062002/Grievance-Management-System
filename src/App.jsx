import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AssignmentRules from './admin/AssignmentRules.jsx';
import CategoryManager from './admin/CategoryManager.jsx';
import AdminContactSupport from './admin/ContactSupport.jsx';
import AdminDashboard from './admin/Dashboard.jsx';
import AdminGrievanceDetail from './admin/AdminGrievanceDetail.jsx';
import ManageGrievances from './admin/ManageGrievances.jsx';
import ManageUsers from './admin/ManageUsers.jsx';
import AdminNotifications from './admin/Notifications.jsx';
import AdminProfile from './admin/Profile.jsx';
import AdminHelpFAQ from './admin/HelpFAQ.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MainLayout from './components/layouts/mainlayout';
import { useAuth } from './context/AuthContext.jsx';
import HodDashboard from './hod/Dashboard.jsx';
import GrievanceDetail from './hod/GrievanceDetail.jsx';
import HodContactSupport from './hod/ContactSupport.jsx';
import HodHelpFAQ from './hod/HelpFAQ.jsx';
import MyAssigned from './hod/MyAssigned.jsx';
import MyProfile from './hod/MyProfile.jsx';
import HodNotifications from './hod/Notifications.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import ContactSupport from './student/ContactSupport.jsx';
import Dashboard from './student/Dashboard.jsx';
import HelpFAQ from './student/HelpFAQ.jsx';
import MyGrievances from './student/MyGrievances.jsx';
import Notifications from './student/Notifications.jsx';
import Profile from './student/Profile.jsx';
import SubmitGrievance from './student/SubmitGrievance.jsx';

const RootRedirect = () => {
  const { isAuthenticated, role, getDefaultRouteForRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRouteForRole(role)} replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/submit" element={<SubmitGrievance />} />
            <Route path="/student/grievances" element={<MyGrievances />} />
            <Route path="/student/notifications" element={<Notifications />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/help" element={<HelpFAQ />} />
            <Route path="/student/contact" element={<ContactSupport />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['hod']} />}>
            <Route path="/hod" element={<Navigate to="/hod/dashboard" replace />} />
            <Route path="/hod/dashboard" element={<HodDashboard />} />
            <Route path="/hod/assigned" element={<MyAssigned />} />
            <Route path="/hod/notifications" element={<HodNotifications />} />
            <Route path="/hod/profile" element={<MyProfile />} />
            <Route path="/hod/help" element={<HodHelpFAQ />} />
            <Route path="/hod/contact" element={<HodContactSupport />} />
            <Route path="/hod/assigned/:id" element={<GrievanceDetail />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/grievances" element={<ManageGrievances />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/admin/assignment-rules" element={<AssignmentRules />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/help" element={<AdminHelpFAQ />} />
            <Route path="/admin/contact" element={<AdminContactSupport />} />
            <Route path="/admin/grievances/:id" element={<AdminGrievanceDetail />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;


