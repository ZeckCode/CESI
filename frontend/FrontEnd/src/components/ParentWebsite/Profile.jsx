import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ParentWebsiteCSS/Profile.css';

// --- Responsive Sidebar Additions START ---
const navLinks = [
  { path: "/parent/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
  { path: "/parent/profile", icon: "bi-person", label: "Student Info", active: true },
  { path: "/parent/ledger", icon: "bi-journal-text", label: "Ledger" },
  { path: "/parent/grades", icon: "bi-journal-text", label: "Grades" },
  { path: "/parent/schedule", icon: "bi-calendar-event", label: "Schedule" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const studentData = {
    name: "JHON DOE",
    lrn: "136858100648",
    grade: "Grade 1 - Makabansa",
    email: "jhon.doe@school.edu",
    address: "123 Academic Lane, Manila",
    birthdate: "January 1, 2018",
    level: "3",
    guardian: "Jane",
    telephone: "82878796",
    mobile: "09911140383",
  };

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
        {!isCollapsed && <h6 className="mt-2 fw-bold">{studentData.name}</h6>}
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

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Student Profile</h2>
          <p className="text-muted mb-0">Personal and academic information</p>
        </div>

        {/* Profile Hero Header */}
        <div className="card shadow-sm border-0 rounded-4 mb-4 overflow-hidden">
          <div className="card-body p-4 bg-blue d-flex align-items-center">
            <div className="me-4">
              <div className="avatar-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                {studentData.name.charAt(0)}
              </div>
            </div>
            <div className="text-start">
              <h3 className="fw-bold mb-0 text-dark">{studentData.name}</h3>
              <p className="mb-0 text-muted">LRN: {studentData.lrn}</p>
              <small className="text-muted fw-bold">{studentData.grade}</small>
            </div>
          </div>
        </div>
        

        {/* Information Grid
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-blue text-white rounded-top-4 py-3">
                <h5 className="mb-0">Personal Information</h5>
              </div>
              <div className="card-body p-4">
                <div className="row gy-3">
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Full Name</label>
                    <span className="fw-bold">{studentData.name}</span>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Email Address</label>
                    <span className="fw-bold">{studentData.email}</span>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Birthdate</label>
                    <span className="fw-bold">{studentData.birthdate}</span>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Home Address</label>
                    <span className="fw-bold">{studentData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        


        {/* Information Grid */}
<div className="row justify-content-center">
  <div className="col-12 col-lg-8">
    <div className="card border-5 shadow-sm rounded-4 h-100">
      <div className="card-header bg-blue text-blue rounded-top-4 py-3">
        <h5 className="mb-0">Personal Information</h5>
      </div>
      <div className="card-body p-4">
        {/*  */}
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Full Name</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.name}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">LRN no.</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.lrn}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Grade Level</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.level}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Email Address</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.email}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Birthdate</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.birthdate}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Home Address</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.address}</span>
          </div>
        </div>
        <hr></hr>
        <br></br>


    <div className="card-header bg-blue text-blue rounded-top-4 py-3">
        <h5 className="mb-0 text-center">Emergency Details</h5>
      </div>
      <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Contact Person</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.guardian}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Address</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.address}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Telephone No.</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.telephone}</span>
          </div>
        </div>
        <hr></hr>
        <div className="row mb-3 align-items-center">
          <div className="col-sm-4">
            <label className="text-muted mb-0">Mobile No.</label>
          </div>
          <div className="col-sm-8 text-end">
            <span className="fw-bold">{studentData.mobile}</span>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  </div>
</div>


      </main>
    </div>
  );
};

export default Profile;