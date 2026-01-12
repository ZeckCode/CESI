import React, { useState } from 'react';
import './Grades.css';

// --- Responsive Sidebar Additions START ---
const navLinks = [
  { href: "Dashboard.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "index.html", icon: "bi-person", label: "Student Info" },
  { href: "Ledgers.html", icon: "bi-journal-text", label: "Ledger" },
  { href: "Grades.html", icon: "bi-wallet2", label: "Grades", active: true },
  { href: "Schedule.html", icon: "bi-calendar-event", label: "Schedule" },
];

const Grades = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const gradeData = [
    { code: "", desc: "English", first: "", second: "", third: "", fourth: "" },
    { code: "", desc: "Math", first: "", second: "", third: "", fourth: "" },
    { code: "", desc: "AP", first: "", second: "", third: "", fourth: "" },
    { code: "", desc: "Filipino", first: "", second: "", third: "", fourth: "" },
    { code: "", desc: "Science", first: "", second: "", third: "", fourth: "" },
    { code: "", desc: "TLE", first: "", second: "", third: "", fourth: "" },
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

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 bg-soft-yellow">
        <div className="card shadow-sm border-3 rounded-4 overflow-hidden">
          <div className="card-header bg-blue py-3 px-4 border-0">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="bi bi-table me-2"></i>Enrolled Semester - 2nd Semester, S.Y. 2025-2026
              </h5>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0">
                <thead className="table-header-dark-blue text-white text-center">
                  <tr>
                    <th className="py-3">#</th>
                    <th className="py-3 text-start ps-3">SUBJECT</th>
                    <th className="py-3">1st Quarter</th>
                    <th className="py-3">2nd Quarter</th>
                    <th className="py-3">3rd Quarter</th>
                    <th className="py-3">4th Quarter</th>
                    <th className="py-3 pe-3">Remark</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center align-middle">
                  {gradeData.map((item, index) => (
                    <tr key={index}>
                      <td className="text-secondary fw-semibold">{item.code}</td>
                      <td className="text-start ps-3">{item.desc}</td>
                      <td>{item.prelim}</td>
                      <td>{item.midterm}</td>
                      <td>{item.final}</td>
                      <td>{item.units}</td>
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

export default Grades;