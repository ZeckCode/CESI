import React, { useState } from 'react';
import { 
  LayoutDashboard, UserPlus, Wallet, UsersRound, 
  BookOpen, GraduationCap, Globe, FileText, Mail, 
  MessageSquare, ChevronDown, ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, onMenuClick, isVisible }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredSubNav, setHoveredSubNav] = useState(null);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      id: 'enrollment', 
      label: 'Enrollment Management', 
      icon: UserPlus 
    },
    { 
      id: 'financial', 
      label: 'Financial Management', 
      icon: Wallet,
      subItems: ['Transaction History', 'Payment Reminders', 'Reports']
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: UsersRound,
      subItems: ['Students', 'Teachers', 'Add User']
    },
    { 
      id: 'classes', 
      label: 'Class Management', 
      icon: BookOpen,
      subItems: ['Schedules', 'Subjects', 'Assign Teachers']
    },
    { 
      id: 'grades', 
      label: 'Grades & Records', 
      icon: GraduationCap,
      subItems: ['Student Grades', 'Attendance', 'Deadlines']
    },
    { 
      id: 'cms', 
      label: 'CMS Module', 
      icon: Globe,
      subItems: ['Edit Website', 'View Statistics']
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText,
      subItems: ['Academic Reports', 'Financial Reports', 'Enrollment Reports', 'Export Data']
    },
    { 
      id: 'notifications', 
      label: 'SMS & Email', 
      icon: Mail,
      subItems: ['Send Announcement', 'Payment Notifications', 'Bulk Messaging']
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageSquare,
      subItems: ['Inquiries', 'Group Chat', 'Notifications', 'AI Chatbot']
    }
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (menuId) => {
    onMenuClick(menuId);
    if (menuItems.find(item => item.id === menuId)?.subItems) {
      toggleMenu(menuId);
    }
  };

  return (
    <aside className={`sidebar ${!isVisible ? 'sidebar-hidden' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">Preschool Admin</h1>
        <p className="sidebar-subtitle">Management System</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div key={item.id}>
            <div
              className={`nav-item ${activeMenu === item.id ? 'nav-item-active' : ''} ${hoveredNav === item.id ? 'nav-item-hover' : ''}`}
              onClick={() => handleMenuClick(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <item.icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.subItems && (
                expandedMenus[item.id] ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
              )}
            </div>
            
            {item.subItems && expandedMenus[item.id] && (
              <div className="sub-nav">
                {item.subItems.map((subItem, idx) => (
                  <div
                    key={idx}
                    className={`sub-nav-item ${hoveredSubNav === `${item.id}-${idx}` ? 'sub-nav-item-hover' : ''}`}
                    onMouseEnter={() => setHoveredSubNav(`${item.id}-${idx}`)}
                    onMouseLeave={() => setHoveredSubNav(null)}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;