
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ParentWebsiteCSS/Ledgers.css';

// (Duplicate TransactionForm removed)

// --- Responsive Sidebar Additions START ---
const navLinks = [
  { path: "/parent/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
  { path: "/parent/profile", icon: "bi-person", label: "Student Info" },
  { path: "/parent/ledger", icon: "bi-wallet2", label: "Ledgers", active: true },
  { path: "/parent/grades", icon: "bi-journal-text", label: "Grades" },
  { path: "/parent/schedule", icon: "bi-calendar-event", label: "Schedule" },
];

const Ledgers = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const [ledgerData, setLedgerData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:8000/api/finance/transactions/')
      .then(response => response.json())
      .then(data => {
        setLedgerData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching ledger:', error);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      } else {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">JD</div>
        {!isCollapsed && <h6 className="mt-2 fw-bold">JHON DOE</h6>}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((item, idx) => (
          <li className="nav-item mb-2" key={item.path}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && item.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      {/* --- Mobile Header (Hamburger) --- */}
      <div className="sidebar-mobile-header w-100 d-flex d-md-none">
        <button
          className="btn btn-link text-white p-0 me-2"
          aria-label="Open sidebar menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="bi bi-list" style={{ fontSize: '2rem' }}></i>
        </button>
        <span className="fw-bold text-white">Student Portal</span>
        <span></span>
      </div>

      {/* --- Mobile Sidebar Drawer --- */}
      {mobileMenuOpen && (
        <>
          <div className="sidebar-mobile-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <nav className="sidebar-mobile-menu open p-3 text-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Menu</span>
              <button className="btn btn-link text-white p-0" aria-label="Close sidebar menu" onClick={() => setMobileMenuOpen(false)}>
                <i className="bi bi-x-lg" style={{ fontSize: '1.5rem' }}></i>
              </button>
            </div>
            {sidebarNav}
          </nav>
        </>
      )}

      {/* --- Desktop Sidebar --- */}
      <nav
        className={`sidebar d-none d-md-flex flex-column p-3 text-white${isCollapsed ? ' collapsed' : ''}`}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        {/* Toggle Button (desktop only) */}
        <button
          className="btn btn-sm mb-3 border-0 text-white d-none d-md-block align-self-end"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Payment Ledger</h2>
            <p className="text-muted mb-0">Track all transactions and payments - S.Y. 2025-2026</p>
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
          <div className="card-header bg-dark text-white py-3 px-4 border-0">
            <h6 className="mb-0 fw-bold">
              <i className="bi bi-wallet2 me-2"></i>Transaction Records
            </h6>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light-yellow">
                  <tr>
                    <th className="ps-4">#</th>
                    <th>Student Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date Created</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.map((row) => (
                    <tr key={row.id}>
                      <td className="ps-4 fw-bold text-muted">{row.id}</td>
                      <td>{row.student_name}</td>
                      <td>{row.transaction_type}</td>
                      <td>{row.amount}</td>
                      <td>{row.description}</td>
                      <td>{new Date(row.date_created).toLocaleString()}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};



export default Ledgers;