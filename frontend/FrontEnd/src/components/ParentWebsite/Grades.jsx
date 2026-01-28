import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ParentWebsiteCSS/Grades.css';

// --- Responsive Sidebar Additions START ---
const navLinks = [
  { path: "/parent/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
  { path: "/parent/profile", icon: "bi-person", label: "Student Info" },
  { path: "/parent/ledger", icon: "bi-journal-text", label: "Ledger" },
  { path: "/parent/grades", icon: "bi-wallet2", label: "Grades", active: true },
  { path: "/parent/schedule", icon: "bi-calendar-event", label: "Schedule" },
];

const Grades = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // State for fetching grades from Django API
  const [grades, setGrades] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  // Fetch grades and quarters from Django API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quarters
        const quartersRes = await fetch('http://127.0.0.1:8000/api/grades/quarters/');
        const quartersData = await quartersRes.json();
        setQuarters(quartersData.results || quartersData);

        // Fetch grades
        const gradesRes = await fetch('http://127.0.0.1:8000/api/grades/grades/?student_name=John Smith');
        const gradesData = await gradesRes.json();
        setGrades(gradesData.results || gradesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group grades by quarter
  const gradesByQuarter = quarters.reduce((acc, quarter) => {
    acc[quarter.id] = {
      quarter: quarter,
      grades: grades.filter(g => g.quarter === quarter.id)
    };
    return acc;
  }, {});

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

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        {/* Header Section */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Grade Records</h2>
          <p className="text-muted mb-0">Academic Performance - S.Y. 2024-2025</p>
        </div>

        {/* Summary Cards */}
        {!loading && quarters.length > 0 && (
          <div className="row g-3 mb-4">
            {quarters.map(quarter => {
              const quarterGrades = grades.filter(g => g.quarter === quarter.id);
              const avg = quarterGrades.length > 0 
                ? (quarterGrades.reduce((sum, g) => sum + Number(g.score), 0) / quarterGrades.length).toFixed(2)
                : 'N/A';
              
              return (
                <div key={quarter.id} className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded-4 p-3">
                    <div className="text-muted small fw-bold">Q{quarter.quarter} {quarter.year}</div>
                    <h2 className="fw-bold text-primary mb-0">{avg}</h2>
                    <small className="text-muted">{quarterGrades.length} subjects</small>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Grades Table */}
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
          <div className="card-header bg-dark text-white py-3 px-4 border-0">
            <h6 className="mb-0 fw-bold">
              <i className="bi bi-mortarboard-fill me-2"></i>Quarterly Grades Report
            </h6>
          </div>

          <div className="card-body p-0">
            {loading ? (
              <div className="p-5 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading grades...</p>
              </div>
            ) : grades.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                <p className="mt-3">No grades available yet</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-dark text-white text-center">
                    <tr>
                      <th className="py-3 px-4 text-start">SUBJECT</th>
                      <th className="py-3" style={{width: '130px'}}>1st Quarter</th>
                      <th className="py-3" style={{width: '130px'}}>2nd Quarter</th>
                      <th className="py-3" style={{width: '130px'}}>3rd Quarter</th>
                      <th className="py-3" style={{width: '130px'}}>4th Quarter</th>
                      <th className="py-3 pe-4">Average</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {/* Group unique subjects */}
                    {[...new Set(grades.map(g => g.subject))].map((subject, index) => {
                      const subjectGrades = grades.filter(g => g.subject === subject);
                      const q1 = subjectGrades.find(g => g.quarter === 1);
                      const q2 = subjectGrades.find(g => g.quarter === 2);
                      const q3 = subjectGrades.find(g => g.quarter === 3);
                      const q4 = subjectGrades.find(g => g.quarter === 4);
                      
                      const scores = [q1?.score, q2?.score, q3?.score, q4?.score].filter(s => s != null).map(Number);
                      const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : '-';
                      
                      return (
                        <tr key={subject}>
                          <td className="text-start ps-4 fw-semibold">{subject.replace(/_/g, ' ')}</td>
                          <td className={q1 ? 'fw-bold text-primary' : 'text-muted'}>{q1?.score || '-'}</td>
                          <td className={q2 ? 'fw-bold text-primary' : 'text-muted'}>{q2?.score || '-'}</td>
                          <td className={q3 ? 'fw-bold text-primary' : 'text-muted'}>{q3?.score || '-'}</td>
                          <td className={q4 ? 'fw-bold text-primary' : 'text-muted'}>{q4?.score || '-'}</td>
                          <td className="fw-bold text-success pe-4">{average}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Grades;