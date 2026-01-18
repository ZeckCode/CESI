import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import EnrollmentManagement from "./EnrollmentManagement";
import TransactionHistory from "./TransactionHistory";
import PaymentReminders from "./PaymentReminders";
import Reports from "./Reports";
import UserManagement from "./UserManagement";
import AssignTeachers from "./AssignTeachers";
import GradesRecords from "./GradesRecords";
import CMSModule from "./CMSModule";

import "../AdminWebsiteCSS/App.css";

function AdminDashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = (menuId) => {
    // ✅ logout from sidebar item
    if (menuId === "logout") {
      onLogout?.();
      return;
    }
    setActiveMenu(menuId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard />;
      case "enrollment":
        return <EnrollmentManagement />;
      case "transaction-history":
        return <TransactionHistory />;
      case "payment-reminders":
        return <PaymentReminders />;
      case "generate-reports":
        return <Reports />;
      case "users":
        return <UserManagement />;
      case "assign-teachers":
        return <AssignTeachers />;
      case "grades":
        return <GradesRecords />;
      case "cms":
        return <CMSModule />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: "Dashboard",
      enrollment: "Enrollment Management",
      financial: "Financial Management",
      users: "User Management",
      "assign-teachers": "Assign Teachers",
      grades: "Grades & Records",
      cms: "CMS Module",
      reports: "Reports",
    };
    return titles[activeMenu] || "Dashboard";
  };

  return (
    <div className="app-container">
      <Sidebar
        user={user}            // ✅ now real user from App.jsx
        onLogout={onLogout}    // ✅ sidebar logout button works
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isVisible={sidebarVisible}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className={`main-content ${!sidebarVisible ? "main-content-expanded" : ""}`}>
        <Header
          title={getPageTitle()}
          subtitle={
            user
              ? `Welcome back, ${user.username}! Here's what's happening today.`
              : "Welcome back! Here's what's happening today."
          }
          onToggleCollapse={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
