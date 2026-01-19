import React, { useState, useEffect } from 'react';
import './Students.css';

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students", active: true },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode" },
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
];

const Students = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedClass, setSelectedClass] = useState("Grade 1 - Einstein");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const classes = [
    "Grade 1 - Einstein", "Grade 2 - Newton", "Grade 3 - Galileo", 
    "Grade 4 - Pascal", "Grade 5 - Darwin", "Grade 6 - Atom"
  ];

  // Helper to generate 10 students per grade level
  const generateStudents = () => {
    let allStudents = [];
    classes.forEach((gradeName, gradeIdx) => {
      for (let i = 1; i <= 10; i++) {
        allStudents.push({
          id: `LRN-10${gradeIdx + 1}${i.toString().padStart(2, '0')}`,
          name: `Student ${i} (${gradeName.split(' - ')[0]})`,
          grade: gradeName,
          gender: i % 2 === 0 ? "Female" : "Male",
          age: 6 + gradeIdx,
          email: `student${i}.g${gradeIdx + 1}@school.edu`,
          guardian: "Juan Dela Cruz",
          guardianContact: "0917-000-0000"
        });
      }
    });
    return allStudents;
  };

  const [studentData] = useState(generateStudents());

  const filteredStudents = studentData.filter(student => 
    student.grade === selectedClass && 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.includes(searchTerm))
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(false);
      else setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">U</div>
        {!isCollapsed && <h6 className="mt-2 fw-bold text-white ">Username</h6>}
        {!isCollapsed && <small className="text-white-50">Faculty Member</small>}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((item, idx) => (
          <li className="nav-item mb-2" key={item.label}>
            <a
              href={item.href}
              className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center py-2 border-0">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      {/* Mobile Header - Exactly as in Schedule Page */}
      <div className="sidebar-mobile-header w-100 d-flex d-md-none">
        <button className="btn btn-link text-white p-0 me-2" onClick={() => setMobileMenuOpen(true)}>
          <i className="bi bi-list" style={{ fontSize: '2rem' }}></i>
        </button>
        <span className="fw-bold text-white text-uppercase">Teacher Portal</span>
        <span></span>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="sidebar-mobile-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <nav className="sidebar-mobile-menu open p-3 text-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold text-uppercase">Menu</span>
              <button className="btn btn-link text-white p-0" onClick={() => setMobileMenuOpen(false)}>
                <i className="bi bi-x-lg" style={{ fontSize: '1.5rem' }}></i>
              </button>
            </div>
            {sidebarNav}
          </nav>
        </>
      )}

      {/* Desktop Sidebar - Exactly as in Schedule Page */}
      <nav
        className={`sidebar d-none d-md-flex flex-column p-3 text-white${isCollapsed ? ' collapsed' : ''}`}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Students Roster</h2>
            <p className="text-muted mb-0">Managing students for <span className="text-primary fw-bold">{selectedClass}</span></p>
          </div>
          
          <div className="d-flex flex-wrap gap-2">
            <div className="input-group shadow-sm" style={{ maxWidth: '250px' }}>
              <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
              <input 
                type="text" className="form-control border-0" 
                placeholder="Search name or LRN..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="form-select border-0 shadow-sm w-auto" 
              value={selectedClass} 
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setExpandedStudentId(null);
              }}
            >
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-dark text-white text-center">
                <tr>
                  <th className="py-3 px-4 text-start">Student Name</th>
                  <th>LRN (Student ID)</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredStudents.map((student) => (
                  <React.Fragment key={student.id}>
                    <tr>
                      <td className="text-start ps-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar-square me-3">{student.name.charAt(8)}</div>
                          <div>
                            <div className="fw-bold text-dark mb-0">{student.name}</div>
                            <div className="text-muted small" style={{fontSize: '0.75rem'}}>{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted fw-bold">{student.id}</td>
                      <td>{student.gender}</td>
                      <td>
                        <button 
                          className={`btn btn-sm rounded-pill px-3 ${expandedStudentId === student.id ? 'btn-dark' : 'btn-outline-primary'}`}
                          onClick={() => setExpandedStudentId(expandedStudentId === student.id ? null : student.id)}
                        >
                          {expandedStudentId === student.id ? 'Hide Info' : 'View Info'}
                        </button>
                      </td>
                    </tr>
                    {expandedStudentId === student.id && (
                      <tr className="bg-light">
                        <td colSpan="4" className="p-0 border-0">
                          <div className="detail-panel p-4 mx-3 my-2 shadow-sm rounded-3 bg-white border-start border-primary border-5">
                            <div className="row g-3">
                              <div className="col-md-2">
                                <label className="detail-label">Age</label>
                                <div className="detail-value">{student.age} Years</div>
                              </div>
                              <div className="col-md-4">
                                <label className="detail-label">Guardian Name</label>
                                <div className="detail-value">{student.guardian}</div>
                              </div>
                              <div className="col-md-3">
                                <label className="detail-label">Guardian Contact</label>
                                <div className="detail-value"><i className="bi bi-telephone me-2"></i>{student.guardianContact}</div>
                              </div>
                              <div className="col-md-3 text-md-end">
                                <button className="btn btn-sm btn-light border text-primary me-2">Edit</button>
                                <button className="btn btn-sm btn-primary">Message</button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Students;