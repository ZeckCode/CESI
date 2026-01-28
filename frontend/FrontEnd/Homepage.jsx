import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./src/components/Auth/ProtectedRoute";
import { useAuth } from "./src/components/Auth/useAuth";

import Home from "./src/components/IndexWebsite/Home";
import Login from "./src/components/Auth/Login";
import AdminDashboard from "./src/components/AdminWebsite/AdminDashboard";
import TeacherDashboard from "./src/components/TeacherWebsite/TeacherDashboard";
import ParentWebsite from "./src/components/ParentWebsite/ParentWebsite";

export default function Homepage() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="TEACHER">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/*"
        element={
          <ProtectedRoute role="PARENT_STUDENT">
            <ParentWebsite />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<div>Unauthorized</div>} />

      {/* Debug for now */}
      <Route path="*" element={<div>404 - Route Not Found</div>} />
      {/* Later you can restore:
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      */}
    </Routes>
  );
}
