import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Wallet,
  UsersRound,
  BookOpen,
  GraduationCap,
  Globe,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import "../AdminWebsiteCSS/Sidebar.css";
import { useAuth } from "../Auth/useAuth"; // adjust path if needed

const Sidebar = ({
  activeMenu,
  onMenuClick,
  isVisible,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredSubNav, setHoveredSubNav] = useState(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ single auth source

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "enrollment", label: "Enrollment Management", icon: UserPlus },
    {
      id: "financial",
      label: "Financial Management",
      icon: Wallet,
      subItems: [
        { id: "transaction-history", label: "Transaction History" },
        { id: "payment-reminders", label: "Payment Reminders" },
        { id: "generate-reports", label: "Generate Reports" },
      ],
    },
    { id: "users", label: "User Management", icon: UsersRound },
    { id: "classes", label: "Class Management", icon: BookOpen },
    { id: "grades", label: "Grades & Records", icon: GraduationCap },
    { id: "cms", label: "CMS Module", icon: Globe },
  ];

  const toggleMenu = (menuId) => {
    if (!isCollapsed) {
      setExpandedMenus((prev) => ({
        ...prev,
        [menuId]: !prev[menuId],
      }));
    }
  };

  const handleMenuClick = (menuId, hasSubItems) => {
    if (isCollapsed) onToggleCollapse();
    if (hasSubItems) toggleMenu(menuId);
    else onMenuClick(menuId);
  };

  const handleSubMenuClick = (subItemId) => {
    onMenuClick(subItemId);
  };

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        const isSubItemActive = item.subItems.some(
          (sub) => sub.id === activeMenu
        );
        if (isSubItemActive) {
          setExpandedMenus((prev) => ({ ...prev, [item.id]: true }));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  const isMenuItemActive = (item) => {
    if (item.id === activeMenu) return true;
    if (item.subItems)
      return item.subItems.some((sub) => sub.id === activeMenu);
    return false;
  };

  const handleLogout = async () => {
    // If using Django session auth, uncomment:
    // await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
    //   method: "POST",
    //   credentials: "include",
    // });

    logout(); // clears context + localStorage
    onMenuClick?.("logout"); // optional
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`sidebar ${!isVisible ? "sidebar-hidden" : ""} ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="sidebar-header">
        {!isCollapsed ? (
          <>
            <h1 className="sidebar-title">Preschool Admin</h1>
            <p className="sidebar-subtitle">Management System</p>

            {user && (
              <div className="sidebar-user">
                <div className="sidebar-user-name">{user.username}</div>
                <div className="sidebar-user-role">{user.role}</div>
              </div>
            )}
          </>
        ) : (
          <div className="sidebar-title-collapsed">PA</div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="nav-item-wrapper">
            <div
              className={`nav-item ${
                isMenuItemActive(item) ? "nav-item-active" : ""
              } ${hoveredNav === item.id ? "nav-item-hover" : ""}`}
              onClick={() => handleMenuClick(item.id, !!item.subItems)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <item.icon size={20} className="nav-icon" />
              {!isCollapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.subItems &&
                    (expandedMenus[item.id] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </>
              )}
            </div>

            {!isCollapsed && item.subItems && expandedMenus[item.id] && (
              <div className="sub-nav">
                {item.subItems.map((subItem, idx) => (
                  <div
                    key={subItem.id}
                    className={`sub-nav-item ${
                      subItem.id === activeMenu
                        ? "sub-nav-item-active"
                        : ""
                    } ${
                      hoveredSubNav === `${item.id}-${idx}`
                        ? "sub-nav-item-hover"
                        : ""
                    }`}
                    onClick={() => handleSubMenuClick(subItem.id)}
                    onMouseEnter={() =>
                      setHoveredSubNav(`${item.id}-${idx}`)
                    }
                    onMouseLeave={() => setHoveredSubNav(null)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* LOGOUT */}
        <div className="nav-item logout-item" onClick={handleLogout}>
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
