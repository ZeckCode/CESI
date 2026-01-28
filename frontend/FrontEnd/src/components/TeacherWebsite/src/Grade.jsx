import React, { useState, useEffect } from 'react';
import './Grade.css';

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode", active: true },
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
];

const Grade = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedClass, setSelectedClass] = useState("Grade 1 - Einstein");

  const classes = [
    "Grade 1 - Einstein", "Grade 2 - Newton", "Grade 3 - Galileo", 
    "Grade 4 - Pascal", "Grade 5 - Darwin", "Grade 6 - Atom"
  ];

  // Helper to generate 10 mock students per grade level
  const generateInitialGrades = () => {
    let allData = {};
    classes.forEach((grade) => {
      allData[grade] = Array.from({ length: 10 }, (_, i) => ({
        id: `LRN-2026-${grade.charAt(6)}-${i + 1}`,
        name: `Student ${i + 1} (${grade.split(' - ')[1]})`,
        written: 75 + (i % 5) * 3,
        performance: 80 + (i % 3) * 4,
        exam: 70 + (i % 4) * 5,
      }));
    });
    return allData;
  };

  const [gradeData, setGradeData] = useState(generateInitialGrades());

  const calculateFinal = (s) => Math.round((s.written * 0.3) + (s.performance * 0.5) + (s.exam * 0.2));
  const getRemarks = (avg) => avg >= 75 ? "PASSED" : "FAILED";

  const handleGradeChange = (grade, id, field, value) => {
    const numericValue = parseInt(value) || 0;
    setGradeData({
      ...gradeData,
      [grade]: gradeData[grade].map(s => s.id === id ? { ...s, [field]: numericValue } : s)
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(false);
      else setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentStudents = gradeData[selectedClass];

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">U</div>
        {!isCollapsed && <h6 className="mt-2 fw-bold text-white">Username</h6>}
        {!isCollapsed && <small className="text-white-50">Faculty Member</small>}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((item, idx) => (
          <li className="nav-item mb-2" key={item.label}>
            <a href={item.href} className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
               onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center py-2 border-0 shadow-sm">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      {/* Desktop Sidebar (Hover-Collapse logic from Schedule page) */}
      <nav className={`sidebar d-none d-md-flex flex-column p-3 text-white${isCollapsed ? ' collapsed' : ''}`}
        onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)}>
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Grade Encoding</h2>
            <p className="text-muted mb-0">Managing records for <span className="text-primary fw-bold">{selectedClass}</span></p>
          </div>
          
          <div className="d-flex gap-2">
            <select className="form-select border-0 shadow-sm w-auto" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="btn btn-dark rounded-pill px-4 shadow-sm">
              <i className="bi bi-save me-2"></i>Save Changes
            </button>
          </div>
        </div>

        {/* Breakdown Section (Simplified) */}
        <div className="row g-3 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 breakdown-card passing">
              <div className="text-muted small fw-bold">TOTAL PASSING</div>
              <h2 className="fw-bold text-success mb-0">{currentStudents.filter(s => calculateFinal(s) >= 75).length}</h2>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 breakdown-card failing">
              <div className="text-muted small fw-bold">TOTAL FAILING</div>
              <h2 className="fw-bold text-danger mb-0">{currentStudents.filter(s => calculateFinal(s) < 75).length}</h2>
            </div>
          </div>
        </div>

        {/* Grade Entry Table */}
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle text-center">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="py-3 px-4 text-start">Student Name</th>
                  <th style={{width: '130px'}}>Written (30%)</th>
                  <th style={{width: '130px'}}>Performance (50%)</th>
                  <th style={{width: '130px'}}>Exam (20%)</th>
                  <th>Final Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => {
                  const final = calculateFinal(student);
                  const remark = getRemarks(final);
                  return (
                    <tr key={student.id}>
                      <td className="text-start ps-4">
                        <div className="fw-bold text-dark mb-0">{student.name}</div>
                        <div className="text-muted x-small">{student.id}</div>
                      </td>
                      <td><input type="number" className="grade-input" value={student.written} onChange={(e) => handleGradeChange(selectedClass, student.id, 'written', e.target.value)} /></td>
                      <td><input type="number" className="grade-input" value={student.performance} onChange={(e) => handleGradeChange(selectedClass, student.id, 'performance', e.target.value)} /></td>
                      <td><input type="number" className="grade-input" value={student.exam} onChange={(e) => handleGradeChange(selectedClass, student.id, 'exam', e.target.value)} /></td>
                      <td><span className={`fw-bold fs-5 ${final < 75 ? 'text-danger' : 'text-primary'}`}>{final}</span></td>
                      <td>
                        <span className={`badge rounded-pill ${remark === 'PASSED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                          {remark}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Grade;