import React, { useState, useEffect } from 'react';
import './AttendanceMonitoring.css';

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode" },
  { href: "Attendance.html", icon: "bi-check2-square", label: "Attendance Monitoring", active: true },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
];

const AttendanceMonitoring = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedClass, setSelectedClass] = useState("Grade 1 - Einstein");

  const classes = [
    "Grade 1 - Einstein", "Grade 2 - Newton", "Grade 3 - Galileo", 
    "Grade 4 - Pascal", "Grade 5 - Darwin", "Grade 6 - Atom"
  ];

  // Initialize data for all 6 grades with 10 students each
  const generateInitialData = () => {
    const data = {};
    classes.forEach(className => {
      data[className] = Array.from({ length: 10 }, (_, i) => ({
        id: `2026-${className.charAt(6)}-${100 + i}`,
        name: `Student ${i + 1} (${className.split(' - ')[1]})`,
        status: 'Present'
      }));
    });
    return data;
  };

  const [attendanceStore, setAttendanceStore] = useState(generateInitialData());

  const updateStatus = (id, newStatus) => {
    setAttendanceStore({
      ...attendanceStore,
      [selectedClass]: attendanceStore[selectedClass].map(s => 
        s.id === id ? { ...s, status: newStatus } : s
      )
    });
  };

  const currentStudents = attendanceStore[selectedClass];
  
  const counts = {
    P: currentStudents.filter(s => s.status === 'Present').length,
    A: currentStudents.filter(s => s.status === 'Absent').length,
    L: currentStudents.filter(s => s.status === 'Late').length,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <a href={item.href} 
               className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
               onMouseEnter={() => setHoveredIdx(idx)} 
               onMouseLeave={() => setHoveredIdx(null)}>
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
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100 bg-soft-yellow overflow-hidden">
      {/* Sidebar - Consistent Hover/Collapse */}
      <nav className={`sidebar d-none d-md-flex flex-column p-3 text-white ${isCollapsed ? 'collapsed' : ''}`}
           onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)}>
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 overflow-auto content-main">
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-0">Attendance Monitoring</h2>
            <p className="text-muted mb-0">{new Date().toDateString()}</p>
          </div>
          
          <div className="d-flex gap-2">
            <select className="form-select border-0 shadow-sm w-auto fw-bold" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="btn btn-dark rounded-pill px-4 shadow-sm">
               <i className="bi bi-cloud-check me-2"></i>Save Attendance
            </button>
          </div>
        </header>

        {/* Breakdown of Records */}
        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 stat-card present text-center bg-white">
              <div className="text-muted small fw-bold">PRESENT</div>
              <h2 className="fw-bold text-success mb-0">{counts.P}</h2>
            </div>
          </div>
          <div className="col-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 stat-card absent text-center bg-white">
              <div className="text-muted small fw-bold">ABSENT</div>
              <h2 className="fw-bold text-danger mb-0">{counts.A}</h2>
            </div>
          </div>
          <div className="col-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 stat-card late text-center bg-white">
              <div className="text-muted small fw-bold">LATE</div>
              <h2 className="fw-bold text-warning mb-0">{counts.L}</h2>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle text-center">
              <thead className="bg-dark text-white text-uppercase small">
                <tr>
                  <th className="py-3 px-4 text-start">Student Name</th>
                  <th>Attendance Status</th>
                  <th>Action Toggle</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="text-start ps-4">
                      <div className="fw-bold text-dark">{student.name}</div>
                      <div className="text-muted x-small">{student.id}</div>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${
                        student.status === 'Present' ? 'bg-success-subtle text-success' :
                        student.status === 'Absent' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-dark'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm rounded-pill overflow-hidden shadow-sm border">
                        <button onClick={() => updateStatus(student.id, 'Present')} className={`btn px-3 border-0 ${student.status === 'Present' ? 'btn-success' : 'btn-light text-muted'}`}>P</button>
                        <button onClick={() => updateStatus(student.id, 'Absent')} className={`btn px-3 border-0 ${student.status === 'Absent' ? 'btn-danger' : 'btn-light text-muted'}`}>A</button>
                        <button onClick={() => updateStatus(student.id, 'Late')} className={`btn px-3 border-0 ${student.status === 'Late' ? 'btn-warning text-dark' : 'btn-light'}`}>L</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceMonitoring;