import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = ({ title, subtitle, onToggleSidebar, sidebarVisible }) => {
  const [hoveredMenuBtn, setHoveredMenuBtn] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button
          className={`menu-button ${hoveredMenuBtn ? 'menu-button-hover' : ''}`}
          onClick={onToggleSidebar}
          onMouseEnter={() => setHoveredMenuBtn(true)}
          onMouseLeave={() => setHoveredMenuBtn(false)}
        >
          {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div>
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;