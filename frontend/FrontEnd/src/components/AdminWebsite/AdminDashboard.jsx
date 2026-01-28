<<<<<<<< Updated upstream:frontend/admin/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/shared/Sidebar';
import Header from './components/shared/Header';
import Dashboard from './components/pages/Dashboard';
import EnrollmentManagement from './components/pages/EnrollmentManagement';
import TransactionHistory from './components/pages/TransactionHistory';
import PaymentReminders from './components/pages/PaymentReminders';
import Reports from './components/pages/Reports';
import UserManagement from './components/pages/UserManagement';
import Classes from './components/pages/Classes';
import Subjects from './components/pages/Subjects';
import AssignTeachers from './components/pages/AssignTeachers';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'enrollment':
        return <EnrollmentManagement />;
      case 'transaction-history':
        return <TransactionHistory />;
      case 'payment-reminders':
        return <PaymentReminders />;
      case 'generate-reports':
        return <Reports />;
      case 'users':
        return <UserManagement />;
      case 'classes':
        return <Classes />;
      case 'subjects':
        return <Subjects />;
      case 'assign-teachers':
        return <AssignTeachers />;
      case 'grades':
        return <div>Grades & Records - Coming Soon</div>;
      case 'cms':
        return <div>CMS Module - Coming Soon</div>;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <div>SMS & Email - Coming Soon</div>;
      case 'messages':
        return <div>Messages - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      enrollment: 'Enrollment Management',
      financial: 'Financial Management',
      users: 'User Management',
      classes: 'Classes',
      subjects: 'Subjects',
      'assign-teachers': 'Assign Teachers',
      grades: 'Grades & Records',
      cms: 'CMS Module',
      reports: 'Reports',
      notifications: 'SMS & Email',
      messages: 'Messages'
    };
    return titles[activeMenu] || 'Dashboard';
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isVisible={sidebarVisible}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <div className={`main-content ${!sidebarVisible ? 'main-content-expanded' : ''}`}>
        <Header 
          title={getPageTitle()}
          subtitle="Welcome back! Here's what's happening today."
          onToggleCollapse={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
========
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import EnrollmentManagement from './EnrollmentManagement';
import TransactionHistory from './TransactionHistory';
import PaymentReminders from './PaymentReminders';
import Reports from './Reports';
import UserManagement from './UserManagement';
import ClassManagement from './ClassManagement';
import Subjects from './Subjects';
import AssignTeachers from './AssignTeachers';
import GradesRecords from './GradesRecords';
import FloatingMessages from './FloatingMessages';
import CMSModule from './CMSModule';

import '../AdminWebsiteCSS/AdminDashboard.css';
// import '../AdminWebsiteCSS/App.css';
function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'enrollment':
        return <EnrollmentManagement />;
      case 'transaction-history':
        return <TransactionHistory />;
      case 'payment-reminders':
        return <PaymentReminders />;
      case 'generate-reports':
        return <Reports />;
      case 'users':
        return <UserManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'subjects':
        return <Subjects />;
      case 'assign-teachers':
        return <AssignTeachers />;
      case 'grades':
        return <GradesRecords />;
      case 'cms':
        return <CMSModule />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      enrollment: 'Enrollment Management',
      financial: 'Financial Management',
      users: 'User Management',
      classes: 'Classes',
      subjects: 'Subjects',
      'assign-teachers': 'Assign Teachers',
      grades: 'Grades & Records',
      cms: 'CMS Module',
      reports: 'Reports',
      notifications: 'SMS & Email'
    };
    return titles[activeMenu] || 'Dashboard';
  };

  return (
    <div className="admin-app-container">
      <Sidebar 
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isVisible={sidebarVisible}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className={`admin-main-content ${!sidebarVisible ? 'admin-main-content-expanded' : ''}`}>
        <Header 
          title={getPageTitle()}
          subtitle="Welcome back! Here's what's happening today."
          onToggleCollapse={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {renderContent()}
      </div>

      {/* GLOBAL FLOATING MESSAGES */}
      <FloatingMessages />
    </div>
  );
}

export default AdminDashboard;
>>>>>>>> Stashed changes:frontend/FrontEnd/src/components/AdminWebsite/AdminDashboard.jsx
