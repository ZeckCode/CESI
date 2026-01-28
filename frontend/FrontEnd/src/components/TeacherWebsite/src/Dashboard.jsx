  import React, { useState } from 'react';
  import './Dashboard.css';


  // --- Responsive Sidebar Additions START ---
const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard", active: true },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode"},
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
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
          {!isCollapsed && <h6 className="mt-2 fw-bold">Username</h6>}
          {!isCollapsed && <small className="text-white-50">Faculty Member</small>}
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
            <h2 className="fw-bold text-dark text-uppercase">Dashboard</h2>
          </header>
          {/* ...existing code... */}
          <div className="row g-4">
    {/* Notifications Column */}
    <div className="col-12 col-lg-8">
      <div className="card border-3 shadow-sm rounded-1 h-100">
        <div className="card-header bg-blue border-bottom py-3">
          <h6 className="mb-0 fw-bold">
            <i className="bi bi-bell-fill me-2"></i>Notifications
          </h6>
        </div>
        <div className="card-body p-0">
          <div className="list-group list-group-flush rounded-1">
            {/* Notification 1 */}
            <div className="list-group-item list-group-item-action p-3 border-2 border-bottom">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="icon-box bg-blue text-dark rounded-circle p-2 me-3">
                    <i className="bi bi-book"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Encoding of Grades</h6>
                    <small className="text-muted">Submission of Grades due at January 1, 2025 <span className="badge bg-light text-dark border"></span></small>
                  </div>
                </div>
                <small className="fw-bold text-primary">10:00 AM</small>
              </div>
            </div>

            {/* Notification 2 */}
            <div className="list-group-item list-group-item-action p-3 border-2 border-bottom">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="icon-box bg-warning-subtle text-warning rounded-circle p-2 me-3 border border-warning">
                    <i className="bi bi-exclamation-triangle"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Library Notice</h6>
                    <small className="text-muted">The library will close early at 3:00 PM today.</small>
                  </div>
                </div>
                <small className="text-muted">10:30 AM</small>
              </div>
            </div>

            {/* Notification 3 */}
            <div className="list-group-item list-group-item-action p-3 border-2">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="icon-box bg-success-subtle text-success rounded-circle p-2 me-3 border border-success">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">CESI Portal Updated</h6>
                    <small className="text-muted"><span className="fw-bold">CESI Portal</span> is now available. Thank you for waiting.</small>
                  </div>
                </div>
                <small className="text-muted">Yesterday</small>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white text-center border-2 py-2">
          <a href="#" className="small text-decoration-none text-primary fw-bold">View All Notifications</a>
        </div>
      </div>
    </div>

    {/* Announcements Column */}
    <div className="col-12 col-lg-4">
      <div className="card border-3 shadow-sm rounded-1 h-100 bg-white">
        <div className="card-header bg-danger text-white border-bottom py-3">
          <h6 className="mb-0 fw-bold"><i className="bi bi-megaphone-fill me-2"></i>Announcements</h6>
        </div>
        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            {/* Announcement 1 */}
            <div className="list-group-item p-3 border-2 border-bottom">
              <h6 className="mb-1 fw-bold text-danger">Library is now Open</h6>
              <p className="small text-muted mb-0"><i className="bi bi-clock me-1"></i> 8:00 AM - 5:00 PM</p>
            </div>
            {/* Announcement 2 */}
            <div className="list-group-item p-3 border-2 border-bottom">
              <h6 className="mb-1 fw-bold text-dark">Enrollment Period</h6>
              <p className="small text-muted mb-0">Second Semester enrollment starts on July 15.</p>
            </div>
            {/* Announcement 3 */}
            <div className="list-group-item p-3 border-2">
              <h6 className="mb-1 fw-bold text-dark">Uniform Policy</h6>
              <p className="small text-muted mb-0">Full uniform is required starting Monday.</p>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white text-center border-2 py-2">
          <a href="#" className="small text-decoration-none text-danger fw-bold">See All Updates</a>
        </div>
      </div>
    </div>
  </div>
          {/* ...existing code... */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-3 shadow-sm rounded-4 bg-white overflow-hidden">
                <div className="card-header bg-blue border-bottom py-3">
                  <h6 className="mb-0 fw-bold"><i className="bi bi-stars me-2"></i>ABOUT CESI</h6>
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <img src="/port.png" alt="Event" className="img-fluid rounded-3 shadow-sm" />
                    </div>
                    
                      <div className="col-md-8">
                      <h5 className="fw-bold text-primary text-uppercase mb-3">What is CESI Portal</h5>
    
                      <p className="text-muted mb-3">
                        The CESI Portal is your all-in-one academic command center. Designed for efficiency and transparency, 
                        it allows students to seamlessly manage their educational journey. From monitoring real-time 
                        academic performance to tracking attendance and daily schedules, everything you need is organized 
                        into a single, user-friendly digital hub.
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-blue text-dark px-3 py-2 rounded-pill">
                          <i className="bi bi-cpu me-1"></i> Real-time Data
                        </span>
                        <span className="badge bg-blue text-dark px-3 py-2 rounded-pill">
                          <i className="bi bi-person-heart me-1"></i> Student-First
                        </span>
                        <span className="badge bg-blue text-dark px-3 py-2 rounded-pill">
                          <i className="bi bi-shield-check me-1"></i> Secure Access
                        </span>
                        <span className="badge bg-blue text-dark px-3 py-2 rounded-pill">
                          <i className="bi bi-phone me-1"></i> Mobile Ready
                        </span>
                        <span className="badge bg-blue text-dark px-3 py-2 rounded-pill">
                          <i className="bi bi-clock me-1"></i> 24/7 Availability
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-3 shadow-sm rounded-4 bg-white overflow-hidden">
                <div className="card-header bg-blue border-bottom py-3">
                  <h6 className="mb-0 fw-bold"><i className="bi bi-stars me-2"></i>Back to School</h6>
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <img src="/bsch.jpg" alt="Event" className="img-fluid rounded-3 shadow-sm" />
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