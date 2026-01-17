import React, { useState } from 'react';
import './Dashboard.css';


// --- Responsive Sidebar Additions START ---
const navLinks = [
  { href: "Dashboard.html", icon: "bi-wallet2", label: "Dashboard", active: true },
  { href: "index.html", icon: "bi-person", label: "Student Info" },
  { href: "Ledgers.html", icon: "bi-journal-text", label: "Ledger" },
  { href: "Grades.html", icon: "bi-mortarboard", label: "Grades" },
  { href: "Schedule.html", icon: "bi-calendar-event", label: "Schedule" },
];

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Track hovered text in the navigation menu
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Collapsed sidebar as default when not hovered in desktop and also hide this element in mobile
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

  // Sidebar nav content(reusable! use this if you need a sidebar nav, and copy the css code too its labled in the css files)
  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">
          {isCollapsed ? <i className="bi bi-person"></i> : <span className="fw-bold">U</span>}
        </div>
        {!isCollapsed && <h6 className="mt-2 fw-bold">User Name</h6>}
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
      {/* --- Mobile Nav Bar(Hamburger) --- */}
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
        <header className="mb-4">
          <h2 className="fw-bold text-dark text-uppercase">Student Dashboard</h2>
        </header>
        {/* ...existing code... */}
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-3 shadow-sm rounded-4 h-100">
              <div className="card-header bg-blue border-bottom py-3">
                <h6 className="mb-0 fw-bold"><i className="bi bi-clock-history me-2"></i>Today's Classes</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr className="small text-muted">
                        <th className="ps-4">TIME</th>
                        <th>SUBJECT</th>
                        <th className="pe-4">ROOM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ps-4 fw-bold">08:00 AM</td>
                        <td>Bible Study</td>
                        <td className="pe-4"><span className="badge bg-blue text-dark">Chapel</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card border-3 shadow-sm rounded-4 h-100 bg-white">
              <div className="card-header bg-danger border-bottom py-3">
                <h6 className="mb-0 fw-bold"><i className="bi bi-megaphone me-2"></i>Announcements</h6>
              </div>
              <div className="card-body">
                <p className="small mb-1 fw-bold">Library is now Open</p>
                <p className="x-small text-muted mb-0">8:00 am - 5:00pm</p>
              </div>
            </div>
          </div>
        </div>
        {/* ...existing code... */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-3 shadow-sm rounded-4 bg-white overflow-hidden">
              <div className="card-header bg-blue border-bottom py-3">
                <h6 className="mb-0 fw-bold"><i className="bi bi-image me-2"></i>Campus Spotlight</h6>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <img src="/nig.jpg" alt="Campus" className="img-fluid rounded-3 shadow-sm" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="fw-bold">Upcoming UE Foundation Day</h5>
                    <p className="text-muted">Join us for a week-long celebration featuring sports, cultural exhibits, and the annual grand parade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ...existing code... */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-3 shadow-sm rounded-4 bg-white overflow-hidden">
              <div className="card-header bg-blue border-bottom py-3">
                <h6 className="mb-0 fw-bold"><i className="bi bi-stars me-2"></i>Back to School</h6>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <img src="/nig.jpg" alt="Event" className="img-fluid rounded-3 shadow-sm" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="fw-bold">Back to School</h5>
                    <p className="text-muted">Welcome back Students! Get ready for exciting events, schedules, and enjoy your school days!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
// --- Responsive Sidebar Additions END ---

export default Dashboard;