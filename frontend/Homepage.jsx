import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/IndexWebsite/Home";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import AdminDashboard from "./components/AdminWebsite/AdminDashboard";
import TeacherDashboard from "./components/TeacherWebsite/TeacherDashboard";
import ParentDashboard from "./components/ParentWebsite/ParentDashboard";
 import './components/IndexWebsiteCSS/App.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/accounts/me/", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
        setUser(null);
        localStorage.removeItem("user");
      } else if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }
        // ✅ only logout if server says "not logged in"
        if (res.status === 401 || res.status === 403) {
          setUser(null);
          localStorage.removeItem("user");
          return;
        }

        // other non-ok responses: don't instantly wipe user (prevents random logout)
        if (!res.ok) {
          console.warn("ME check failed:", res.status);
          return;
        }

        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        // ✅ network/CORS/server down: keep local user, don't force logout
        console.warn("ME request error (kept local user):", err);
      } finally {
        setAuthChecked(true);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout request failed:", e);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="ADMIN" authChecked={authChecked}>
              <AdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/teacher"
          element={
            <ProtectedRoute user={user} role="TEACHER" authChecked={authChecked}>
              <TeacherDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute user={user} role="PARENT_STUDENT" authChecked={authChecked}>
              <ParentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
