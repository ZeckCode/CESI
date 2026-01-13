import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // Add routing logic here when you create other pages
    // e.g., navigate to different components based on menuId
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Render different components based on activeMenu
  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'enrollment':
        return <div>Enrollment Management - Coming Soon</div>;
      case 'financial':
        return <div>Financial Management - Coming Soon</div>;
      case 'users':
        return <div>User Management - Coming Soon</div>;
      case 'classes':
        return <div>Class Management - Coming Soon</div>;
      case 'grades':
        return <div>Grades & Records - Coming Soon</div>;
      case 'cms':
        return <div>CMS Module - Coming Soon</div>;
      case 'reports':
        return <div>Reports - Coming Soon</div>;
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
      classes: 'Class Management',
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
      />
      
      <div className={`main-content ${!sidebarVisible ? 'main-content-expanded' : ''}`}>
        <Header 
          title={getPageTitle()}
          subtitle="Welcome back! Here's what's happening today."
          onToggleSidebar={handleToggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        
        {renderContent()}
      </div>
    </div>
  );
}

export default App;