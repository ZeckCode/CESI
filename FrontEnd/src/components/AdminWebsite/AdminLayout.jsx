import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import Dashboard from "./Dashboard";
import EnrollmentManagement from "./EnrollmentManagement";
import TransactionHistory from "./TransactionHistory";
import PaymentReminders from "./PaymentReminders";
import Reports from "./Reports";
import UserManagement from "./UserManagement";
import ClassManagement from "./ClassManagement";
import Subjects from "./Subjects";
import AssignTeachers from "./AssignTeachers";
import GradesRecords from "./GradesRecords";
import CMSModule from "./CMSModule";
import FloatingMessages from "./FloatingMessages";

import "../AdminWebsiteCSS/AdminLayout.css";

export default function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // ✅ single breakpoint source of truth
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pageTitle = useMemo(() => {
    const titles = {
      dashboard: "Dashboard",
      enrollment: "Enrollment Management",
      financial: "Financial Management",
      "transaction-history": "Transaction History",
      "payment-reminders": "Payment Reminders",
      "generate-reports": "Generate Reports",
      users: "User Management",
      classes: "Class Management",
      subjects: "Subjects",
      "assign-teachers": "Assign Teachers",
      grades: "Grades & Records",
      cms: "CMS Module",
      reports: "Reports",
    };
    return titles[activeMenu] || "Dashboard";
  }, [activeMenu]);

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
      case "classes":
        return <ClassManagement />;
      case "subjects":
        return <Subjects />;
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

  const handleMenu = (id) => {
    setActiveMenu(id);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <div className={`admin-shell ${collapsed && !isMobile ? "is-collapsed" : ""}`}>
      {/* Mobile overlay */}
      {isMobile && drawerOpen && (
        <button
          className="admin-overlay"
          aria-label="Close sidebar"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar area (flow on desktop, drawer on mobile) */}
      <aside className={`admin-sidebar ${isMobile ? "is-mobile" : ""} ${drawerOpen ? "is-open" : ""}`}>
        <Sidebar
          activeMenu={activeMenu}
          onMenuClick={handleMenu}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
      </aside>

      {/* Main */}
      <main className="admin-main">
        <Header
          title={pageTitle}
          subtitle="Welcome back! Here's what's happening today."
          isMobile={isMobile}
          onOpenSidebar={() => setDrawerOpen(true)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />

        <div className="admin-content">{renderContent()}</div>
      </main>

      <FloatingMessages />
    </div>
  );
}
