import React, { useState } from 'react';
import './Ledgers.css';

// --- Responsive Sidebar Additions START ---
const navLinks = [
  { href: "Dashboard.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "index.html", icon: "bi-person", label: "Student Info" },
  { href: "Ledgers.html", icon: "bi-wallet2", label: "Ledgers", active: true },
  { href: "Grades.html", icon: "bi-journal-text", label: "Grades" },
  { href: "Schedule.html", icon: "bi-calendar-event", label: "Schedule" },
];

const Ledgers = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const ledgerData = [
    { id: 1, year: "2025-2026", item: "Payments", tDate: "06-09-2025", pDate: "06-10-2025", debit: "0.00", credit: "15,000", balance: "-15,000" },
    { id: 2, year: "2025-2026", item: "Registration", tDate: "06-09-2025", pDate: "06-13-2025", debit: "26,900", credit: "0.00", balance: "11,900" },
    { id: 3, year: "2025-2026", item: "Payments", tDate: "06-10-2025", pDate: "07-04-2025", debit: "0.00", credit: "3,500", balance: "8,400" },
    { id: 4, year: "2025-2026", item: "Payments", tDate: "07-03-2025", pDate: "07-08-2025", debit: "0.00", credit: "8,400", balance: "0.00" },
  ];

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
          <li className="nav-item mb-2" key={item.href}>
            <a
              href={item.href}
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
      <main className="content-area flex-grow-1 p-4 bg-soft-yellow">
        <div className="card shadow-sm border-3 rounded-4 overflow-hidden">
          {/* Header Section */}
          <div className="card-header bg-blue p-4 border-0">
            <div className="d-flex justify-content-between align-items-center">
               <h3 className="mb-0 fw-bold text-dark">Student's Ledger</h3>
               <span className="badge bg-white text-dark px-3 py-2 rounded-pill">S.Y. 2025-2026</span>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light-yellow">
                  <tr>
                    <th className="ps-4">#</th>
                    <th>School Year</th>
                    <th>Item</th>
                    <th>Transaction Date</th>
                    <th>Date Posted</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th className="pe-4">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.map((row) => (
                    <tr key={row.id}>
                      <td className="ps-4 fw-bold text-muted">{row.id}</td>
                      <td>{row.year}</td>
                      <td><span className="badge bg-info-subtle text-dark border">{row.item}</span></td>
                      <td>{row.tDate}</td>
                      <td>{row.pDate}</td>
                      <td className="text-danger">{row.debit}</td>
                      <td className="text-success">{row.credit}</td>
                      <td className={`pe-4 fw-bold ${parseFloat(row.balance.replace(/,/g, '')) > 0 ? 'text-primary' : 'text-dark'}`}>
                        {row.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer bg-white border-0 p-3 d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary btn-sm px-4">Previous</button>
            <button className="btn btn-warning btn-sm px-4 fw-bold">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ledgers;