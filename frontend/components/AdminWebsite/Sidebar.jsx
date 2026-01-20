import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, UserPlus, Wallet, UsersRound, 
  BookOpen, GraduationCap, Globe, ChevronDown, ChevronRight, LogOut
} from 'lucide-react';
import '../AdminWebsiteCSS/Sidebar.css';

const Sidebar = ({ activeMenu, onMenuClick, isVisible, isCollapsed, onToggleCollapse }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredSubNav, setHoveredSubNav] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enrollment', label: 'Enrollment Management', icon: UserPlus },
    {
      id: 'financial',
      label: 'Financial Management',
      icon: Wallet,
      subItems: ['Transaction History', 'Payment Reminders', 'Generate Reports']
    },
    { id: 'users', label: 'User Management', icon: UsersRound },
    { id: 'classes', label: 'Class Management', icon: BookOpen },
    { id: 'grades', label: 'Grades & Records', icon: GraduationCap },
    {
      id: 'cms',
      label: 'CMS Module',
      icon: Globe,
    }
  ];

  const toggleMenu = (menuId) => {
    if (!isCollapsed) {
      setExpandedMenus(prev => ({
        ...prev,
        [menuId]: !prev[menuId]
      }));
    }
  };

  const handleMenuClick = (menuId, hasSubItems) => {
    if (isCollapsed) onToggleCollapse();
    if (hasSubItems) toggleMenu(menuId);
    else onMenuClick(menuId);
  };

  const handleSubMenuClick = (subItem) => {
    const pageId = subItem.toLowerCase().replace(/\s/g, '-');
    onMenuClick(pageId);
  };

  useEffect(() => {
    if (
      activeMenu === 'transaction-history' ||
      activeMenu === 'payment-reminders' ||
      activeMenu === 'generate-reports'
    ) {
      setExpandedMenus(prev => ({ ...prev, financial: true }));
    }
  }, [activeMenu]);

  return (
    <aside className={`sidebar ${!isVisible ? 'sidebar-hidden' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed ? (
          <>
            <h1 className="sidebar-title">Preschool Admin</h1>
            <p className="sidebar-subtitle">Management System</p>
          </>
        ) : (
          <div className="sidebar-title-collapsed">PA</div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div key={item.id} className="nav-item-wrapper">
            <div
              className={`nav-item ${hoveredNav === item.id ? 'nav-item-hover' : ''}`}
              onClick={() => handleMenuClick(item.id, item.subItems)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <item.icon size={20} className="nav-icon" />
              {!isCollapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.subItems &&
                    (expandedMenus[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                </>
              )}
            </div>

            {!isCollapsed && item.subItems && expandedMenus[item.id] && (
              <div className="sub-nav">
                {item.subItems.map((subItem, idx) => (
                  <div
                    key={idx}
                    className={`sub-nav-item ${hoveredSubNav === `${item.id}-${idx}` ? 'sub-nav-item-hover' : ''}`}
                    onClick={() => handleSubMenuClick(subItem)}
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

        {/* LOGOUT */}
        <div className="nav-item logout-item" onClick={() => onMenuClick('logout')}>
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
